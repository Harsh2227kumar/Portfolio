import { cleanId, cleanOptionalText, cleanPath, deviceFromUserAgent, getCountryCode, getUtmParams } from './_lib/analytics.js';
import { ensureAnalyticsSchema, sql } from './_lib/db.js';
import { badRequest, json, methodNotAllowed, parseJson } from './_lib/http.js';

interface TrackBody {
  visitorId?: string;
  sessionId?: string;
  path?: string;
  referrer?: string;
}

export async function POST(request: Request) {
  const body = await parseJson<TrackBody>(request);
  const visitorId = cleanId(body?.visitorId);
  const sessionId = cleanId(body?.sessionId);

  if (!visitorId || !sessionId) return badRequest('Invalid analytics identifiers.');

  const path = cleanPath(body?.path);
  const referrer = cleanOptionalText(body?.referrer || request.headers.get('referer'));
  const { utmSource, utmMedium, utmContent } = getUtmParams(path);
  const deviceType = deviceFromUserAgent(request.headers.get('user-agent'));
  const countryCode = getCountryCode(request);

  await ensureAnalyticsSchema();

  await sql`
    INSERT INTO analytics_visitors (visitor_id, device_type, country_code)
    VALUES (${visitorId}, ${deviceType}, ${countryCode})
    ON CONFLICT (visitor_id)
    DO UPDATE SET
      last_seen = NOW(),
      device_type = COALESCE(analytics_visitors.device_type, EXCLUDED.device_type),
      country_code = COALESCE(analytics_visitors.country_code, EXCLUDED.country_code)
  `;

  await sql`
    INSERT INTO analytics_sessions (session_id, visitor_id, referrer, utm_source, utm_medium, utm_content, device_type, country_code)
    VALUES (${sessionId}, ${visitorId}, ${referrer}, ${utmSource}, ${utmMedium}, ${utmContent}, ${deviceType}, ${countryCode})
    ON CONFLICT (session_id)
    DO UPDATE SET
      last_seen = NOW(),
      utm_source = COALESCE(analytics_sessions.utm_source, EXCLUDED.utm_source),
      utm_medium = COALESCE(analytics_sessions.utm_medium, EXCLUDED.utm_medium),
      utm_content = COALESCE(analytics_sessions.utm_content, EXCLUDED.utm_content)
  `;

  await sql`
    INSERT INTO analytics_page_views (visitor_id, session_id, path, referrer, utm_source, utm_medium, utm_content, device_type, country_code)
    VALUES (${visitorId}, ${sessionId}, ${path}, ${referrer}, ${utmSource}, ${utmMedium}, ${utmContent}, ${deviceType}, ${countryCode})
  `;

  return new Response(null, { status: 204 });
}

export const GET = methodNotAllowed;
