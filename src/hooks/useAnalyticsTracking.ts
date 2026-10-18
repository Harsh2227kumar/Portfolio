import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendAnalytics, startActiveTimeTracking } from '@/lib/analytics';

export const useAnalyticsTracking = () => {
  const location = useLocation();
  const isPrivate = location.pathname.startsWith('/dash');

  useEffect(() => {
    if (isPrivate) return;

    sendAnalytics({
      type: 'pageview',
      path: `${location.pathname}${location.search}`,
      referrer: document.referrer || null,
    });
  }, [isPrivate, location.pathname, location.search]);

  useEffect(() => {
    if (isPrivate) return;
    return startActiveTimeTracking();
  }, [isPrivate]);
};
