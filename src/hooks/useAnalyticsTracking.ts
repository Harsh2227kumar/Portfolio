import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

export const useAnalyticsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/dash')) return;
    if (typeof window === 'undefined') return;

    let visitorId: string;
    let sessionId: string;

    try {
      visitorId = getStoredId(window.localStorage, VISITOR_KEY);
      sessionId = getStoredId(window.sessionStorage, SESSION_KEY);
    } catch {
      return;
    }

    const payload = {
      visitorId,
      sessionId,
      path: `${location.pathname}${location.search}`,
      referrer: document.referrer || null,
    };

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
      return;
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname, location.search]);
};
