import { requireAuth } from '../_lib/auth.js';
import { ensureAnalyticsSchema, sql } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();

  const { rows } = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM analytics_visitors) AS users,
      (SELECT COUNT(*)::int FROM analytics_visitors WHERE first_seen >= NOW() - INTERVAL '30 days') AS "newUsers",
      (SELECT COUNT(*)::int FROM analytics_sessions) AS sessions,
      (SELECT COUNT(*)::int FROM analytics_page_views) AS "pageViews"
  `;

  return json(rows[0] || { users: 0, newUsers: 0, sessions: 0, pageViews: 0 });
}

export const POST = methodNotAllowed;
