import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const MARQUEE_ITEMS = [
  'Docker', 'Terraform', 'Jenkins CI/CD', 'Kubernetes', 'Google Cloud',
  'DigitalOcean', 'React.js', 'Flask', 'Python', 'Linux',
  'Bash Scripting', 'PostgreSQL', 'REST APIs', 'Infrastructure as Code',
  'Node.js', 'Git', 'NGINX', 'SQLite',
];

const Hero = () => {
  const { t } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                 transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      {/* ── HERO ── */}
      <section
        id="home"
        style={{
          maxWidth: 1100, margin: '0 auto',
          padding: 'clamp(64px,10vw,128px) clamp(20px,5vw,60px) clamp(48px,7vw,96px)',
        }}
      >
        {/* Availability badge */}
        <div style={{
          ...fade(0),
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 13, color: t.inkMid, marginBottom: 32,
        }}>
          <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: t.green,
              animation: 'pulse-ring 1.6s cubic-bezier(0,0,0.2,1) infinite',
            }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: t.green }} />
          </span>
          Open to internships &amp; opportunities
          <style>{`
            @keyframes pulse-ring {
              0%   { transform:scale(1);   opacity:.9; }
              75%  { transform:scale(2.6); opacity:0;  }
              100% { transform:scale(2.6); opacity:0;  }
            }
          `}</style>
        </div>

        {/* Name */}
        <h1 style={{
          ...fade(40),
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(56px,10vw,108px)',
          lineHeight: 1.0, letterSpacing: '-0.028em',
          color: t.ink, marginBottom: 24,
          transition: 'color 0.3s',
        }}>
          Harsh<br />
          <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>Kumar</em>
        </h1>

        {/* Tagline */}
        <p style={{
          ...fade(100),
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 'clamp(15px,1.5vw,18px)',
          color: t.inkMid, lineHeight: 1.7,
          maxWidth: 560, marginBottom: 40,
          transition: 'color 0.3s',
        }}>
          DevOps Engineer &amp; Full-Stack Developer in Nagpur&nbsp;🇮🇳<br />
          B.Tech CS at Symbiosis Institute of Technology. Building containerised
          systems, CI/CD pipelines, and modern web experiences — with internship
          experience at Elevate Labs.
        </p>

        {/* CTAs */}
        <div style={{ ...fade(160), display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {/* Primary */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 13.5, fontWeight: 600,
              background: t.btnBg, color: t.btnFg,
              padding: '11px 24px', borderRadius: 999,
              transition: 'background 0.3s, color 0.3s, opacity 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Work with me
          </a>

          {/* Ghost btns */}
          {[
            { label: 'GitHub ↗',   href: 'https://github.com/harsh2227kumar' },
            { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/harsh-2227-kumar/' },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 13.5, fontWeight: 500,
                color: t.outlineFg,
                border: `1px solid ${t.outlineBorder}`,
                padding: '11px 24px', borderRadius: 999,
                transition: 'color 0.2s, border-color 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.ink;
                e.currentTarget.style.borderColor = t.inkMid;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.outlineFg;
                e.currentTarget.style.borderColor = t.outlineBorder;
              }}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{
        overflow: 'hidden',
        borderTop: `1px solid ${t.rule}`,
        borderBottom: `1px solid ${t.rule}`,
        padding: '13px 0',
        transition: 'border-color 0.3s',
      }}>
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} style={{
              whiteSpace: 'nowrap',
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 11.5, fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: t.marqueeItem, padding: '0 24px',
              transition: 'color 0.3s',
            }}>
              {item}
              <span style={{ marginLeft: 24, color: t.marqueeDot }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;