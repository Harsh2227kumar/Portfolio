import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

/* ─── DATA ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Skills', href: '#skills' },
  { label: 'Badges & Certs', href: '#badges-certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Volunteer', href: '#volunteer' },
  { label: 'Contact', href: '#contact' },
];

const EXT_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harsh-2227-kumar/', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/harsh2227kumar', Icon: Github },
  { label: 'Email', href: 'mailto:harsh2227official@gmail.com', Icon: Mail },
];

/* ─── SVG ICONS ─────────────────────────────────────── */
const MenuIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─── SIDEBAR WIDTH (exported for layout) ──────────── */
export const SIDEBAR_W = 280;

/* ─── COMPONENT ─────────────────────────────────────── */
const Navigation = () => {
  const { dark, toggle, t } = useTheme();
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  /* staggered entrance */
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(id);
  }, []);

  /* active section tracker */
  useEffect(() => {
    const onScroll = () => {
      let cur = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 130) cur = item.href.slice(1);
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  /* ── color tokens for sidebar background (slightly offset from main bg) ── */
  const sideBg = dark ? '#0C0C0B' : '#EFEFEC';
  const border = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  const S = "'Instrument Sans', system-ui, sans-serif";
  const iconButtonStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: `1px solid ${border}`,
    background: 'transparent',
    color: t.inkMid,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, color 0.2s, border-color 0.3s',
  };

  /* ── reusable sidebar body ── */
  const Body = () => (
    <div style={{
      height: '100%',
      display: 'flex', flexDirection: 'column',
      padding: '40px 32px 36px',
      overflowY: 'auto',
    }}>

      {/* ── GIANT STACKED NAME ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, textAlign: 'left', marginBottom: 12,
          opacity: entered ? 1 : 0,
          transform: entered ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{
          fontFamily: "'Bebas Neue', 'Arial Black', Impact, sans-serif",
          fontSize: 'clamp(53px, 5.5vw, 67px)',
          lineHeight: 0.9,
          letterSpacing: '0.01em',
          color: t.ink,
          textTransform: 'uppercase',
          transition: 'color 0.3s',
          userSelect: 'none',
        }}>
          HARSH<br />KUMAR
        </div>
      </button>

      {/* ── role line ── */}
      <p style={{
        fontFamily: S,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: t.inkFaint,
        lineHeight: 1.5,
        marginBottom: 22,
        opacity: entered ? 1 : 0,
        transition: 'opacity 0.55s ease 60ms, color 0.3s',
      }}>
        Full Stack Developer<br />
        <span style={{ color: t.inkMid, transition: 'color 0.3s' }}>in Nagpur 🇮🇳</span>
      </p>

      {/* ── availability badge ── */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        width: 'fit-content',
        padding: '5px 11px 5px 9px',
        borderRadius: 999,
        border: `1px solid ${dark ? 'rgba(34,197,94,0.28)' : 'rgba(22,163,74,0.22)'}`,
        background: dark ? 'rgba(34,197,94,0.07)' : 'rgba(22,163,74,0.07)',
        marginBottom: 36,
        opacity: entered ? 1 : 0,
        transition: 'opacity 0.55s ease 120ms',
      }}>
        {/* animated ping */}
        <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: t.green,
            animation: 'pulse-ring 1.6s cubic-bezier(0,0,0.2,1) infinite',
          }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: t.green }} />
        </span>
        <span style={{
          fontFamily: S, fontSize: 9.5, fontWeight: 700,
          letterSpacing: '0.02em', color: t.green,
        }}>
          Available for opportunities
        </span>
        <style>{`@keyframes pulse-ring {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }`}</style>
      </div>

      {/* ── primary nav ── */}
      <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === item.href.slice(1);
          return (
            <button
              key={item.label}
              onClick={() => go(item.href)}
              style={{
                fontFamily: S,
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? t.ink : t.inkMid,
                background: 'none', border: 'none',
                cursor: 'pointer', padding: '11px 0',
                textAlign: 'left',
                borderBottom: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'color 0.15s',
                opacity: entered ? 1 : 0,
                /* stagger each link */
                transitionDelay: isActive ? '0ms' : `${i * 35 + 160}ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = t.ink)}
              onMouseLeave={e => (e.currentTarget.style.color = isActive ? t.ink : t.inkMid)}
            >
              {item.label}
              {isActive && (
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.ink, flexShrink: 0 }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── social links + theme ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 28,
        opacity: entered ? 1 : 0,
        transition: 'opacity 0.45s ease 460ms',
      }}>
        {EXT_LINKS.map(({ Icon, ...link }) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={link.label}
            title={link.label}
            style={iconButtonStyle}
            onMouseEnter={e => {
              e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
              e.currentTarget.style.color = t.ink;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = t.inkMid;
            }}
          >
            <Icon size={15} strokeWidth={2} />
          </a>
        ))}
        <button
          onClick={toggle}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={dark ? 'Switch to light' : 'Switch to dark'}
          style={iconButtonStyle}
          onMouseEnter={e => {
            e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
            e.currentTarget.style.color = t.ink;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = t.inkMid;
          }}
        >
          {dark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ══ DESKTOP SIDEBAR ══════════════════════════════ */}
      <aside
        id="hk-sidebar"
        style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          width: SIDEBAR_W,
          background: sideBg,
          borderRight: `1px solid ${border}`,
          zIndex: 50,
          display: 'flex', flexDirection: 'column',
          transition: 'background 0.3s, border-color 0.3s',
        }}
        className="sidebar-desk"
      >
        <Body />
      </aside>

      {/* ══ MOBILE TOP BAR ═══════════════════════════════ */}
      <header
        className="mobile-bar"
        style={{
          display: 'none',
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
          background: sideBg,
          borderBottom: `1px solid ${border}`,
          padding: '0 20px',
          height: 52,
          alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.3s',
        }}
      >
        <span style={{
          fontFamily: "'Bebas Neue', 'Arial Black', Impact, sans-serif",
          fontSize: 21, letterSpacing: '0.02em', color: t.ink, transition: 'color 0.3s',
        }}>
          HARSH KUMAR
        </span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.inkMid, display: 'flex', alignItems: 'center', padding: 6 }}>
            {dark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>
          <button onClick={() => setMobileOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.ink, display: 'flex', alignItems: 'center', padding: 6 }}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* ══ MOBILE DRAWER ════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="mobile-bar"
          style={{
            display: 'flex',
            position: 'fixed', top: 52, left: 0, right: 0, bottom: 0,
            background: sideBg, zIndex: 55,
            overflowY: 'auto',
          }}
        >
          <div style={{ width: '100%' }}>
            <Body />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .sidebar-desk { display: none !important; }
          .mobile-bar   { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navigation;
