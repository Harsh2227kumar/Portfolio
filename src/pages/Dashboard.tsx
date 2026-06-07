import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Eye, LogOut, RefreshCcw, Users, UserPlus, Activity, Lock } from 'lucide-react';
import { useTheme } from '@/Context/ThemeContext';

interface Summary {
  users: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
}

interface NewReturning {
  newUsers: number;
  returningUsers: number;
}

interface HourlyPoint {
  hour: string;
  users: number;
}

const numberFormat = new Intl.NumberFormat('en-IN');

const defaultSummary: Summary = {
  users: 0,
  newUsers: 0,
  sessions: 0,
  pageViews: 0,
};

const Dashboard = () => {
  const { t, dark } = useTheme();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [summary, setSummary] = useState<Summary>(defaultSummary);
  const [newReturning, setNewReturning] = useState<NewReturning>({ newUsers: 0, returningUsers: 0 });
  const [hourly, setHourly] = useState<HourlyPoint[]>([]);

  const SANS = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";
  const accent = dark ? '#A78BFA' : '#7C3AED';
  const accentSoft = dark ? 'rgba(167,139,250,0.18)' : 'rgba(124,58,237,0.12)';
  const cardBg = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)';
  const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const loadDashboard = async () => {
    setLoadingData(true);
    try {
      const [summaryRes, newReturningRes, hourlyRes] = await Promise.all([
        fetch('/api/dash/summary', { credentials: 'include' }),
        fetch('/api/dash/new-vs-returning', { credentials: 'include' }),
        fetch('/api/dash/hourly-users', { credentials: 'include' }),
      ]);

      if ([summaryRes, newReturningRes, hourlyRes].some((res) => res.status === 401)) {
        setAuthenticated(false);
        return;
      }

      const summaryJson = await summaryRes.json();
      const newReturningJson = await newReturningRes.json();
      const hourlyJson = await hourlyRes.json();

      setSummary({
        users: Number(summaryJson.users || 0),
        newUsers: Number(summaryJson.newUsers || 0),
        sessions: Number(summaryJson.sessions || 0),
        pageViews: Number(summaryJson.pageViews || 0),
      });
      setNewReturning({
        newUsers: Number(newReturningJson.newUsers || 0),
        returningUsers: Number(newReturningJson.returningUsers || 0),
      });
      setHourly(Array.isArray(hourlyJson.hours) ? hourlyJson.hours : []);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          setAuthenticated(false);
          return;
        }
        const data = await res.json();
        setAuthenticated(Boolean(data.authenticated));
        if (data.authenticated) await loadDashboard();
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  const donutData = useMemo(() => {
    const rows = [
      { name: 'New', value: newReturning.newUsers },
      { name: 'Returning', value: newReturning.returningUsers },
    ];

    return rows.some((row) => row.value > 0) ? rows : [{ name: 'No data', value: 1 }];
  }, [newReturning]);

  const cards = [
    { label: 'Users', value: summary.users, Icon: Users },
    { label: 'New Users', value: summary.newUsers, Icon: UserPlus },
    { label: 'Sessions', value: summary.sessions, Icon: Activity },
    { label: 'Page Views', value: summary.pageViews, Icon: Eye },
  ];

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setLoginError(data?.error || 'Could not log in.');
      return;
    }

    setPassword('');
    setAuthenticated(true);
    await loadDashboard();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: t.bg, color: t.ink }}>
        <p style={{ fontFamily: SANS, color: t.inkFaint }}>Checking dashboard access...</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: t.bg, color: t.ink, padding: 24 }}>
        <form
          onSubmit={login}
          style={{
            width: 'min(100%, 420px)',
            border: `1px solid ${t.rule}`,
            background: cardBg,
            padding: 'clamp(24px,5vw,40px)',
            borderRadius: 8,
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: accentSoft, color: accent, display: 'grid', placeItems: 'center', marginBottom: 24 }}>
            <Lock size={18} />
          </div>
          <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 8 }}>
            Private Dashboard
          </p>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(34px,7vw,54px)', lineHeight: 0.95, color: t.ink, marginBottom: 24 }}>
            Analytics Login
          </h1>
          <label style={{ display: 'block', fontFamily: SANS, fontSize: 12, fontWeight: 700, color: t.inkMid, marginBottom: 8 }}>
            Admin password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            style={{
              width: '100%',
              border: `1px solid ${t.inputBorder}`,
              background: 'transparent',
              color: t.ink,
              borderRadius: 6,
              padding: '12px 13px',
              outline: 'none',
              fontFamily: SANS,
              marginBottom: 14,
            }}
          />
          {loginError && (
            <p style={{ fontFamily: SANS, fontSize: 12, color: '#EF4444', marginBottom: 14 }}>{loginError}</p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              border: 'none',
              borderRadius: 6,
              background: t.btnBg,
              color: t.btnFg,
              fontFamily: SANS,
              fontWeight: 800,
              padding: '12px 16px',
              cursor: 'pointer',
            }}
          >
            Open Dashboard
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: t.bg, color: t.ink, padding: 'clamp(24px,4vw,48px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', marginBottom: 28 }}>
          <div>
            <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 8 }}>
              Portfolio Analytics
            </p>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(42px,7vw,76px)', lineHeight: 0.9, color: t.ink }}>
              Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={loadDashboard} style={actionButton(t.btnBg, t.btnFg, SANS)} disabled={loadingData}>
              <RefreshCcw size={15} />
              {loadingData ? 'Refreshing' : 'Refresh'}
            </button>
            <button onClick={logout} style={actionButton('transparent', t.inkMid, SANS, t.rule)}>
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 16 }}>
          {cards.map(({ label, value, Icon }) => (
            <article key={label} style={{ border: `1px solid ${t.rule}`, background: cardBg, borderRadius: 8, padding: 22 }}>
              <Icon size={20} color={accent} />
              <p style={{ fontFamily: SANS, fontSize: 13, color: t.inkMid, marginTop: 18, marginBottom: 8 }}>{label}</p>
              <strong style={{ fontFamily: SANS, fontSize: 'clamp(26px,4vw,34px)', color: t.ink }}>
                {numberFormat.format(value)}
              </strong>
            </article>
          ))}
        </section>

        <section className="dash-chart-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 360px) 1fr', gap: 16 }}>
          <article style={{ border: `1px solid ${t.rule}`, background: cardBg, borderRadius: 8, padding: 22, minHeight: 330 }}>
            <h2 style={chartTitle(SANS, t.ink)}>New vs Returning Users</h2>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={88} paddingAngle={4}>
                    {donutData.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.name === 'No data' ? t.rule : index === 0 ? accent : dark ? '#5B4B8A' : '#C4B5FD'} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: t.bg, border: `1px solid ${t.rule}`, color: t.ink }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article style={{ border: `1px solid ${t.rule}`, background: cardBg, borderRadius: 8, padding: 22, minHeight: 330 }}>
            <h2 style={chartTitle(SANS, t.ink)}>Average User Count by Time of Day</h2>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourly} margin={{ top: 12, right: 12, bottom: 22, left: 0 }}>
                  <CartesianGrid stroke={grid} vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: t.inkFaint, fontSize: 11 }} angle={-45} textAnchor="end" height={58} />
                  <YAxis tick={{ fill: t.inkFaint, fontSize: 11 }} width={42} />
                  <Tooltip contentStyle={{ background: t.bg, border: `1px solid ${t.rule}`, color: t.ink }} cursor={{ fill: accentSoft }} />
                  <Bar dataKey="users" fill={accent} radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-chart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};

const actionButton = (bg: string, color: string, fontFamily: string, border?: string): React.CSSProperties => ({
  border: border ? `1px solid ${border}` : 'none',
  borderRadius: 6,
  background: bg,
  color,
  fontFamily,
  fontSize: 12,
  fontWeight: 800,
  padding: '10px 13px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
});

const chartTitle = (fontFamily: string, color: string): React.CSSProperties => ({
  fontFamily,
  fontSize: 15,
  fontWeight: 800,
  color,
  marginBottom: 16,
});

export default Dashboard;
