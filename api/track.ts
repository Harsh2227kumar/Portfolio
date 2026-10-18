import { cleanId, cleanOptionalText, cleanPath, describeUserAgent, deviceFromUserAgent, getUtmParams } from './_lib/analytics.js';
import { isAuthorized } from './_lib/auth.js';
import { ensureAnalyticsSchema, getSettings, sql } from './_lib/db.js';
import { sendEmail, summaryEmail, visitEmail } from './_lib/email.js';
import { getGeo } from './_lib/geo.js';
import { badRequest, methodNotAllowed, parseJson } from './_lib/http.js';

interface TrackBody {
  type?: 'pageview' | 'heartbeat' | 'event';
  visitorId?: string;
  sessionId?: string;
  path?: string;
  referrer?: string;
  seconds?: number;
  final?: boolean;
  event?: string;
  label?: string;
  value?: number;
}

const MAX_ALERTS_PER_HOUR = 40;

const clampInt = (value: unknown, min: number, max: number) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0;
};

const dashboardUrl = (request: Request) => new URL('/dash', request.url).toString();

export async function POST(request: Request) {
  const body = await parseJson<TrackBody>(request);
  const visitorId = cleanId(body?.visitorId);
  const sessionId = cleanId(body?.sessionId);

  if (!visitorId || !sessionId) return badRequest('Invalid analytics identifiers.');

  await ensureAnalyticsSchema();

  if (body?.type === 'heartbeat') {
    await handleHeartbeat(request, visitorId, sessionId, body);
  } else if (body?.type === 'event') {
    const event = typeof body.event === 'string' && /^[a-z_]{3,40}$/.test(body.event) ? body.event : null;
    if (!event) return badRequest('Invalid event name.');
    const label = cleanOptionalText(body.label, 120);
    const value = body.value == null ? null : clampInt(body.value, 0, 86400);
    await sql`
      INSERT INTO analytics_events (visitor_id, session_id, event_type, label, value)
      VALUES (${visitorId}, ${sessionId}, ${event}, ${label}, ${value})
    `;
  } else {
    await handlePageView(request, visitorId, sessionId, body);
  }

  return new Response(null, { status: 204 });
}

const handlePageView = async (request: Request, visitorId: string, sessionId: string, body: TrackBody | null) => {
  const path = cleanPath(body?.path);
  const referrer = cleanOptionalText(body?.referrer || request.headers.get('referer'));
  const { utmSource, utmMedium, utmContent, utmCampaign } = getUtmParams(path);
  const userAgent = cleanOptionalText(request.headers.get('user-agent'), 400);
  const deviceType = deviceFromUserAgent(userAgent);
  const geo = getGeo(request);
  const countryCode = geo.countryCode;

  await sql`
    INSERT INTO analytics_visitors (visitor_id, device_type, country_code)
    VALUES (${visitorId}, ${deviceType}, ${countryCode})
    ON CONFLICT (visitor_id)
    DO UPDATE SET
      last_seen = NOW(),
      device_type = COALESCE(analytics_visitors.device_type, EXCLUDED.device_type),
      country_code = COALESCE(analytics_visitors.country_code, EXCLUDED.country_code)
  `;

  const session = await sql`
    INSERT INTO analytics_sessions (
      session_id, visitor_id, referrer, utm_source, utm_medium, utm_content, utm_campaign, device_type, country_code,
      ip, city, region, region_code, postal_code, latitude, longitude, timezone, user_agent, landing_path
    )
    VALUES (
      ${sessionId}, ${visitorId}, ${referrer}, ${utmSource}, ${utmMedium}, ${utmContent}, ${utmCampaign}, ${deviceType}, ${countryCode},
      ${geo.ip}, ${geo.city}, ${geo.region}, ${geo.regionCode}, ${geo.postalCode}, ${geo.latitude}, ${geo.longitude}, ${geo.timezone}, ${userAgent}, ${path}
    )
    ON CONFLICT (session_id)
    DO UPDATE SET
      last_seen = NOW(),
      utm_source = COALESCE(analytics_sessions.utm_source, EXCLUDED.utm_source),
      utm_medium = COALESCE(analytics_sessions.utm_medium, EXCLUDED.utm_medium),
      utm_content = COALESCE(analytics_sessions.utm_content, EXCLUDED.utm_content),
      utm_campaign = COALESCE(analytics_sessions.utm_campaign, EXCLUDED.utm_campaign),
      ip = COALESCE(analytics_sessions.ip, EXCLUDED.ip),
      city = COALESCE(analytics_sessions.city, EXCLUDED.city),
      region = COALESCE(analytics_sessions.region, EXCLUDED.region),
      country_code = COALESCE(analytics_sessions.country_code, EXCLUDED.country_code)
    RETURNING (xmax = 0) AS inserted
  `;

  await sql`
    INSERT INTO analytics_page_views (visitor_id, session_id, path, referrer, utm_source, utm_medium, utm_content, utm_campaign, device_type, country_code)
    VALUES (${visitorId}, ${sessionId}, ${path}, ${referrer}, ${utmSource}, ${utmMedium}, ${utmContent}, ${utmCampaign}, ${deviceType}, ${countryCode})
  `;

  if (!session.rows[0]?.inserted || deviceType === 'bot' || isAuthorized(request)) return;

  const settings = await getSettings();
  if (!settings.notifyOnVisit) return;

  const recent = await sql`SELECT COUNT(*)::int AS n FROM analytics_sessions WHERE notified_at >= NOW() - INTERVAL '1 hour'`;
  if (Number(recent.rows[0]?.n || 0) >= MAX_ALERTS_PER_HOUR) return;

  const previous = await sql`SELECT COUNT(*)::int AS n FROM analytics_sessions WHERE visitor_id = ${visitorId} AND session_id <> ${sessionId}`;
  const utm = [utmSource, utmMedium, utmContent, utmCampaign].some(Boolean)
    ? [`source: ${utmSource || '-'}`, `medium: ${utmMedium || '-'}`, `content: ${utmContent || '-'}`, utmCampaign ? `campaign: ${utmCampaign}` : null].filter(Boolean).join(' · ')
    : null;

  const mail = visitEmail({
    at: new Date(),
    ip: geo.ip,
    city: geo.city,
    region: geo.region,
    countryCode,
    postalCode: geo.postalCode,
    timezone: geo.timezone,
    latitude: geo.latitude,
    longitude: geo.longitude,
    device: deviceType,
    browser: describeUserAgent(userAgent),
    referrer,
    landingPath: path,
    utm,
    previousSessions: Number(previous.rows[0]?.n || 0),
    dashboardUrl: dashboardUrl(request),
  });

  const result = await sendEmail(mail.subject, mail.html, mail.text);
  if (result.ok) await sql`UPDATE analytics_sessions SET notified_at = NOW() WHERE session_id = ${sessionId}`;
};

