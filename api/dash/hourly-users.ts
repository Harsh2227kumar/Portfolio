import { requireAuth } from '../_lib/auth.js';
import { ensureAnalyticsSchema, sql } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();

  const { rows } = await sql`
    WITH hours AS (
      SELECT generate_series(0, 23) AS hour
    ),
    counts AS (
      SELECT
        EXTRACT(HOUR FROM created_at)::int AS hour,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY 1
    )
    SELECT
      LPAD(hours.hour::text, 2, '0') || ':00' AS hour,
      COALESCE(counts.users, 0)::int AS users
    FROM hours
    LEFT JOIN counts ON counts.hour = hours.hour
    ORDER BY hours.hour
  `;

  return json({ hours: rows });
}

export const POST = methodNotAllowed;
