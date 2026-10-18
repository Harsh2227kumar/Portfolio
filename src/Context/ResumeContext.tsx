import React, { createContext, lazy, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { getAnalyticsIds, trackEvent } from '@/lib/analytics';

/* Served from public/Resume.pdf */
export const RESUME_URL = '/Resume.pdf';
export const RESUME_FILENAME = 'Harsh_Kumar_Resume.pdf';

/* Every place the resume can be opened from — reported as the
   `label` of resume_open events so the dashboard can rank them. */
export type ResumeSource =
  | 'hero'
  | 'sidebar'
  | 'mobile-topbar'
  | 'contact'
  | 'footer'
  | 'direct-link';

const ResumeViewer = lazy(() => import('@/components/ResumeViewer'));

interface ResumeCtx {
  open: (source: ResumeSource) => void;
  count: number | null;
  appreciated: boolean;
  toggleAppreciation: () => void;
}

const ResumeContext = createContext<ResumeCtx>({
  open: () => window.open(RESUME_URL, '_blank', 'noopener'),
  count: null,
  appreciated: false,
  toggleAppreciation: () => undefined,
});

export const useResume = () => useContext(ResumeContext);

const wantsResumeFromUrl = () => {
  const { pathname, search } = window.location;
  const flag = new URLSearchParams(search).get('resume');
  return pathname.replace(/\/+$/, '') === '/resume' || (flag !== null && flag !== '0' && flag !== 'false');
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [source, setSource] = useState<ResumeSource | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [appreciated, setAppreciated] = useState(false);

  useEffect(() => {
    const ids = getAnalyticsIds();
    const query = ids ? `?visitorId=${encodeURIComponent(ids.visitorId)}` : '';
    fetch(`/api/resume${query}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setCount(Number(data.count || 0));
        setAppreciated(Boolean(data.appreciated));
      })
      .catch(() => {});
  }, []);

  const open = useCallback((from: ResumeSource) => {
    trackEvent('resume_open', from);
    setSource(from);
  }, []);

  useEffect(() => {
    if (wantsResumeFromUrl()) open('direct-link');
  }, [open]);

  const close = useCallback(() => {
    setSource(null);
    // Drop the /resume path or ?resume flag so a refresh doesn't reopen it.
    if (wantsResumeFromUrl()) {
      const url = new URL(window.location.href);
      url.searchParams.delete('resume');
      if (url.pathname.replace(/\/+$/, '') === '/resume') url.pathname = '/';
      window.history.replaceState(window.history.state, '', url.toString());
    }
  }, []);

  const toggleAppreciation = useCallback(() => {
    const ids = getAnalyticsIds();
    if (!ids) return;
    const next = !appreciated;
    setAppreciated(next);
    setCount((c) => Math.max(0, (c ?? 0) + (next ? 1 : -1)));

    fetch('/api/resume', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...ids, appreciated: next }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setCount(Number(data.count || 0));
        setAppreciated(Boolean(data.appreciated));
      })
      .catch(() => {
        setAppreciated(!next);
        setCount((c) => Math.max(0, (c ?? 0) + (next ? -1 : 1)));
      });
  }, [appreciated]);

  return (
    <ResumeContext.Provider value={{ open, count, appreciated, toggleAppreciation }}>
      {children}
      {source && (
        <Suspense fallback={null}>
          <ResumeViewer source={source} onClose={close} />
        </Suspense>
      )}
    </ResumeContext.Provider>
  );
};
