import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

/* Sun icon */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

/* Moon icon */
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Navigation = () => {
  const { dark, toggle, t } = useTheme();
  const [active, setActive]   = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map((n) => n.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled
        ? (dark ? 'rgba(17,17,16,0.92)' : 'rgba(255,255,255,0.92)')
        : t.bg,
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? t.rule : 'transparent'}`,
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 clamp(20px,5vw,60px)',
        height: 54,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 17, letterSpacing: '-0.01em',
            color: t.ink, background: 'none', border: 'none',
            cursor: 'pointer', padding: 0, flexShrink: 0,
            transition: 'color 0.3s',
          }}
        >
          Harsh Kumar
        </button>

        {/* Nav links — hidden below md */}
        <ul className="hidden md:flex" style={{ display: 'flex', gap: 24, listStyle: 'none', flex: 1, justifyContent: 'center' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.label}>
                <button
                  onClick={() => scrollTo(item.href)}
                  style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    fontSize: 13.5,
                    color: isActive ? t.ink : t.inkFaint,
                    fontWeight: isActive ? 600 : 400,
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right: theme toggle + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="theme-toggle"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* CTA */}
          <a
            href="mailto:harsh2227official@gmail.com"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 13, fontWeight: 600,
              background: t.btnBg, color: t.btnFg,
              padding: '8px 18px', borderRadius: 999,
              transition: 'background 0.3s, color 0.3s, opacity 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;