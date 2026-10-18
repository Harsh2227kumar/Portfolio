import { cleanId } from './_lib/analytics.js';
import { ensureAnalyticsSchema, sql } from './_lib/db.js';
import { badRequest, json, parseJson } from './_lib/http.js';

interface AppreciateBody {
  visitorId?: string;
  sessionId?: string;
  appreciated?: boolean;
}

const noStore = { 'cache-control': 'no-store' };

const state = async (visitorId: string | null) => {
  const { rows } = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM resume_appreciations) AS count,
      EXISTS (SELECT 1 FROM resume_appreciations WHERE visitor_id = ${visitorId}) AS appreciated
  `;
  return { count: Number(rows[0]?.count || 0), appreciated: Boolean(rows[0]?.appreciated) };
};

// Public: appreciation count for the resume, plus whether this visitor already appreciated it.
export async function GET(request: Request) {
  await ensureAnalyticsSchema();
  const visitorId = cleanId(new URL(request.url).searchParams.get('visitorId'));
  return json(await state(visitorId), { headers: noStore });
}

export async function POST(request: Request) {
  const body = await parseJson<AppreciateBody>(request);
  const visitorId = cleanId(body?.visitorId);
  const sessionId = cleanId(body?.sessionId);
  if (!visitorId || !sessionId || typeof body?.appreciated !== 'boolean') return badRequest('Invalid appreciation request.');

  await ensureAnalyticsSchema();

  const changed = body.appreciated
    ? await sql`
        INSERT INTO resume_appreciations (visitor_id, session_id) VALUES (${visitorId}, ${sessionId})
        ON CONFLICT (visitor_id) DO NOTHING
        RETURNING visitor_id
      `
    : await sql`DELETE FROM resume_appreciations WHERE visitor_id = ${visitorId} RETURNING visitor_id`;

  if (changed.rows.length) {
    const event = body.appreciated ? 'resume_appreciate' : 'resume_unappreciate';
    await sql`
      INSERT INTO analytics_events (visitor_id, session_id, event_type)
      VALUES (${visitorId}, ${sessionId}, ${event})
    `;
  }

  return json(await state(visitorId), { headers: noStore });
}
