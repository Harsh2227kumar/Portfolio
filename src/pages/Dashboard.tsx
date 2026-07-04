import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  BarChart3,
  CalendarDays,
  Check,
  Clipboard,
  Eye,
  Link,
  Lock,
  LogOut,
  Megaphone,
  Monitor,
  RefreshCcw,
  UserPlus,
  Users,
} from 'lucide-react';
import { useTheme } from '@/Context/ThemeContext';

interface Summary {
  users: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  campaignSessions: number;
  campaignViews: number;
}

interface TrendPoint {
  date?: string;
  month?: string;
  views: number;
  users: number;
  sessions?: number;
}

interface RankedMetric {
  name: string;
  views: number;
  users?: number;
  sessions?: number;
}

interface CampaignMetric {
  source: string;
  medium: string;
  content: string;
  views: number;
  users: number;
  lastSeen: string;
}

interface Insights {
  summary: Summary;
  daily: TrendPoint[];
  monthly: TrendPoint[];
  utm: {
    sources: RankedMetric[];
    mediums: RankedMetric[];
    contents: RankedMetric[];
  };
  devices: RankedMetric[];
  recentCampaigns: CampaignMetric[];
}

const numberFormat = new Intl.NumberFormat('en-IN');
const SANS = "'Instrument Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

const dateRanges = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '2m', label: '2 months' },
  { value: '6m', label: '6 months' },
  { value: '1y', label: '1 year' },
] as const;

type DateRange = (typeof dateRanges)[number]['value'];

const defaultInsights: Insights = {
  summary: { users: 0, newUsers: 0, sessions: 0, pageViews: 0, campaignSessions: 0, campaignViews: 0 },
  daily: [],
  monthly: [],
  utm: { sources: [], mediums: [], contents: [] },
  devices: [],
  recentCampaigns: [],
};

const utmOptions = {
  source: [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'behance', label: 'Behance' },
    { value: 'github', label: 'GitHub' },
    { value: 'resume', label: 'Resume' },
  ],
  medium: [
    { value: 'social', label: 'Social' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'pdf', label: 'PDF' },
  ],
  content: [
    { value: 'bio-link', label: 'Bio link' },
    { value: 'featured-project', label: 'Featured project' },
    { value: 'footer', label: 'Footer' },
  ],
};

type Tab = 'analytics' | 'campaign';
type UtmKey = keyof typeof utmOptions;

