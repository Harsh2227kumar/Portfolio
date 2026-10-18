import { countryName } from './geo.js';

const DEFAULT_TO = 'harsh2227@gmail.com';
const DEFAULT_FROM = 'Portfolio Alerts <onboarding@resend.dev>';

export const emailConfig = () => ({
  configured: Boolean(process.env.RESEND_API_KEY),
  to: process.env.NOTIFY_EMAIL_TO || DEFAULT_TO,
  from: process.env.NOTIFY_EMAIL_FROM || DEFAULT_FROM,
});

export const sendEmail = async (subject: string, html: string, text: string) => {
  const { configured, to, from } = emailConfig();
  if (!configured) return { ok: false, error: 'RESEND_API_KEY is not set.' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ from, to: to.split(',').map((v) => v.trim()).filter(Boolean), subject, html, text }),
      signal: controller.signal,
    });
    if (!res.ok) return { ok: false, error: `Resend returned ${res.status}: ${(await res.text()).slice(0, 300)}` };
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Email request failed.' };
  } finally {
    clearTimeout(timer);
  }
};

/* ─── formatting ─────────────────────────────────────── */

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const flag = (code: string | null) =>
  code && /^[A-Z]{2}$/.test(code)
    ? String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
    : '';

export const formatDuration = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

const formatIst = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date) + ' IST';

export const formatLocation = (city: string | null, region: string | null, countryCode: string | null) =>
  [city, region, countryName(countryCode)].filter(Boolean).join(', ') || 'Unknown location';

/* ─── theme (mirrors the portfolio's light tokens) ──── */

const C = {
  page: '#EFEFEC',
  card: '#FFFFFF',
  ink: '#1A1A1A',
  inkMid: '#5C5C5C',
  inkFaint: '#ABABAB',
  rule: '#E4E4E0',
  green: '#16A34A',
};
const SANS = "'Instrument Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const DISPLAY = "'Bebas Neue', 'Arial Black', Impact, sans-serif";

type Row = [label: string, value: string | null | undefined, href?: string | null];

const rowsHtml = (rows: Row[]) =>
  rows
    .filter(([, value]) => value)
    .map(
      ([label, value, href], i) => `
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid ${C.rule};${i === 0 ? `border-top:1px solid ${C.rule};` : ''}font-family:${SANS};font-size:13px;font-weight:600;color:${C.ink};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:13px 0 13px 18px;border-bottom:1px solid ${C.rule};${i === 0 ? `border-top:1px solid ${C.rule};` : ''}font-family:${SANS};font-size:13px;color:${C.inkMid};text-align:right;word-break:break-word;">
          ${href ? `<a href="${escapeHtml(href)}" style="color:${C.inkMid};text-decoration:underline;">${escapeHtml(value)} ↗</a>` : escapeHtml(value)}
        </td>
      </tr>`
    )
    .join('');

