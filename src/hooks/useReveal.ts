import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    el.querySelectorAll('.reveal').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}