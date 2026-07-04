import { createPool } from '@vercel/postgres';

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const pool = createPool({ connectionString });
const sql = pool.sql.bind(pool) as typeof pool.sql;

let schemaReady: Promise<void> | null = null;

export const ensureAnalyticsSchema = () => {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS analytics_visitors (
          visitor_id TEXT PRIMARY KEY,
          first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          device_type TEXT,
          country_code TEXT
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_sessions (
          session_id TEXT PRIMARY KEY,
          visitor_id TEXT NOT NULL REFERENCES analytics_visitors(visitor_id) ON DELETE CASCADE,
          started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          referrer TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_content TEXT,
          device_type TEXT,
          country_code TEXT
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_page_views (
          id BIGSERIAL PRIMARY KEY,
          visitor_id TEXT NOT NULL REFERENCES analytics_visitors(visitor_id) ON DELETE CASCADE,
          session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
          path TEXT NOT NULL,
          referrer TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_content TEXT,
          device_type TEXT,
          country_code TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS utm_source TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS utm_medium TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS utm_content TEXT`;
      await sql`ALTER TABLE analytics_page_views ADD COLUMN IF NOT EXISTS utm_source TEXT`;
      await sql`ALTER TABLE analytics_page_views ADD COLUMN IF NOT EXISTS utm_medium TEXT`;
      await sql`ALTER TABLE analytics_page_views ADD COLUMN IF NOT EXISTS utm_content TEXT`;

      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_page_views_created_at ON analytics_page_views(created_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_page_views_session_id ON analytics_page_views(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_page_views_utm_source ON analytics_page_views(utm_source)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_page_views_utm_medium ON analytics_page_views(utm_medium)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_page_views_utm_content ON analytics_page_views(utm_content)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_sessions_visitor_id ON analytics_sessions(visitor_id)`;
    })();
  }

  return schemaReady;
};

export { sql };
