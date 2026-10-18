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
  Bell,
  BellOff,
  CalendarDays,
  Check,
  Clipboard,
  Clock,
  Download,
  Eye,
  FileText,
  Globe2,
  Link,
  Lock,
  LogOut,
  MapPin,
  Megaphone,
  Monitor,
  RefreshCcw,
  Search,
  Send,
  Star,
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
  appreciations: number;
  resumeOpens: number;
  avgActiveSeconds: number;
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

interface VisitorRow {
  sessionId: string;
  visitorId: string;
  startedAt: string;
  lastSeen: string;
  ip: string | null;
  city: string | null;
  region: string | null;
  countryCode: string | null;
  device: string | null;
  userAgent: string | null;
  referrer: string | null;
  landingPath: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  activeSeconds: number;
  pageViews: number;
  resumeOpened: boolean;
  previousSessions: number;
}

interface LocationRow {
  countryCode: string | null;
  region: string | null;
  city: string | null;
  sessions: number;
  users: number;
  ips: number;
  lastSeen: string;
}

interface ResumeEvent {
  type: string;
  label: string | null;
  value: number | null;
  createdAt: string;
  ip: string | null;
  city: string | null;
  region: string | null;
  countryCode: string | null;
}

interface ResumeStats {
  totals: {
    opens?: number;
    viewers?: number;
    downloads?: number;
    linkClicks?: number;
    appreciations?: number;
    avgReadSeconds?: number;
    totalReadSeconds?: number;
  };
  placements: RankedMetric[];
  sources: RankedMetric[];
  links: RankedMetric[];
  recent: ResumeEvent[];
}

interface Insights {
  summary: Summary;
  daily: TrendPoint[];
  monthly: TrendPoint[];
  utm: {
    sources: RankedMetric[];
    mediums: RankedMetric[];
    contents: RankedMetric[];
    campaigns: RankedMetric[];
  };
  devices: RankedMetric[];
  recentCampaigns: CampaignMetric[];
  resume: ResumeStats;
  visitors: VisitorRow[];
  locations: LocationRow[];
}

interface AlertSettings {
  settings: { notifyOnVisit: boolean; notifySummary: boolean };
  email: { configured: boolean; to: string };
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
  summary: { users: 0, newUsers: 0, sessions: 0, pageViews: 0, campaignSessions: 0, campaignViews: 0, appreciations: 0, resumeOpens: 0, avgActiveSeconds: 0 },
  daily: [],
  monthly: [],
  utm: { sources: [], mediums: [], contents: [], campaigns: [] },
  devices: [],
  recentCampaigns: [],
  resume: { totals: {}, placements: [], sources: [], links: [], recent: [] },
  visitors: [],
  locations: [],
};