const layout = (opts: { badge: string; eyebrow: string; title: string; titleMuted: string; rows: Row[]; dashboardUrl: string; footnote: string }) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Sans:wght@400;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:${C.page};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};padding:32px 14px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.card};border:1px solid ${C.rule};border-radius:14px;">
        <tr><td style="padding:34px 34px 8px;">
          <div style="font-family:${DISPLAY};font-size:46px;line-height:0.9;letter-spacing:0.01em;color:${C.ink};">HARSH<br/>KUMAR</div>
          <div style="font-family:${SANS};font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.inkFaint};margin-top:10px;">Portfolio analytics</div>
        </td></tr>
        <tr><td style="padding:22px 34px 0;">
          <span style="display:inline-block;padding:5px 11px;border-radius:999px;border:1px solid rgba(22,163,74,0.22);background:rgba(22,163,74,0.07);font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:0.04em;color:${C.green};">● ${escapeHtml(opts.badge)}</span>
        </td></tr>
        <tr><td style="padding:22px 34px 0;">
          <div style="font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${C.inkFaint};margin-bottom:10px;">${escapeHtml(opts.eyebrow)}</div>
          <div style="font-family:${SERIF};font-size:32px;line-height:1.12;letter-spacing:-0.02em;color:${C.ink};">
            ${escapeHtml(opts.title)}<br/><em style="font-style:italic;color:${C.inkFaint};">${escapeHtml(opts.titleMuted)}</em>
          </div>
        </td></tr>
        <tr><td style="padding:26px 34px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml(opts.rows)}</table>
        </td></tr>
        <tr><td style="padding:28px 34px 34px;">
          <a href="${escapeHtml(opts.dashboardUrl)}" style="display:inline-block;background:${C.ink};color:#FFFFFF;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:13px 26px;border-radius:999px;">Open dashboard</a>
          <p style="font-family:${SANS};font-size:11.5px;line-height:1.6;color:${C.inkFaint};margin:22px 0 0;">${escapeHtml(opts.footnote)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const toText = (title: string, rows: Row[], dashboardUrl: string) =>
  [title, '', ...rows.filter(([, v]) => v).map(([label, value]) => `${label}: ${value}`), '', `Dashboard: ${dashboardUrl}`].join('\n');

/* ─── templates ─────────────────────────────────────── */

export interface VisitInfo {
  at: Date;
  ip: string | null;
  city: string | null;
  region: string | null;
  countryCode: string | null;
  postalCode: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
  device: string;
  browser: string;
  referrer: string | null;
  landingPath: string;
  utm: string | null;
  previousSessions: number;
  dashboardUrl: string;
}

export const visitEmail = (v: VisitInfo) => {
  const location = formatLocation(v.city, v.region, v.countryCode);
  const mapUrl = v.latitude != null && v.longitude != null ? `https://www.google.com/maps?q=${v.latitude},${v.longitude}` : null;
  const rows: Row[] = [
    ['When', formatIst(v.at)],
    ['IP address', v.ip || 'Unknown'],
    ['City', v.city],
    ['State / Region', v.region],
    ['Country', v.countryCode ? `${flag(v.countryCode)} ${countryName(v.countryCode)}` : null],
    ['Postal code', v.postalCode],
    ['Timezone', v.timezone],
    ['Approx. map', mapUrl ? `${v.latitude?.toFixed(3)}, ${v.longitude?.toFixed(3)}` : null, mapUrl],
    ['Device', `${v.device} · ${v.browser}`],
    ['Came from', v.referrer || 'Direct / unknown'],
    ['Landing page', v.landingPath],
    ['Campaign', v.utm],
    ['Visitor type', v.previousSessions > 0 ? `Returning (${v.previousSessions} earlier visit${v.previousSessions === 1 ? '' : 's'})` : 'First visit'],
  ];
  const subject = `New portfolio visit · ${location}`;
  return {
    subject,
    html: layout({
      badge: 'Live visit',
      eyebrow: 'New visitor',
      title: 'Someone just opened',
      titleMuted: 'your portfolio.',
      rows,
      dashboardUrl: v.dashboardUrl,
      footnote: 'Location comes from the visitor’s IP address and is approximate (usually city-level). Turn these alerts off any time from the dashboard.',
    }),
    text: toText(subject, rows, v.dashboardUrl),
  };
};

export interface SummaryInfo {
  ip: string | null;
  city: string | null;
  region: string | null;
  countryCode: string | null;
  device: string;
  activeSeconds: number;
  startedAt: Date;
  endedAt: Date;
  pageViews: number;
  resumeOpened: boolean;
  resumeDownloaded: boolean;
  resumeAppreciated: boolean;
  resumeSeconds: number;
  dashboardUrl: string;
}

export const summaryEmail = (s: SummaryInfo) => {
  const location = formatLocation(s.city, s.region, s.countryCode);
  const rows: Row[] = [
    ['Active view time', formatDuration(s.activeSeconds)],
    ['Total time on site', formatDuration((s.endedAt.getTime() - s.startedAt.getTime()) / 1000)],
    ['Started', formatIst(s.startedAt)],
    ['Location', location],
    ['IP address', s.ip || 'Unknown'],
    ['Device', s.device],
    ['Page views', String(s.pageViews)],
    ['Resume', s.resumeOpened ? `Opened${s.resumeSeconds ? ` · read ${formatDuration(s.resumeSeconds)}` : ''}${s.resumeDownloaded ? ' · downloaded' : ''}${s.resumeAppreciated ? ' · ★ appreciated' : ''}` : 'Not opened'],
  ];
  const subject = `Visit ended · ${formatDuration(s.activeSeconds)} active · ${location}`;
  return {
    subject,
    html: layout({
      badge: 'Visit summary',
      eyebrow: 'Session ended',
      title: `${formatDuration(s.activeSeconds)} of`,
      titleMuted: 'active viewing.',
      rows,
      dashboardUrl: s.dashboardUrl,
      footnote: 'Active time only counts while the tab was visible and the visitor was interacting (scroll, mouse, keys or touch within the last minute).',
    }),
    text: toText(subject, rows, s.dashboardUrl),
  };
};

export const testEmail = (dashboardUrl: string) => {
  const rows: Row[] = [
    ['Status', 'Email alerts are working'],
    ['Sent', formatIst(new Date())],
  ];
  return {
    subject: 'Test alert · Portfolio analytics',
    html: layout({
      badge: 'Test',
      eyebrow: 'Alerts configured',
      title: 'This is how',
      titleMuted: 'your alerts will look.',
      rows,
      dashboardUrl,
      footnote: 'You asked for a test email from the dashboard.',
    }),
    text: toText('Test alert', rows, dashboardUrl),
  };
};
