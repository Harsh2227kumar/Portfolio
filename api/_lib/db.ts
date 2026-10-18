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

      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS utm_campaign TEXT`;
      await sql`ALTER TABLE analytics_page_views ADD COLUMN IF NOT EXISTS utm_campaign TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS ip TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS city TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS region TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS region_code TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS postal_code TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS timezone TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS user_agent TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS landing_path TEXT`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS active_seconds INTEGER NOT NULL DEFAULT 0`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS notified_at TIMESTAMPTZ`;
      await sql`ALTER TABLE analytics_sessions ADD COLUMN IF NOT EXISTS summary_sent_at TIMESTAMPTZ`;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id BIGSERIAL PRIMARY KEY,
          visitor_id TEXT NOT NULL,
          session_id TEXT NOT NULL,
          event_type TEXT NOT NULL,
          label TEXT,
          value INTEGER,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS resume_appreciations (
          visitor_id TEXT PRIMARY KEY,
          session_id TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS dash_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_type_created ON analytics_events(event_type, created_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started_at ON analytics_sessions(started_at)`;
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

export interface DashSettings {
  notifyOnVisit: boolean;
  notifySummary: boolean;
}

export const defaultSettings: DashSettings = { notifyOnVisit: false, notifySummary: false };

export const getSettings = async (): Promise<DashSettings> => {
  const { rows } = await sql`SELECT key, value FROM dash_settings`;
  const settings = { ...defaultSettings };
  for (const row of rows) {
    if (row.key in settings) settings[row.key as keyof DashSettings] = row.value === 'true';
  }
  return settings;
};

export const saveSetting = async (key: keyof DashSettings, value: boolean) => {
  await sql`
    INSERT INTO dash_settings (key, value, updated_at)
    VALUES (${key}, ${String(value)}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `;
};

export { sql };