const handleHeartbeat = async (request: Request, visitorId: string, sessionId: string, body: TrackBody) => {
  const seconds = clampInt(body.seconds, 0, 120);

  await sql`
    UPDATE analytics_sessions
    SET active_seconds = active_seconds + ${seconds}, last_seen = NOW()
    WHERE session_id = ${sessionId} AND visitor_id = ${visitorId}
  `;

  if (!body.final || isAuthorized(request)) return;

  const settings = await getSettings();
  if (!settings.notifySummary) return;

  // Claim the summary atomically so repeated pagehide beacons send at most one email.
  const claimed = await sql`
    UPDATE analytics_sessions
    SET summary_sent_at = NOW()
    WHERE session_id = ${sessionId}
      AND visitor_id = ${visitorId}
      AND summary_sent_at IS NULL
      AND active_seconds >= 3
      AND COALESCE(device_type, '') <> 'bot'
    RETURNING ip, city, region, country_code, device_type, user_agent, active_seconds, started_at, last_seen
  `;
  const s = claimed.rows[0];
  if (!s) return;

  const [views, events] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM analytics_page_views WHERE session_id = ${sessionId}`,
    sql`
      SELECT event_type, COALESCE(SUM(value), 0)::int AS total, COUNT(*)::int AS n
      FROM analytics_events
      WHERE session_id = ${sessionId} AND event_type LIKE 'resume_%'
      GROUP BY event_type
    `,
  ]);
  const byType = Object.fromEntries(events.rows.map((row) => [row.event_type, row]));

  const mail = summaryEmail({
    ip: s.ip,
    city: s.city,
    region: s.region,
    countryCode: s.country_code,
    device: `${s.device_type || 'unknown'} · ${describeUserAgent(s.user_agent)}`,
    activeSeconds: Number(s.active_seconds || 0),
    startedAt: new Date(s.started_at),
    endedAt: new Date(s.last_seen),
    pageViews: Number(views.rows[0]?.n || 0),
    resumeOpened: Boolean(byType.resume_open),
    resumeDownloaded: Boolean(byType.resume_download),
    resumeAppreciated: Boolean(byType.resume_appreciate),
    resumeSeconds: Number(byType.resume_view_time?.total || 0),
    dashboardUrl: dashboardUrl(request),
  });

  const result = await sendEmail(mail.subject, mail.html, mail.text);
  if (!result.ok) await sql`UPDATE analytics_sessions SET summary_sent_at = NULL WHERE session_id = ${sessionId}`;
};

export const GET = methodNotAllowed;
