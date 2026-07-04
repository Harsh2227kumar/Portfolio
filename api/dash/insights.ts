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

const ranges = {
  '24h': { interval: "23 hours", step: "1 hour", bucket: "hour", label: "HH24:00" },
  '7d': { interval: "6 days", step: "1 day", bucket: "day", label: "Mon DD" },
  '30d': { interval: "29 days", step: "1 day", bucket: "day", label: "Mon DD" },
  '2m': { interval: "59 days", step: "1 day", bucket: "day", label: "Mon DD" },
  '6m': { interval: "5 months", step: "1 month", bucket: "month", label: "Mon" },
  '1y': { interval: "11 months", step: "1 month", bucket: "month", label: "Mon YYYY" },
} as const;

type RangeKey = keyof typeof ranges;

const getRange = (request: Request): RangeKey => {
  const value = new URL(request.url).searchParams.get('range');
  return value && value in ranges ? (value as RangeKey) : '30d';
};

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  await ensureAnalyticsSchema();

  const range = ranges[getRange(request)];

  const [summary, trend, monthly, sources, mediums, contents, devices, recentCampaigns] = await Promise.all([
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
      WITH buckets AS (
        SELECT generate_series(
          date_trunc(${range.bucket}, NOW()) - (${range.interval})::interval,
          date_trunc(${range.bucket}, NOW()),
          (${range.step})::interval
        ) AS bucket
      ),
      counts AS (
        SELECT
          date_trunc(${range.bucket}, created_at) AS bucket,
          COUNT(*)::int AS views,
          COUNT(DISTINCT visitor_id)::int AS users,
          COUNT(DISTINCT session_id)::int AS sessions
        FROM analytics_page_views
        WHERE created_at >= date_trunc(${range.bucket}, NOW()) - (${range.interval})::interval
        GROUP BY 1
      )
      SELECT
        TO_CHAR(buckets.bucket, ${range.label}) AS date,
        COALESCE(counts.views, 0)::int AS views,
        COALESCE(counts.users, 0)::int AS users,
        COALESCE(counts.sessions, 0)::int AS sessions
      FROM buckets
      LEFT JOIN counts ON counts.bucket = buckets.bucket
      ORDER BY buckets.bucket
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
        utm_source AS name,
        COUNT(*)::int AS views,
        COUNT(DISTINCT session_id)::int AS sessions,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      WHERE utm_source IS NOT NULL
      GROUP BY 1
      ORDER BY views DESC
      LIMIT 8
    `,
    sql`
      SELECT
        utm_medium AS name,
        COUNT(*)::int AS views,
        COUNT(DISTINCT session_id)::int AS sessions,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      WHERE utm_medium IS NOT NULL
      GROUP BY 1
      ORDER BY views DESC
      LIMIT 8
    `,
    sql`
      SELECT
        utm_content AS name,
        COUNT(*)::int AS views,
        COUNT(DISTINCT session_id)::int AS sessions,
        COUNT(DISTINCT visitor_id)::int AS users
      FROM analytics_page_views
      WHERE utm_content IS NOT NULL
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
        utm_source AS source,
        utm_medium AS medium,
        utm_content AS content,
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
    daily: trend.rows,
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
