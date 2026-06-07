import { requireAuth } from '../_lib/auth.js';
import { ensureAnalyticsSchema, sql } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();

  const { rows } = await sql`
    WITH visitor_counts AS (
      SELECT visitor_id, COUNT(*)::int AS sessions
      FROM analytics_sessions
      GROUP BY visitor_id
    )
    SELECT
      SUM(CASE WHEN sessions <= 1 THEN 1 ELSE 0 END)::int AS "newUsers",
      SUM(CASE WHEN sessions > 1 THEN 1 ELSE 0 END)::int AS "returningUsers"
    FROM visitor_counts
  `;

  const row = rows[0] || {};
  return json({
    newUsers: Number(row.newUsers || 0),
    returningUsers: Number(row.returningUsers || 0),
  });
}

export const POST = methodNotAllowed;
