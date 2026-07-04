import { requireAuth } from '../_lib/auth.js';
import { ensureAnalyticsSchema, sql } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';

const emptySummary = {
  users: 0,
  newUsers: 0,
  sessions: 0,
  pageViews: 0,
  campaignSessions: 0,
  campaignViews: 0,
};

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();

  const [summary, daily, monthly, sources, mediums, contents, devices, recentCampaigns] = await Promise.all([
    sql`
      SELECT
        (SELECT COUNT(*)::int FROM analytics_visitors) AS users,
        (SELECT COUNT(*)::int FROM analytics_visitors WHERE first_seen >= NOW() - INTERVAL '30 days') AS "newUsers",
        (SELECT COUNT(*)::int FROM analytics_sessions) AS sessions,
        (SELECT COUNT(*)::int FROM analytics_page_views) AS "pageViews",
        (SELECT COUNT(DISTINCT session_id)::int FROM analytics_page_views WHERE utm_source IS NOT NULL OR utm_medium IS NOT NULL OR utm_content IS NOT NULL) AS "campaignSessions",
        (SELECT COUNT(*)::int FROM analytics_page_views WHERE utm_source IS NOT NULL OR utm_medium IS NOT NULL OR utm_content IS NOT NULL) AS "campaignViews"
    `,
    sql`
      WITH days AS (
        SELECT generate_series(
          date_trunc('day', NOW()) - INTERVAL '13 days',
          date_trunc('day', NOW()),
          INTERVAL '1 day'
        ) AS day
      ),
      counts AS (
        SELECT
          date_trunc('day', created_at) AS day,
          COUNT(*)::int AS views,
          COUNT(DISTINCT visitor_id)::int AS users,
          COUNT(DISTINCT session_id)::int AS sessions
        FROM analytics_page_views
        WHERE created_at >= date_trunc('day', NOW()) - INTERVAL '13 days'
        GROUP BY 1
      )
      SELECT
        TO_CHAR(days.day, 'Mon DD') AS date,
        COALESCE(counts.views, 0)::int AS views,
        COALESCE(counts.users, 0)::int AS users,
        COALESCE(counts.sessions, 0)::int AS sessions
      FROM days
      LEFT JOIN counts ON counts.day = days.day
      ORDER BY days.day
    `,
    sql`
      WITH months AS (
        SELECT generate_series(
          date_trunc('month', NOW()) - INTERVAL '5 months',
          date_trunc('month', NOW()),
          INTERVAL '1 month'
        ) AS month
      ),
      counts AS (
        SELECT
          date_trunc('month', created_at) AS month,
          COUNT(*)::int AS views,
          COUNT(DISTINCT visitor_id)::int AS users
        FROM analytics_page_views
        WHERE created_at >= date_trunc('month', NOW()) - INTERVAL '5 months'
        GROUP BY 1
      )
      SELECT
        TO_CHAR(months.month, 'Mon') AS month,
        COALESCE(counts.views, 0)::int AS views,
        COALESCE(counts.users, 0)::int AS users
      FROM months
      LEFT JOIN counts ON counts.month = months.month
      ORDER BY months.month
    `,
    sql`
      SELECT
        COALESCE(utm_source, 'direct') AS name,
        COUNT(*)::int AS views,
        COUNT(DISTINCT session_id)::int AS sessions,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      GROUP BY 1
      ORDER BY views DESC
      LIMIT 8
    `,
    sql`
      SELECT
        COALESCE(utm_medium, 'none') AS name,
        COUNT(*)::int AS views,
        COUNT(DISTINCT session_id)::int AS sessions,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      GROUP BY 1
      ORDER BY views DESC
      LIMIT 8
    `,
    sql`
      SELECT
        COALESCE(utm_content, 'not-set') AS name,
        COUNT(*)::int AS views,
        COUNT(DISTINCT session_id)::int AS sessions,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      GROUP BY 1
      ORDER BY views DESC
      LIMIT 8
    `,
    sql`
      SELECT
        COALESCE(device_type, 'unknown') AS name,
        COUNT(*)::int AS views
      FROM analytics_page_views
      GROUP BY 1
      ORDER BY views DESC
    `,
    sql`
      SELECT
        COALESCE(utm_source, 'direct') AS source,
        COALESCE(utm_medium, 'none') AS medium,
        COALESCE(utm_content, 'not-set') AS content,
        COUNT(*)::int AS views,
        COUNT(DISTINCT visitor_id)::int AS users,
        MAX(created_at) AS "lastSeen"
      FROM analytics_page_views
      WHERE utm_source IS NOT NULL OR utm_medium IS NOT NULL OR utm_content IS NOT NULL
      GROUP BY 1, 2, 3
      ORDER BY views DESC, "lastSeen" DESC
      LIMIT 10
    `,
  ]);

  return json({
    summary: summary.rows[0] || emptySummary,
    daily: daily.rows,
    monthly: monthly.rows,
    utm: {
      sources: sources.rows,
      mediums: mediums.rows,
      contents: contents.rows,
    },
    devices: devices.rows,
    recentCampaigns: recentCampaigns.rows,
  });
}

export const POST = methodNotAllowed;