const Dashboard = () => {
  const { t, dark } = useTheme();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [insights, setInsights] = useState<Insights>(defaultInsights);
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [copied, setCopied] = useState(false);
  const [campaign, setCampaign] = useState({
    path: '/',
    source: 'linkedin',
    medium: 'social',
    content: 'bio-link',
    note: '',
  });

  const accent = dark ? '#22D3EE' : '#0F766E';
  const accentTwo = dark ? '#F59E0B' : '#D97706';
  const accentSoft = dark ? 'rgba(34,211,238,0.16)' : 'rgba(15,118,110,0.11)';
  const cardBg = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)';
  const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const loadDashboard = useCallback(async (range: DateRange = '30d') => {
    setLoadingData(true);
    try {
      const res = await fetch(`/api/dash/insights?range=${range}`, { credentials: 'include' });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) return;
      const data = await res.json();
      setInsights({ ...defaultInsights, ...data, utm: { ...defaultInsights.utm, ...(data.utm || {}) } });
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) return setAuthenticated(false);
        const data = await res.json();
        setAuthenticated(Boolean(data.authenticated));
        if (data.authenticated) await loadDashboard();
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [loadDashboard]);

  const generatedUrl = useMemo(() => {
    const origin = typeof window === 'undefined' ? 'https://your-domain.com' : window.location.origin;
    const normalizedPath = campaign.path.startsWith('/') ? campaign.path : `/${campaign.path}`;
    const url = new URL(normalizedPath, origin);
    url.searchParams.set('utm_source', campaign.source);
    url.searchParams.set('utm_medium', campaign.medium);
    url.searchParams.set('utm_content', campaign.content);
    return url.toString();
  }, [campaign]);

  const sourceDonut = useMemo(() => insights.utm.sources.map((row) => ({ name: row.name, value: Number(row.views || 0) })), [insights.utm.sources]);
  const hasUtmSourceData = sourceDonut.some((row) => row.value > 0);

  const metricCards = [
    { label: 'Users', value: insights.summary.users, Icon: Users },
    { label: 'New Users', value: insights.summary.newUsers, Icon: UserPlus },
    { label: 'Sessions', value: insights.summary.sessions, Icon: Activity },
    { label: 'Page Views', value: insights.summary.pageViews, Icon: Eye },
    { label: 'Campaign Sessions', value: insights.summary.campaignSessions, Icon: Megaphone },
    { label: 'Campaign Views', value: insights.summary.campaignViews, Icon: BarChart3 },
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
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json().catch(() => null) : null;
      setLoginError(data?.error || `Could not log in. Server returned ${res.status}.`);
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

  const copyUrl = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const updateCampaign = (key: keyof typeof campaign, value: string) => {
    const clean = key === 'note' || key === 'path' ? value : value.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
    setCampaign((current) => ({ ...current, [key]: clean }));
  };

  if (checking) {
    return <main style={centerPage(t.bg, t.ink)}><p style={{ fontFamily: SANS, color: t.inkFaint }}>Checking dashboard access...</p></main>;
  }

  if (!authenticated) {
    return (
      <main style={{ ...centerPage(t.bg, t.ink), padding: 24 }}>
        <form onSubmit={login} style={{ width: 'min(100%, 420px)', border: `1px solid ${t.rule}`, background: cardBg, padding: 'clamp(24px,5vw,40px)', borderRadius: 8 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: accentSoft, color: accent, display: 'grid', placeItems: 'center', marginBottom: 24 }}><Lock size={18} /></div>
          <p style={eyebrow(t.inkFaint)}>Private Dashboard</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(34px,7vw,54px)', lineHeight: 0.95, color: t.ink, marginBottom: 24 }}>Analytics Login</h1>
          <label style={labelStyle(t.inkMid)}>Admin password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" style={inputStyle(t.inputBorder, t.ink)} />
          {loginError && <p style={{ fontFamily: SANS, fontSize: 12, color: '#EF4444', marginBottom: 14 }}>{loginError}</p>}
          <button type="submit" style={actionButton(t.btnBg, t.btnFg)}>Open Dashboard</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: t.bg, color: t.ink, padding: 'clamp(20px,4vw,44px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', marginBottom: 22 }}>
          <div>
            <p style={eyebrow(t.inkFaint)}>Portfolio Dashboard</p>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(40px,7vw,74px)', lineHeight: 0.9, color: t.ink }}>Insights</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => loadDashboard(dateRange)} style={smallButton(t.btnBg, t.btnFg)} disabled={loadingData}><RefreshCcw size={15} />{loadingData ? 'Refreshing' : 'Refresh'}</button>
            <button onClick={logout} style={smallButton('transparent', t.inkMid, t.rule)}><LogOut size={15} />Logout</button>
          </div>
        </header>

        <nav style={{ display: 'inline-flex', gap: 6, border: `1px solid ${t.rule}`, borderRadius: 8, padding: 5, marginBottom: 20, background: cardBg }}>
          <button onClick={() => setActiveTab('analytics')} style={tabButton(activeTab === 'analytics', accent, t.btnFg, t.inkMid)}><BarChart3 size={16} />Analytics</button>
          <button onClick={() => setActiveTab('campaign')} style={tabButton(activeTab === 'campaign', accent, t.btnFg, t.inkMid)}><Megaphone size={16} />Campaign</button>
        </nav>

        {activeTab === 'analytics' ? (
          <>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 14, marginBottom: 14 }}>
              {metricCards.map(({ label, value, Icon }) => (
                <article key={label} style={panel(t.rule, cardBg, 18)}>
                  <Icon size={19} color={accent} />
                  <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkMid, marginTop: 15, marginBottom: 7 }}>{label}</p>
                  <strong style={{ fontFamily: SANS, fontSize: 'clamp(24px,4vw,32px)', color: t.ink }}>{numberFormat.format(value)}</strong>
                </article>
              ))}
            </section>

            <section className="dash-main-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(280px, 0.85fr)', gap: 14, marginBottom: 14 }}>
              <ChartPanel
                title="Date Wise Views"
                icon={<CalendarDays size={17} />}
                rule={t.rule}
                bg={cardBg}
                ink={t.ink}
                action={
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {dateRanges.map((range) => (
                      <button key={range.value} onClick={() => { setDateRange(range.value); void loadDashboard(range.value); }} style={rangeButton(dateRange === range.value, accent, t.btnFg, t.inkMid, t.rule)}>
                        {range.label}
                      </button>
                    ))}
                  </div>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={insights.daily} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                    <CartesianGrid stroke={grid} vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: t.inkFaint, fontSize: 11 }} interval="preserveStartEnd" minTickGap={18} />
                    <YAxis tick={{ fill: t.inkFaint, fontSize: 11 }} />
                    <Tooltip contentStyle={tooltip(t.bg, t.rule, t.ink)} />
                    <Line type="monotone" dataKey="views" stroke={accent} strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="users" stroke={accentTwo} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartPanel>

              <ChartPanel title="UTM Source Mix" icon={<Megaphone size={17} />} rule={t.rule} bg={cardBg} ink={t.ink}>
                {hasUtmSourceData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                      <Pie data={sourceDonut} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={sourceDonut.length > 1 ? 3 : 0} stroke={t.bg} strokeWidth={2}>
                        {sourceDonut.map((entry, index) => <Cell key={entry.name} fill={[accent, accentTwo, '#6366F1', '#10B981', '#EF4444', '#8B5CF6'][index % 6]} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltip(t.bg, t.rule, t.ink)} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState title="No UTM source traffic yet" text="Create and share a campaign link to fill this chart." muted={t.inkMid} />
                )}
              </ChartPanel>
            </section>

            <section className="dash-chart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <ChartPanel title="Month Wise Growth" icon={<BarChart3 size={17} />} rule={t.rule} bg={cardBg} ink={t.ink}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insights.monthly} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                    <CartesianGrid stroke={grid} vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: t.inkFaint, fontSize: 11 }} />
                    <YAxis tick={{ fill: t.inkFaint, fontSize: 11 }} />
                    <Tooltip contentStyle={tooltip(t.bg, t.rule, t.ink)} cursor={{ fill: accentSoft }} />
                    <Bar dataKey="views" fill={accent} radius={[5, 5, 0, 0]} />
                    <Bar dataKey="users" fill={accentTwo} radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartPanel>

              <ChartPanel title="Device Count" icon={<Monitor size={17} />} rule={t.rule} bg={cardBg} ink={t.ink}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insights.devices} layout="vertical" margin={{ top: 6, right: 18, left: 18, bottom: 0 }}>
                    <CartesianGrid stroke={grid} horizontal={false} />
                    <XAxis type="number" tick={{ fill: t.inkFaint, fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: t.inkFaint, fontSize: 11 }} width={80} />
                    <Tooltip contentStyle={tooltip(t.bg, t.rule, t.ink)} />
                    <Bar dataKey="views" fill={accentTwo} radius={[0, 5, 5, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartPanel>
            </section>

            <section className="dash-rank-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <RankPanel title="utm_source" rows={insights.utm.sources} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent={accent} />
              <RankPanel title="utm_medium" rows={insights.utm.mediums} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent={accentTwo} />
              <RankPanel title="utm_content" rows={insights.utm.contents} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent="#6366F1" />
            </section>
          </>
        ) : (
          <section className="campaign-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 0.9fr) minmax(0, 1.1fr)', gap: 14 }}>
            <article style={panel(t.rule, cardBg, 22)}>
              <h2 style={sectionTitle(t.ink)}><Link size={18} />Create UTM Link</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={labelStyle(t.inkMid)}>Destination path</label>
                  <input value={campaign.path} onChange={(event) => updateCampaign('path', event.target.value)} placeholder="/ or /#projects" style={{ ...inputStyle(t.inputBorder, t.ink), marginBottom: 0 }} />
                </div>
                {(['source', 'medium', 'content'] as UtmKey[]).map((key) => (
                  <UtmField key={key} name={key} value={campaign[key]} onChange={(value) => updateCampaign(key, value)} ink={t.ink} muted={t.inkMid} border={t.inputBorder} />
                ))}
                <div>
                  <label style={labelStyle(t.inkMid)}>Private note</label>
                  <textarea value={campaign.note} onChange={(event) => updateCampaign('note', event.target.value)} placeholder="Optional context. Not added to URL." rows={3} style={{ ...inputStyle(t.inputBorder, t.ink), marginBottom: 0, resize: 'vertical' }} />
                </div>
              </div>
            </article>

            <article style={panel(t.rule, cardBg, 22)}>
              <h2 style={sectionTitle(t.ink)}><Clipboard size={18} />Generated Campaign URL</h2>
              <div style={{ border: `1px solid ${t.rule}`, borderRadius: 8, padding: 14, background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.55)', color: t.ink, fontFamily: SANS, fontSize: 13, lineHeight: 1.6, wordBreak: 'break-all', marginBottom: 14 }}>{generatedUrl}</div>
              <button onClick={copyUrl} style={actionButton(t.btnBg, t.btnFg)}>{copied ? <Check size={16} /> : <Clipboard size={16} />}{copied ? 'Copied' : 'Copy link'}</button>

              <div style={{ marginTop: 22 }}>
                <h3 style={{ ...chartTitle(t.ink), marginBottom: 10 }}>Top Campaign Combinations</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {(insights.recentCampaigns.length ? insights.recentCampaigns : [{ source: 'No campaign data yet', medium: '-', content: '-', views: 0, users: 0, lastSeen: '' }]).map((row) => (
                    <div key={`${row.source}-${row.medium}-${row.content}`} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, borderBottom: `1px solid ${t.rule}`, paddingBottom: 10 }}>
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ fontFamily: SANS, color: t.ink, fontSize: 13 }}>{row.source}</strong>
                        <p style={{ fontFamily: SANS, color: t.inkMid, fontSize: 12, marginTop: 4, overflowWrap: 'anywhere' }}>{row.medium} / {row.content}</p>
                      </div>
                      <div style={{ textAlign: 'right', fontFamily: SANS }}>
                        <strong style={{ color: accent }}>{numberFormat.format(row.views)}</strong>
                        <p style={{ color: t.inkMid, fontSize: 12 }}>views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dash-main-grid, .dash-chart-grid, .dash-rank-grid, .campaign-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

const ChartPanel = ({ title, icon, rule, bg, ink, action, children }: { title: string; icon: React.ReactNode; rule: string; bg: string; ink: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <article style={{ ...panel(rule, bg, 20), minHeight: 320 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
      <h2 style={{ ...sectionTitle(ink), marginBottom: 0 }}>{icon}{title}</h2>
      {action}
    </div>
    <div style={{ height: 250 }}>{children}</div>
  </article>
);

const RankPanel = ({ title, rows, rule, bg, ink, muted, accent }: { title: string; rows: RankedMetric[]; rule: string; bg: string; ink: string; muted: string; accent: string }) => {
  const max = Math.max(...rows.map((row) => row.views), 1);
  return (
    <article style={panel(rule, bg, 18)}>
      <h2 style={chartTitle(ink)}>{title}</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {(rows.length ? rows : [{ name: 'No data yet', views: 0 }]).map((row) => (
          <div key={row.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: SANS, fontSize: 12, color: ink, marginBottom: 6 }}>
              <span style={{ overflowWrap: 'anywhere' }}>{row.name}</span>
              <strong>{numberFormat.format(row.views)}</strong>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: rule, overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(4, (row.views / max) * 100)}%`, height: '100%', background: accent }} />
            </div>
            <p style={{ fontFamily: SANS, fontSize: 11, color: muted, marginTop: 4 }}>{numberFormat.format(row.sessions || 0)} sessions / {numberFormat.format(row.users || 0)} users</p>
          </div>
        ))}
      </div>
    </article>
  );
};

const UtmField = ({ name, value, onChange, ink, muted, border }: { name: UtmKey; value: string; onChange: (value: string) => void; ink: string; muted: string; border: string }) => (
  <div>
    <label style={labelStyle(muted)}>utm_{name}</label>
    <div className="utm-field-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 0.7fr) minmax(150px, 1fr)', gap: 10 }}>
      <select value={value} onChange={(event) => onChange(event.target.value)} style={{ ...inputStyle(border, ink), marginBottom: 0 }}>
        {utmOptions[name].map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={`custom-${name}`} style={{ ...inputStyle(border, ink), marginBottom: 0 }} />
    </div>
  </div>
);

const centerPage = (background: string, color: string): React.CSSProperties => ({ minHeight: '100vh', display: 'grid', placeItems: 'center', background, color });
const panel = (border: string, background: string, padding: number): React.CSSProperties => ({ border: `1px solid ${border}`, background, borderRadius: 8, padding });
const eyebrow = (color: string): React.CSSProperties => ({ fontFamily: SANS, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 8 });
const labelStyle = (color: string): React.CSSProperties => ({ display: 'block', fontFamily: SANS, fontSize: 12, fontWeight: 800, color, marginBottom: 8 });
const inputStyle = (border: string, color: string): React.CSSProperties => ({ width: '100%', border: `1px solid ${border}`, background: 'transparent', color, borderRadius: 6, padding: '11px 12px', outline: 'none', fontFamily: SANS, fontSize: 13, marginBottom: 14 });
const actionButton = (bg: string, color: string): React.CSSProperties => ({ width: '100%', border: 'none', borderRadius: 6, background: bg, color, fontFamily: SANS, fontWeight: 800, padding: '12px 16px', cursor: 'pointer', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8 });
const smallButton = (bg: string, color: string, border?: string): React.CSSProperties => ({ border: border ? `1px solid ${border}` : 'none', borderRadius: 6, background: bg, color, fontFamily: SANS, fontSize: 12, fontWeight: 800, padding: '10px 13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 });
const tabButton = (active: boolean, bg: string, activeColor: string, inactiveColor: string): React.CSSProperties => ({ border: 'none', borderRadius: 6, background: active ? bg : 'transparent', color: active ? activeColor : inactiveColor, fontFamily: SANS, fontSize: 13, fontWeight: 800, padding: '10px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 });
const rangeButton = (active: boolean, bg: string, activeColor: string, inactiveColor: string, border: string): React.CSSProperties => ({ border: '1px solid ' + (active ? bg : border), borderRadius: 6, background: active ? bg : 'transparent', color: active ? activeColor : inactiveColor, fontFamily: SANS, fontSize: 11, fontWeight: 800, padding: '7px 9px', cursor: 'pointer' });
const sectionTitle = (color: string): React.CSSProperties => ({ fontFamily: SANS, fontSize: 15, fontWeight: 900, color, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 });
const chartTitle = (color: string): React.CSSProperties => ({ fontFamily: SANS, fontSize: 15, fontWeight: 900, color });
const tooltip = (background: string, border: string, color: string): React.CSSProperties => ({ background, border: '1px solid ' + border, color, fontFamily: SANS, borderRadius: 8 });

const EmptyState = ({ title, text, muted }: { title: string; text: string; muted: string }) => (
  <div style={{ height: '100%', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 18 }}>
    <div>
      <p style={{ fontFamily: SANS, fontWeight: 900, fontSize: 14, marginBottom: 6 }}>{title}</p>
      <p style={{ fontFamily: SANS, color: muted, fontSize: 12, lineHeight: 1.5 }}>{text}</p>
    </div>
  </div>
);

export default Dashboard;


