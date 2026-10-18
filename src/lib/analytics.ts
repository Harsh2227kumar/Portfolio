const VISITOR_KEY = 'hk_analytics_visitor_id';
const SESSION_KEY = 'hk_analytics_session_id';

const makeId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '');
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
};

const getStoredId = (storage: Storage, key: string) => {
  const existing = storage.getItem(key);
  if (existing) return existing;

  const id = makeId();
  storage.setItem(key, id);
  return id;
};

export const getAnalyticsIds = () => {
  if (typeof window === 'undefined') return null;
  try {
    return {
      visitorId: getStoredId(window.localStorage, VISITOR_KEY),
      sessionId: getStoredId(window.sessionStorage, SESSION_KEY),
    };
  } catch {
    return null;
  }
};

const isPrivatePage = () => typeof window !== 'undefined' && window.location.pathname.startsWith('/dash');

export const sendAnalytics = (payload: Record<string, unknown>) => {
  if (isPrivatePage()) return;
  const ids = getAnalyticsIds();
  if (!ids) return;

  const body = JSON.stringify({ ...ids, ...payload });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    if (navigator.sendBeacon('/api/track', blob)) return;
  }

  fetch('/api/track', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
};

export const trackEvent = (event: string, label?: string | null, value?: number) =>
  sendAnalytics({ type: 'event', event, label: label ?? null, value });

/* ─── active time ───────────────────────────────────────
   A second only counts when the tab is visible, the window
   is focused and the visitor interacted within the last
   minute — so an idle background tab adds nothing.
──────────────────────────────────────────────────────── */
const IDLE_AFTER_MS = 60_000;
const FLUSH_EVERY_MS = 15_000;

export const startActiveTimeTracking = () => {
  let lastInteraction = Date.now();
  let pending = 0;
  let lastFlush = Date.now();

  const isActive = () =>
    document.visibilityState === 'visible' &&
    document.hasFocus() &&
    Date.now() - lastInteraction < IDLE_AFTER_MS;

  const flush = (final = false) => {
    const seconds = Math.round(pending);
    if (seconds <= 0 && !final) return;
    pending -= seconds;
    lastFlush = Date.now();
    sendAnalytics({ type: 'heartbeat', seconds, final });
  };

  const mark = () => { lastInteraction = Date.now(); };
  const activity = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'] as const;
  activity.forEach((name) => window.addEventListener(name, mark, { passive: true, capture: true }));

  const tick = window.setInterval(() => {
    if (isActive()) pending += 1;
    if (Date.now() - lastFlush >= FLUSH_EVERY_MS) flush();
  }, 1000);

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') flush();
    else mark();
  };
  const onPageHide = () => flush(true);

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);

  return () => {
    flush();
    window.clearInterval(tick);
    activity.forEach((name) => window.removeEventListener(name, mark, { capture: true }));
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onPageHide);
  };
};