/* ─── UTM builder options ───────────────────────────── */
const utmOptions = {
  source: [
    { value: 'resume', label: 'Resume (PDF)' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'github', label: 'GitHub' },
    { value: 'naukri', label: 'Naukri' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'wellfound', label: 'Wellfound' },
    { value: 'internshala', label: 'Internshala' },
    { value: 'unstop', label: 'Unstop' },
    { value: 'devfolio', label: 'Devfolio' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter-x', label: 'X / Twitter' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
    { value: 'referral', label: 'Referral' },
    { value: 'college', label: 'College / placement cell' },
    { value: 'behance', label: 'Behance' },
    { value: 'qr-code', label: 'QR code' },
  ],
  medium: [
    { value: 'resume-pdf', label: 'Resume PDF' },
    { value: 'social', label: 'Social' },
    { value: 'job-portal', label: 'Job portal' },
    { value: 'email', label: 'Email' },
    { value: 'dm', label: 'Direct message' },
    { value: 'referral', label: 'Referral' },
    { value: 'bio', label: 'Profile bio' },
    { value: 'print', label: 'Printed' },
    { value: 'qr', label: 'QR scan' },
    { value: 'portfolio', label: 'Portfolio' },
  ],
  content: [
    { value: 'resume-header', label: 'Resume — header link' },
    { value: 'resume-contact-line', label: 'Resume — contact line' },
    { value: 'resume-projects', label: 'Resume — projects section' },
    { value: 'resume-footer', label: 'Resume — footer' },
    { value: 'resume-qr', label: 'Resume — QR code' },
    { value: 'bio-link', label: 'Bio link' },
    { value: 'featured-section', label: 'Featured section' },
    { value: 'post', label: 'Post' },
    { value: 'email-signature', label: 'Email signature' },
    { value: 'cover-letter', label: 'Cover letter' },
    { value: 'application-form', label: 'Application form' },
    { value: 'footer', label: 'Footer' },
  ],
  campaign: [
    { value: 'job-hunt-2026', label: 'Job hunt 2026' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'networking', label: 'Networking' },
    { value: 'cold-outreach', label: 'Cold outreach' },
  ],
};

const destinations = [
  { value: '/', label: 'Home' },
  { value: '/resume', label: 'Resume viewer (opens PDF popup)' },
  { value: '/#projects', label: 'Projects' },
  { value: '/#experience', label: 'Work experience' },
  { value: '/#hackathons', label: 'Hackathons' },
  { value: '/#skills', label: 'Skills' },
  { value: '/#contact', label: 'Contact' },
];

const campaignPresets = [
  { label: 'Resume PDF header', path: '/', source: 'resume', medium: 'resume-pdf', content: 'resume-header', campaign: 'job-hunt-2026' },
  { label: 'Resume QR code', path: '/', source: 'resume', medium: 'qr', content: 'resume-qr', campaign: 'job-hunt-2026' },
  { label: 'LinkedIn bio', path: '/', source: 'linkedin', medium: 'bio', content: 'bio-link', campaign: '' },
  { label: 'LinkedIn → resume', path: '/resume', source: 'linkedin', medium: 'social', content: 'featured-section', campaign: '' },
  { label: 'Naukri profile', path: '/resume', source: 'naukri', medium: 'job-portal', content: 'application-form', campaign: 'job-hunt-2026' },
  { label: 'Email signature', path: '/', source: 'email', medium: 'email', content: 'email-signature', campaign: '' },
  { label: 'Cover letter', path: '/resume', source: 'email', medium: 'email', content: 'cover-letter', campaign: 'job-hunt-2026' },
  { label: 'GitHub profile', path: '/#projects', source: 'github', medium: 'bio', content: 'bio-link', campaign: '' },
];

const placementLabels: Record<string, string> = {
  hero: 'Hero button',
  sidebar: 'Sidebar',
  'mobile-topbar': 'Mobile top bar',
  contact: 'Contact section',
  footer: 'Footer',
  'direct-link': 'Direct /resume link',
};

const eventLabels: Record<string, string> = {
  resume_open: 'Opened',
  resume_download: 'Downloaded',
  resume_view_time: 'Read',
  resume_link_click: 'Clicked link',
  resume_new_tab: 'Opened in new tab',
  resume_appreciate: 'Appreciated ★',
  resume_unappreciate: 'Removed ★',
};

type Tab = 'analytics' | 'visitors' | 'resume' | 'campaign' | 'alerts';
type UtmKey = keyof typeof utmOptions;

const formatDuration = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds || 0));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' });
  } catch {
    return null;
  }
})();
const countryLabel = (code: string | null) => (code ? regionNames?.of(code) || code : null);
const flag = (code: string | null) =>
  code && /^[A-Z]{2}$/.test(code) ? String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : '';
const dateTime = (value: string) =>
  value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '-';
