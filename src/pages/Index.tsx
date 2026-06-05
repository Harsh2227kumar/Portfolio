import React, { useState, useEffect } from 'react';
import { useTheme } from '@/Context/ThemeContext';
import { SIDEBAR_W } from '@/components/Navigation';
import Preloader  from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Experience from '@/components/Experience';
import Projects   from '@/components/Projects';
import Hackathons  from '@/components/Hackathons';
import Skills     from '@/components/Skills';
import BadgesCertifications from '@/components/BadgesCertifications';
import Education  from '@/components/Education';
import Contact    from '@/components/Contact';

const Index = () => {
  const { t } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* inject Bebas Neue for the sidebar name */
    if (!document.getElementById('font-bebas')) {
      const link   = document.createElement('link');
      link.id      = 'font-bebas';
      link.rel     = 'stylesheet';
      link.href    = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
      document.head.appendChild(link);
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  const S = "'Instrument Sans', system-ui, sans-serif";

  return (
    <>
      {/* ── Fixed sidebar ───────────────────────────── */}
      <Navigation />

      {/* ── Scrollable right pane ────────────────────── */}
      <div
        id="right-pane"
        style={{
          marginLeft: SIDEBAR_W,
          background: t.bg,
          minHeight: '100vh',
          transition: 'background 0.3s, margin-left 0.3s',
        }}
      >
        {/* Hero — full viewport height */}
        <Hero />

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />

        {/* Content sections */}
        <main>
          <About />
          <Experience />
          <Projects />
          <Hackathons />
          <Skills />
          <BadgesCertifications />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${t.rule}`,
          padding: '24px clamp(36px,6vw,80px)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
          transition: 'border-color 0.3s',
        }}>
          <span style={{ fontFamily: S, fontSize: 12, color: t.inkFaint, transition: 'color 0.3s' }}>
            © {new Date().getFullYear()} Harsh Kumar
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'GitHub',   href: 'https://github.com/harsh2227kumar' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harsh-2227-kumar/' },
              { label: 'Email',    href: 'mailto:harsh2227official@gmail.com' },
            ].map(l => (
              <a
                key={l.label} href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ fontFamily: S, fontSize: 12, color: t.inkFaint, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = t.ink)}
                onMouseLeave={e => (e.currentTarget.style.color = t.inkFaint)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </div>

      {/* Mobile: remove sidebar offset, add topbar padding */}
      <style>{`
        @media (max-width: 860px) {
          #right-pane {
            margin-left: 0 !important;
            padding-top: 52px;
          }
        }
      `}</style>
    </>
  );
};

export default Index;
