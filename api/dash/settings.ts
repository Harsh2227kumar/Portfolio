import { requireAuth } from '../_lib/auth.js';
import { DashSettings, ensureAnalyticsSchema, getSettings, saveSetting } from '../_lib/db.js';
import { emailConfig, sendEmail, testEmail } from '../_lib/email.js';
import { json, parseJson } from '../_lib/http.js';

interface SettingsBody extends Partial<DashSettings> {
  action?: 'test';
}

const payload = async () => {
  const { configured, to } = emailConfig();
  return { settings: await getSettings(), email: { configured, to } };
};

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();
  return json(await payload());
}

export async function POST(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();
  const body = await parseJson<SettingsBody>(request);

  if (body?.action === 'test') {
    const mail = testEmail(new URL('/dash', request.url).toString());
    const result = await sendEmail(mail.subject, mail.html, mail.text);
    return json({ ...(await payload()), test: result }, { status: result.ok ? 200 : 502 });
  }

  for (const key of ['notifyOnVisit', 'notifySummary'] as const) {
    if (typeof body?.[key] === 'boolean') await saveSetting(key, body[key] as boolean);
  }

  return json(await payload());
}