const shortReferrer = (value: string | null) => {
  if (!value) return 'Direct';
  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
};

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
  const [visitorQuery, setVisitorQuery] = useState('');
  const [alerts, setAlerts] = useState<AlertSettings | null>(null);
  const [alertBusy, setAlertBusy] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [campaign, setCampaign] = useState({
    path: '/',
    source: 'resume',
    medium: 'resume-pdf',
    content: 'resume-header',
    campaign: '',
    note: '',
  });

  const accent = dark ? '#22D3EE' : '#0F766E';
  const accentTwo = dark ? '#F59E0B' : '#D97706';
  const accentSoft = dark ? 'rgba(34,211,238,0.16)' : 'rgba(15,118,110,0.11)';
  const cardBg = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)';
  const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const optionBg = dark ? '#1A1A18' : '#FFFFFF';

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
      setInsights({
        ...defaultInsights,
        ...data,
        summary: { ...defaultInsights.summary, ...(data.summary || {}) },
        utm: { ...defaultInsights.utm, ...(data.utm || {}) },
        resume: { ...defaultInsights.resume, ...(data.resume || {}) },
      });
    } finally {
      setLoadingData(false);
    }
  }, []);

  const loadAlerts = useCallback(async () => {
    const res = await fetch('/api/dash/settings', { credentials: 'include' });
    if (res.ok) setAlerts(await res.json());
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) return setAuthenticated(false);
        const data = await res.json();
        setAuthenticated(Boolean(data.authenticated));
        if (data.authenticated) await Promise.all([loadDashboard(), loadAlerts()]);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [loadDashboard, loadAlerts]);

  const generatedUrl = useMemo(() => {
    const origin = typeof window === 'undefined' ? 'https://your-domain.com' : window.location.origin;
    const raw = campaign.path.trim() || '/';
    const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
    let url: URL;
    try {
      url = new URL(normalizedPath, origin);
      if (url.origin !== origin) throw new Error('external');
    } catch {
      url = new URL('/', origin);
    }
    (['source', 'medium', 'content', 'campaign'] as UtmKey[]).forEach((key) => {
      if (campaign[key]) url.searchParams.set(`utm_${key}`, campaign[key]);
      else url.searchParams.delete(`utm_${key}`);
    });
    return url.toString();
  }, [campaign]);

  const sourceDonut = useMemo(() => insights.utm.sources.map((row) => ({ name: row.name, value: Number(row.views || 0) })), [insights.utm.sources]);
  const hasUtmSourceData = sourceDonut.some((row) => row.value > 0);

  const filteredVisitors = useMemo(() => {
    const q = visitorQuery.trim().toLowerCase();
    if (!q) return insights.visitors;
    return insights.visitors.filter((v) =>
      [v.ip, v.city, v.region, v.countryCode, countryLabel(v.countryCode), v.device, v.referrer, v.utmSource]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [insights.visitors, visitorQuery]);

  const uniqueIps = useMemo(() => new Set(insights.visitors.map((v) => v.ip).filter(Boolean)).size, [insights.visitors]);

  const metricCards = [
    { label: 'Users', value: numberFormat.format(insights.summary.users), Icon: Users },
    { label: 'New Users', value: numberFormat.format(insights.summary.newUsers), Icon: UserPlus },
    { label: 'Sessions', value: numberFormat.format(insights.summary.sessions), Icon: Activity },
    { label: 'Page Views', value: numberFormat.format(insights.summary.pageViews), Icon: Eye },
    { label: 'Avg Active Time', value: formatDuration(insights.summary.avgActiveSeconds), Icon: Clock },
    { label: 'Resume Opens', value: numberFormat.format(insights.summary.resumeOpens), Icon: FileText },
    { label: 'Resume Appreciations', value: numberFormat.format(insights.summary.appreciations), Icon: Star },
    { label: 'Campaign Sessions', value: numberFormat.format(insights.summary.campaignSessions), Icon: Megaphone },
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
    await Promise.all([loadDashboard(), loadAlerts()]);
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

  const updateAlerts = async (patch: Partial<AlertSettings['settings']> | { action: 'test' }) => {
    setAlertBusy(true);
    setAlertMessage('');
    try {
      const res = await fetch('/api/dash/settings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const data = await res.json().catch(() => null);
      if (data?.settings) setAlerts({ settings: data.settings, email: data.email });
      if ('action' in patch) setAlertMessage(data?.test?.ok ? `Test email sent to ${data.email.to}.` : `Test failed: ${data?.test?.error || res.status}`);
      else if (!res.ok) setAlertMessage(`Could not save: ${data?.error || res.status}`);
    } finally {
      setAlertBusy(false);
    }
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

  const notifyOn = Boolean(alerts?.settings.notifyOnVisit);
  const resumeTotals = insights.resume.totals;

  return (
    <main style={{ minHeight: '100vh', background: t.bg, color: t.ink, padding: 'clamp(20px,4vw,44px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', marginBottom: 22 }}>
          <div>
            <p style={eyebrow(t.inkFaint)}>Portfolio Dashboard</p>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(40px,7vw,74px)', lineHeight: 0.9, color: t.ink }}>Insights</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <label
              title={alerts?.email.configured ? `Email ${alerts.email.to} when someone visits` : 'Email is not configured yet: see the Alerts tab'}
              style={{ ...smallButton('transparent', notifyOn ? accent : t.inkMid, notifyOn ? accent : t.rule), cursor: alertBusy || !alerts ? 'wait' : 'pointer' }}
            >
              {notifyOn ? <Bell size={15} /> : <BellOff size={15} />}
              Visit emails
              <Toggle checked={notifyOn} disabled={alertBusy || !alerts} onChange={(value) => updateAlerts({ notifyOnVisit: value })} accent={accent} rule={t.rule} knob={t.bg} />
            </label>
            <button onClick={() => { void loadDashboard(dateRange); void loadAlerts(); }} style={smallButton(t.btnBg, t.btnFg)} disabled={loadingData}><RefreshCcw size={15} />{loadingData ? 'Refreshing' : 'Refresh'}</button>
            <button onClick={logout} style={smallButton('transparent', t.inkMid, t.rule)}><LogOut size={15} />Logout</button>
          </div>
        </header>

        <nav style={{ display: 'flex', gap: 6, border: `1px solid ${t.rule}`, borderRadius: 8, padding: 5, marginBottom: 20, background: cardBg, width: 'fit-content', maxWidth: '100%', overflowX: 'auto' }}>
          <button onClick={() => setActiveTab('analytics')} style={tabButton(activeTab === 'analytics', accent, t.btnFg, t.inkMid)}><BarChart3 size={16} />Analytics</button>
          <button onClick={() => setActiveTab('visitors')} style={tabButton(activeTab === 'visitors', accent, t.btnFg, t.inkMid)}><Globe2 size={16} />Visitors</button>
          <button onClick={() => setActiveTab('resume')} style={tabButton(activeTab === 'resume', accent, t.btnFg, t.inkMid)}><FileText size={16} />Resume</button>
          <button onClick={() => setActiveTab('campaign')} style={tabButton(activeTab === 'campaign', accent, t.btnFg, t.inkMid)}><Megaphone size={16} />Campaign</button>
          <button onClick={() => setActiveTab('alerts')} style={tabButton(activeTab === 'alerts', accent, t.btnFg, t.inkMid)}><Bell size={16} />Alerts</button>
        </nav>

        {activeTab === 'analytics' && (
          <>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 14, marginBottom: 14 }}>
              {metricCards.map(({ label, value, Icon }) => (
                <article key={label} style={panel(t.rule, cardBg, 18)}>
                  <Icon size={19} color={accent} />
                  <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkMid, marginTop: 15, marginBottom: 7 }}>{label}</p>
                  <strong style={{ fontFamily: SANS, fontSize: 'clamp(24px,4vw,32px)', color: t.ink }}>{value}</strong>
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

            <section className="dash-rank-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              <RankPanel title="utm_source" rows={insights.utm.sources} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent={accent} />
              <RankPanel title="utm_medium" rows={insights.utm.mediums} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent={accentTwo} />
              <RankPanel title="utm_content" rows={insights.utm.contents} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent="#6366F1" />
              <RankPanel title="utm_campaign" rows={insights.utm.campaigns} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent="#10B981" />
            </section>
          </>
        )}

        {activeTab === 'visitors' && (
          <>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 14, marginBottom: 14 }}>
              {[
                { label: 'Recent sessions', value: numberFormat.format(insights.visitors.length), Icon: Activity },
                { label: 'Unique IPs', value: numberFormat.format(uniqueIps), Icon: Globe2 },
                { label: 'Locations', value: numberFormat.format(insights.locations.length), Icon: MapPin },
                { label: 'Avg active time', value: formatDuration(insights.summary.avgActiveSeconds), Icon: Clock },
              ].map(({ label, value, Icon }) => (
                <article key={label} style={panel(t.rule, cardBg, 18)}>
                  <Icon size={19} color={accent} />
                  <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkMid, marginTop: 15, marginBottom: 7 }}>{label}</p>
                  <strong style={{ fontFamily: SANS, fontSize: 'clamp(24px,4vw,32px)', color: t.ink }}>{value}</strong>
                </article>
              ))}
            </section>

            <section className="dash-main-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.75fr) minmax(0, 1.6fr)', gap: 14, alignItems: 'start' }}>
              <article style={panel(t.rule, cardBg, 20)}>
                <h2 style={sectionTitle(t.ink)}><MapPin size={17} />Top Locations</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {insights.locations.length ? insights.locations.map((loc) => {
                    const max = Math.max(...insights.locations.map((l) => l.sessions), 1);
                    return (
                      <div key={`${loc.countryCode}-${loc.region}-${loc.city}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: SANS, fontSize: 12.5, color: t.ink, marginBottom: 6 }}>
                          <span style={{ overflowWrap: 'anywhere' }}>{flag(loc.countryCode)} {[loc.city, loc.region, countryLabel(loc.countryCode)].filter(Boolean).join(', ') || 'Unknown'}</span>
                          <strong>{numberFormat.format(loc.sessions)}</strong>
                        </div>
                        <div style={{ height: 6, borderRadius: 999, background: t.rule, overflow: 'hidden' }}>
                          <div style={{ width: `${Math.max(4, (loc.sessions / max) * 100)}%`, height: '100%', background: accent }} />
                        </div>
                        <p style={{ fontFamily: SANS, fontSize: 11, color: t.inkMid, marginTop: 4 }}>{numberFormat.format(loc.users)} users · {numberFormat.format(loc.ips)} IPs · last {dateTime(loc.lastSeen)}</p>
                      </div>
                    );
                  }) : <EmptyState title="No location data yet" text="Locations come from Vercel's IP geolocation headers, so they appear once the site is deployed." muted={t.inkMid} />}
                </div>
              </article>

              <article style={{ ...panel(t.rule, cardBg, 20), minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
                  <h2 style={{ ...sectionTitle(t.ink), marginBottom: 0 }}><Users size={17} />Visitor Log</h2>
                  <div style={{ position: 'relative', width: 'min(100%, 280px)' }}>
                    <Search size={14} color={t.inkFaint} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={visitorQuery} onChange={(e) => setVisitorQuery(e.target.value)} placeholder="Filter by IP, city, country..." style={{ ...inputStyle(t.inputBorder, t.ink), marginBottom: 0, paddingLeft: 32 }} />
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: SANS, fontSize: 12.5, minWidth: 860 }}>
                    <thead>
                      <tr>
                        {['When', 'IP address', 'City', 'State', 'Country', 'Device', 'Active', 'Pages', 'Source', 'Resume'].map((h) => (
                          <th key={h} style={{ textAlign: 'left', padding: '9px 10px', color: t.inkMid, fontWeight: 800, fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: `1px solid ${t.rule}`, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVisitors.length ? filteredVisitors.map((v) => (
                        <tr key={v.sessionId} title={v.userAgent || undefined}>
                          <td style={cell(t.rule, t.inkMid)}>{dateTime(v.startedAt)}{v.previousSessions > 0 && <span style={{ ...pill(accentSoft, accent), marginLeft: 6 }}>returning</span>}</td>
                          <td style={{ ...cell(t.rule, t.ink), fontVariantNumeric: 'tabular-nums' }}>{v.ip || '-'}</td>
                          <td style={cell(t.rule, t.ink)}>{v.city || '-'}</td>
                          <td style={cell(t.rule, t.ink)}>{v.region || '-'}</td>
                          <td style={cell(t.rule, t.ink)}>{v.countryCode ? `${flag(v.countryCode)} ${countryLabel(v.countryCode)}` : '-'}</td>
                          <td style={cell(t.rule, t.inkMid)}>{v.device || '-'}</td>
                          <td style={{ ...cell(t.rule, t.ink), fontVariantNumeric: 'tabular-nums' }}>{formatDuration(v.activeSeconds)}</td>
                          <td style={{ ...cell(t.rule, t.ink), fontVariantNumeric: 'tabular-nums' }}>{v.pageViews}</td>
                          <td style={cell(t.rule, t.inkMid)}>{v.utmSource ? `${v.utmSource}${v.utmMedium ? ` / ${v.utmMedium}` : ''}` : shortReferrer(v.referrer)}</td>
                          <td style={cell(t.rule, t.inkMid)}>{v.resumeOpened ? <span style={pill(dark ? 'rgba(245,158,11,0.15)' : 'rgba(217,119,6,0.1)', accentTwo)}>opened</span> : '-'}</td>
                        </tr>
                      )) : (
                        <tr><td colSpan={10} style={{ padding: 22, textAlign: 'center', color: t.inkMid }}>{insights.visitors.length ? 'No sessions match this filter.' : 'No visitors recorded yet.'}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontFamily: SANS, fontSize: 11, color: t.inkFaint, marginTop: 12 }}>Latest 300 sessions. Location is approximate (IP-based, usually city-level). Hover a row for the full browser string.</p>
              </article>
            </section>
          </>
        )}

        {activeTab === 'resume' && (
          <>
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: 14, marginBottom: 14 }}>
              {[
                { label: 'Opens', value: numberFormat.format(resumeTotals.opens || 0), Icon: Eye },
                { label: 'Unique viewers', value: numberFormat.format(resumeTotals.viewers || 0), Icon: Users },
                { label: 'Downloads', value: numberFormat.format(resumeTotals.downloads || 0), Icon: Download },
                { label: 'Appreciations', value: numberFormat.format(resumeTotals.appreciations || 0), Icon: Star },
                { label: 'Avg read time', value: formatDuration(resumeTotals.avgReadSeconds || 0), Icon: Clock },
                { label: 'Link clicks', value: numberFormat.format(resumeTotals.linkClicks || 0), Icon: Link },
              ].map(({ label, value, Icon }) => (
                <article key={label} style={panel(t.rule, cardBg, 18)}>
                  <Icon size={19} color={label === 'Appreciations' ? accentTwo : accent} />
                  <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkMid, marginTop: 15, marginBottom: 7 }}>{label}</p>
                  <strong style={{ fontFamily: SANS, fontSize: 'clamp(24px,4vw,32px)', color: t.ink }}>{value}</strong>
                </article>
              ))}
            </section>

            <section className="dash-chart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <ChartPanel title="Opens by Placement" icon={<FileText size={17} />} rule={t.rule} bg={cardBg} ink={t.ink}>
                {insights.resume.placements.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={insights.resume.placements.map((p) => ({ ...p, name: placementLabels[p.name] || p.name }))} layout="vertical" margin={{ top: 6, right: 18, left: 18, bottom: 0 }}>
                      <CartesianGrid stroke={grid} horizontal={false} />
                      <XAxis type="number" allowDecimals={false} tick={{ fill: t.inkFaint, fontSize: 11 }} />
                      <YAxis dataKey="name" type="category" tick={{ fill: t.inkFaint, fontSize: 11 }} width={120} />
                      <Tooltip contentStyle={tooltip(t.bg, t.rule, t.ink)} cursor={{ fill: accentSoft }} />
                      <Bar dataKey="views" name="opens" fill={accent} radius={[0, 5, 5, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState title="No resume opens yet" text="Opens from the hero, sidebar, mobile bar, contact, footer and /resume link show up here." muted={t.inkMid} />}
              </ChartPanel>
              <RankPanel title="Opens by traffic source" rows={insights.resume.sources} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent={accentTwo} />
            </section>

            <section className="dash-main-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 0.7fr) minmax(0, 1.6fr)', gap: 14, alignItems: 'start' }}>
              <RankPanel title="Links clicked inside the resume" rows={insights.resume.links} rule={t.rule} bg={cardBg} ink={t.ink} muted={t.inkMid} accent="#6366F1" />
              <article style={{ ...panel(t.rule, cardBg, 20), minWidth: 0 }}>
                <h2 style={sectionTitle(t.ink)}><Activity size={17} />Recent Resume Activity</h2>
                <div style={{ display: 'grid', gap: 0 }}>
                  {insights.resume.recent.length ? insights.resume.recent.map((e, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, padding: '10px 0', borderBottom: `1px solid ${t.rule}` }}>
                      <div style={{ minWidth: 0, fontFamily: SANS }}>
                        <strong style={{ fontSize: 13, color: e.type === 'resume_appreciate' ? accentTwo : t.ink }}>
                          {eventLabels[e.type] || e.type}
                          {e.type === 'resume_view_time' && e.value ? ` for ${formatDuration(e.value)}` : ''}
                          {e.label && e.type !== 'resume_view_time' ? ` · ${placementLabels[e.label] || e.label}` : ''}
                        </strong>
                        <p style={{ fontSize: 12, color: t.inkMid, marginTop: 3, overflowWrap: 'anywhere' }}>
                          {flag(e.countryCode)} {[e.city, e.region, countryLabel(e.countryCode)].filter(Boolean).join(', ') || 'Unknown location'}{e.ip ? ` · ${e.ip}` : ''}
                        </p>
                      </div>
                      <span style={{ fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, whiteSpace: 'nowrap' }}>{dateTime(e.createdAt)}</span>
                    </div>
                  )) : <p style={{ fontFamily: SANS, fontSize: 13, color: t.inkMid }}>No resume activity yet.</p>}
                </div>
              </article>
            </section>
          </>
        )}

        {activeTab === 'campaign' && (
          <section className="campaign-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 0.9fr) minmax(0, 1.1fr)', gap: 14 }}>
            <article style={panel(t.rule, cardBg, 22)}>
              <h2 style={sectionTitle(t.ink)}><Link size={18} />Create UTM Link</h2>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle(t.inkMid)}>Quick presets</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {campaignPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setCampaign((current) => ({ ...current, path: preset.path, source: preset.source, medium: preset.medium, content: preset.content, campaign: preset.campaign }))}
                      style={rangeButton(false, accent, t.btnFg, t.inkMid, t.rule)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={labelStyle(t.inkMid)}>Destination</label>
                  <div className="utm-field-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 0.7fr) minmax(150px, 1fr)', gap: 10 }}>
                    <select
                      value={destinations.some((d) => d.value === campaign.path) ? campaign.path : '__custom'}
                      onChange={(event) => { if (event.target.value !== '__custom') updateCampaign('path', event.target.value); }}
                      style={{ ...inputStyle(t.inputBorder, t.ink), marginBottom: 0, colorScheme: dark ? 'dark' : 'light' }}
                    >
                      {destinations.map((d) => <option key={d.value} value={d.value} style={{ background: optionBg, color: t.ink }}>{d.label}</option>)}
                      <option value="__custom" style={{ background: optionBg, color: t.ink }}>Custom path…</option>
                    </select>
                    <input value={campaign.path} onChange={(event) => updateCampaign('path', event.target.value)} placeholder="/ or /#projects" style={{ ...inputStyle(t.inputBorder, t.ink), marginBottom: 0 }} />
                  </div>
                </div>
                {(['source', 'medium', 'content', 'campaign'] as UtmKey[]).map((key) => (
                  <UtmField key={key} name={key} value={campaign[key]} onChange={(value) => updateCampaign(key, value)} ink={t.ink} muted={t.inkMid} border={t.inputBorder} optionBg={optionBg} dark={dark} />
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
              <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkMid, lineHeight: 1.6, marginTop: 12 }}>
                Tip: point a link at <strong style={{ color: t.ink }}>/resume</strong> and the visitor lands straight in the resume viewer, while the UTM tags still record where they came from. Leave a field empty to drop it from the URL.
              </p>

              <div style={{ marginTop: 22 }}>
                <h3 style={{ ...chartTitle(t.ink), marginBottom: 10 }}>Top Campaign Combinations</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {(insights.recentCampaigns.length ? insights.recentCampaigns : [{ source: 'No campaign data yet', medium: '-', content: '-', views: 0, users: 0, lastSeen: '' }]).map((row) => (
                    <div key={`${row.source}-${row.medium}-${row.content}`} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, borderBottom: `1px solid ${t.rule}`, paddingBottom: 10 }}>
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ fontFamily: SANS, color: t.ink, fontSize: 13 }}>{row.source || '(none)'}</strong>
                        <p style={{ fontFamily: SANS, color: t.inkMid, fontSize: 12, marginTop: 4, overflowWrap: 'anywhere' }}>{row.medium || '-'} / {row.content || '-'}</p>
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

        {activeTab === 'alerts' && (
          <section className="campaign-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(0, 1fr)', gap: 14, alignItems: 'start' }}>
            <article style={panel(t.rule, cardBg, 22)}>
              <h2 style={sectionTitle(t.ink)}><Bell size={18} />Email Notifications</h2>
              {!alerts ? (
                <p style={{ fontFamily: SANS, fontSize: 13, color: t.inkMid }}>Loading settings...</p>
              ) : (
                <>
                  <SettingRow
                    title="Email me when someone visits"
                    text={`Sends IP, city, state, country, device, referrer and campaign to ${alerts.email.to} the moment a new session starts.`}
                    checked={alerts.settings.notifyOnVisit}
                    disabled={alertBusy}
                    onChange={(value) => updateAlerts({ notifyOnVisit: value })}
                    accent={accent} rule={t.rule} ink={t.ink} muted={t.inkMid} knob={t.bg}
                  />
                  <SettingRow
                    title="Also email a summary when they leave"
                    text="A second email with active view time, pages viewed and whether they opened, downloaded or starred your resume."
                    checked={alerts.settings.notifySummary}
                    disabled={alertBusy}
                    onChange={(value) => updateAlerts({ notifySummary: value })}
                    accent={accent} rule={t.rule} ink={t.ink} muted={t.inkMid} knob={t.bg}
                  />
                  <button onClick={() => updateAlerts({ action: 'test' })} disabled={alertBusy || !alerts.email.configured} style={{ ...actionButton(t.btnBg, t.btnFg), marginTop: 18, opacity: alertBusy || !alerts.email.configured ? 0.5 : 1 }}>
                    <Send size={15} />{alertBusy ? 'Working...' : 'Send test email'}
                  </button>
                  {alertMessage && <p style={{ fontFamily: SANS, fontSize: 12.5, color: alertMessage.startsWith('Test email sent') ? t.green : '#EF4444', marginTop: 12 }}>{alertMessage}</p>}
                </>
              )}
            </article>

            <article style={panel(t.rule, cardBg, 22)}>
              <h2 style={sectionTitle(t.ink)}><Send size={18} />Delivery</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: alerts?.email.configured ? t.green : '#EF4444' }} />
                <strong style={{ fontFamily: SANS, fontSize: 13, color: t.ink }}>{alerts?.email.configured ? 'Email provider connected' : 'Email provider not configured'}</strong>
              </div>
              <ul style={{ fontFamily: SANS, fontSize: 12.5, color: t.inkMid, lineHeight: 1.75, paddingLeft: 18, listStyle: 'disc' }}>
                <li>Recipient: <strong style={{ color: t.ink }}>{alerts?.email.to || '-'}</strong> (change with <code>NOTIFY_EMAIL_TO</code>).</li>
                <li>Emails are sent through Resend. Set <code>RESEND_API_KEY</code> in Vercel → Project → Settings → Environment Variables.</li>
                <li>With the default sender (<code>onboarding@resend.dev</code>), Resend only delivers to the email you signed up with, so sign up using the recipient address, or verify a domain and set <code>NOTIFY_EMAIL_FROM</code>.</li>
                <li>Your own visits are skipped while you're logged in to this dashboard in the same browser. Bots are skipped too, and alerts are capped at 40 an hour.</li>
                <li>Active time counts only while the tab is visible and the visitor interacted in the last minute.</li>
              </ul>
            </article>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dash-main-grid, .dash-chart-grid, .dash-rank-grid, .campaign-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 981px) and (max-width: 1180px) {
          .dash-rank-grid { grid-template-columns: 1fr 1fr !important; }
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
      <h2 style={{ ...chartTitle(ink), marginBottom: 14 }}>{title}</h2>
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

const UtmField = ({ name, value, onChange, ink, muted, border, optionBg, dark }: { name: UtmKey; value: string; onChange: (value: string) => void; ink: string; muted: string; border: string; optionBg: string; dark: boolean }) => {
  const known = utmOptions[name].some((option) => option.value === value);
  const selectValue = !value ? '__none' : known ? value : '__custom';
  const optionStyle = { background: optionBg, color: ink };
  return (
    <div>
      <label style={labelStyle(muted)}>utm_{name}{name === 'campaign' && <span style={{ fontWeight: 500 }}> (optional)</span>}</label>
      <div className="utm-field-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 0.7fr) minmax(150px, 1fr)', gap: 10 }}>
        <select
          value={selectValue}
          onChange={(event) => {
            const next = event.target.value;
            if (next === '__none') onChange('');
            else if (next !== '__custom') onChange(next);
          }}
          style={{ ...inputStyle(border, ink), marginBottom: 0, colorScheme: dark ? 'dark' : 'light' }}
        >
          <option value="__none" style={optionStyle}>None</option>
          {utmOptions[name].map((option) => <option key={option.value} value={option.value} style={optionStyle}>{option.label}</option>)}
          <option value="__custom" style={optionStyle}>Custom…</option>
        </select>
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={`custom-${name}`} style={{ ...inputStyle(border, ink), marginBottom: 0 }} />
      </div>
    </div>
  );
};

const Toggle = ({ checked, onChange, disabled, accent, rule, knob }: { checked: boolean; onChange: (value: boolean) => void; disabled?: boolean; accent: string; rule: string; knob: string }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    style={{
      position: 'relative', width: 36, height: 20, flexShrink: 0,
      borderRadius: 999, border: 'none',
      background: checked ? accent : rule,
      cursor: disabled ? 'wait' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'background 0.2s',
    }}
  >
    <span style={{ position: 'absolute', top: 3, left: checked ? 19 : 3, width: 14, height: 14, borderRadius: '50%', background: knob, transition: 'left 0.2s' }} />
  </button>
);

const SettingRow = ({ title, text, checked, onChange, disabled, accent, rule, ink, muted, knob }: { title: string; text: string; checked: boolean; onChange: (value: boolean) => void; disabled?: boolean; accent: string; rule: string; ink: string; muted: string; knob: string }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderBottom: `1px solid ${rule}` }}>
    <div>
      <p style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 800, color: ink, marginBottom: 4 }}>{title}</p>
      <p style={{ fontFamily: SANS, fontSize: 12, color: muted, lineHeight: 1.55 }}>{text}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} disabled={disabled} accent={accent} rule={rule} knob={knob} />
  </div>
);

const centerPage = (background: string, color: string): React.CSSProperties => ({ minHeight: '100vh', display: 'grid', placeItems: 'center', background, color });
const panel = (border: string, background: string, padding: number): React.CSSProperties => ({ border: `1px solid ${border}`, background, borderRadius: 8, padding });
const eyebrow = (color: string): React.CSSProperties => ({ fontFamily: SANS, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 8 });
const labelStyle = (color: string): React.CSSProperties => ({ display: 'block', fontFamily: SANS, fontSize: 12, fontWeight: 800, color, marginBottom: 8 });
const inputStyle = (border: string, color: string): React.CSSProperties => ({ width: '100%', border: `1px solid ${border}`, background: 'transparent', color, borderRadius: 6, padding: '11px 12px', outline: 'none', fontFamily: SANS, fontSize: 13, marginBottom: 14 });
const actionButton = (bg: string, color: string): React.CSSProperties => ({ width: '100%', border: 'none', borderRadius: 6, background: bg, color, fontFamily: SANS, fontWeight: 800, padding: '12px 16px', cursor: 'pointer', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8 });
const smallButton = (bg: string, color: string, border?: string): React.CSSProperties => ({ border: border ? `1px solid ${border}` : 'none', borderRadius: 6, background: bg, color, fontFamily: SANS, fontSize: 12, fontWeight: 800, padding: '10px 13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 });
const tabButton = (active: boolean, bg: string, activeColor: string, inactiveColor: string): React.CSSProperties => ({ border: 'none', borderRadius: 6, background: active ? bg : 'transparent', color: active ? activeColor : inactiveColor, fontFamily: SANS, fontSize: 13, fontWeight: 800, padding: '10px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' });
const rangeButton = (active: boolean, bg: string, activeColor: string, inactiveColor: string, border: string): React.CSSProperties => ({ border: '1px solid ' + (active ? bg : border), borderRadius: 6, background: active ? bg : 'transparent', color: active ? activeColor : inactiveColor, fontFamily: SANS, fontSize: 11, fontWeight: 800, padding: '7px 9px', cursor: 'pointer' });
const sectionTitle = (color: string): React.CSSProperties => ({ fontFamily: SANS, fontSize: 15, fontWeight: 900, color, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 });
const chartTitle = (color: string): React.CSSProperties => ({ fontFamily: SANS, fontSize: 15, fontWeight: 900, color });
const tooltip = (background: string, border: string, color: string): React.CSSProperties => ({ background, border: '1px solid ' + border, color, fontFamily: SANS, borderRadius: 8 });
const cell = (border: string, color: string): React.CSSProperties => ({ padding: '10px', borderBottom: `1px solid ${border}`, color, whiteSpace: 'nowrap', verticalAlign: 'middle' });
const pill = (background: string, color: string): React.CSSProperties => ({ display: 'inline-block', background, color, fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', padding: '2px 7px', borderRadius: 999 });

const EmptyState = ({ title, text, muted }: { title: string; text: string; muted: string }) => (
  <div style={{ height: '100%', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 18 }}>
    <div>
      <p style={{ fontFamily: SANS, fontWeight: 900, fontSize: 14, marginBottom: 6 }}>{title}</p>
      <p style={{ fontFamily: SANS, color: muted, fontSize: 12, lineHeight: 1.5 }}>{text}</p>
    </div>
  </div>
);

export default Dashboard;
