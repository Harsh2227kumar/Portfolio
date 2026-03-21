import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ─── DATA ─────────────────────────────────────────────── */
interface Skill  { name: string; level: number; emoji: string; }
interface Category {
  id: string; label: string;
  accent: string; accentDark: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: 'devops', label: 'DevOps & Cloud',
    accent: 'hsl(22,88%,56%)', accentDark: 'hsl(22,90%,64%)',
    skills: [
      { name: 'Docker',       level: 5, emoji: '🐳' },
      { name: 'Terraform',    level: 4, emoji: '🏗️' },
      { name: 'Jenkins',      level: 4, emoji: '🔧' },
      { name: 'Kubernetes',   level: 3, emoji: '☸️' },
      { name: 'GCP',          level: 4, emoji: '☁️' },
      { name: 'DigitalOcean', level: 4, emoji: '🌊' },
      { name: 'NGINX',        level: 3, emoji: '⚡' },
    ],
  },
  {
    id: 'web', label: 'Web Development',
    accent: 'hsl(196,80%,46%)', accentDark: 'hsl(196,85%,56%)',
    skills: [
      { name: 'React.js',   level: 5, emoji: '⚛️' },
      { name: 'JavaScript', level: 5, emoji: '✨' },
      { name: 'HTML / CSS', level: 5, emoji: '🎨' },
      { name: 'Tailwind',   level: 5, emoji: '🌬️' },
      { name: 'Flask',      level: 4, emoji: '🫙' },
      { name: 'Node.js',    level: 3, emoji: '🟢' },
    ],
  },
  {
    id: 'lang', label: 'Languages',
    accent: 'hsl(152,62%,40%)', accentDark: 'hsl(152,65%,50%)',
    skills: [
      { name: 'Python', level: 5, emoji: '🐍' },
      { name: 'Java',   level: 4, emoji: '☕' },
      { name: 'SQL',    level: 4, emoji: '🗄️' },
      { name: 'Bash',   level: 4, emoji: '💻' },
      { name: 'C',      level: 4, emoji: '⚙️' },
    ],
  },
  {
    id: 'db', label: 'Data & Systems',
    accent: 'hsl(270,68%,60%)', accentDark: 'hsl(270,72%,68%)',
    skills: [
      { name: 'MySQL',      level: 5, emoji: '🐬' },
      { name: 'PostgreSQL', level: 4, emoji: '🐘' },
      { name: 'MongoDB',    level: 3, emoji: '🍃' },
      { name: 'REST APIs',  level: 5, emoji: '🔌' },
      { name: 'Linux',      level: 4, emoji: '🐧' },
      { name: 'Git',        level: 5, emoji: '🌿' },
    ],
  },
];

/* ─── PILL ──────────────────────────────────────────────── */
const Pill: React.FC<{
  skill: Skill; accent: string; ink: string;
  rule: string; dark: boolean;
  animDelay: number; visible: boolean;
}> = ({ skill, accent, ink, rule, dark, animDelay, visible }) => {
  const [hov, setHov] = useState(false);
  const [pop, setPop] = useState(false);

  const onClick = () => {
    setPop(true);
    setTimeout(() => setPop(false), 500);
  };

  const dotFilled = hov ? 'rgba(255,255,255,0.95)' : accent;
  const dotEmpty  = hov
    ? 'rgba(255,255,255,0.2)'
    : dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: 'inline-flex', flexDirection: 'column', gap: 7,
        padding: '10px 13px 9px',
        borderRadius: 14,
        border: `1px solid ${hov ? accent : rule}`,
        background: hov ? accent : dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)',
        cursor: 'pointer',
        outline: 'none',
        /* entrance */
        opacity: visible ? 1 : 0,
        transform: visible
          ? pop   ? 'scale(0.91)'
          : hov   ? 'translateY(-4px) scale(1.05)'
                  : 'translateY(0) scale(1)'
          : 'translateY(14px) scale(0.94)',
        transition: `
          opacity   0.52s cubic-bezier(0.16,1,0.3,1) ${animDelay}ms,
          transform 0.52s cubic-bezier(0.16,1,0.3,1) ${animDelay}ms,
          background   0.2s ease,
          border-color 0.2s ease,
          box-shadow   0.2s ease
        `,
        boxShadow: hov ? `0 6px 22px ${accent}50, 0 2px 6px ${accent}30` : 'none',
        willChange: 'transform, opacity',
      }}
    >
      {/* emoji + name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          fontSize: 14, lineHeight: 1,
          display: 'inline-block',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hov ? 'scale(1.3) rotate(-8deg)' : 'scale(1) rotate(0deg)',
        }}>
          {skill.emoji}
        </span>
        <span style={{
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 12.5, fontWeight: 600,
          letterSpacing: '-0.01em',
          color: hov ? '#fff' : ink,
          transition: 'color 0.2s',
          whiteSpace: 'nowrap',
        }}>
          {skill.name}
        </span>
      </div>

      {/* 5 level dots */}
      <div style={{ display: 'flex', gap: 3, paddingLeft: 1 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{
            display: 'block', width: 4, height: 4, borderRadius: '50%',
            background: i < skill.level ? dotFilled : dotEmpty,
            transition: `background 0.18s ease ${i * 28}ms`,
          }} />
        ))}
      </div>
    </button>
  );
};

/* ─── CLUSTER ───────────────────────────────────────────── */
const Cluster: React.FC<{
  cat: Category; accent: string;
  ink: string; inkFaint: string; rule: string;
  dark: boolean; visible: boolean; delay: number;
}> = ({ cat, accent, ink, inkFaint, rule, dark, visible, delay }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    {/* label row */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(8px)',
      transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
        background: accent,
        boxShadow: `0 0 10px ${accent}90`,
      }} />
      <span style={{
        fontFamily: "'Instrument Sans', system-ui, sans-serif",
        fontSize: 10.5, fontWeight: 600,
        letterSpacing: '0.11em', textTransform: 'uppercase',
        color: inkFaint, transition: 'color 0.3s',
      }}>
        {cat.label}
      </span>
    </div>

    {/* pill wrap */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {cat.skills.map((sk, si) => (
        <Pill
          key={sk.name}
          skill={sk}
          accent={accent}
          ink={ink}
          rule={rule}
          dark={dark}
          animDelay={delay + si * 48}
          visible={visible}
        />
      ))}
    </div>
  </div>
);

/* ─── MAIN ──────────────────────────────────────────────── */
const Skills: React.FC = () => {
  const { t, dark } = useTheme();
  const sectionRef  = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";
  const total = CATEGORIES.reduce((s, c) => s + c.skills.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,60px)',
      }}
    >

      {/* ── header ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
        marginBottom: 14,
      }}>
        {/* left: label + heading */}
        <div>
          <p style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.inkFaint, marginBottom: 10,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease, color 0.3s',
          }}>
            Skills
          </p>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(28px,4vw,44px)',
            letterSpacing: '-0.024em', lineHeight: 1.1,
            color: t.ink,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(12px)',
            transition: 'opacity 0.52s cubic-bezier(0.16,1,0.3,1) 50ms, transform 0.52s cubic-bezier(0.16,1,0.3,1) 50ms, color 0.3s',
          }}>
            Things I{' '}
            <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>work with</em>
          </h2>
        </div>

        {/* right: count pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          padding: '9px 17px', borderRadius: 999,
          border: `1px solid ${t.rule}`,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(8px)',
          transition: 'opacity 0.45s ease 120ms, transform 0.45s ease 120ms, border-color 0.3s',
        }}>
          <span style={{ fontFamily: SERIF, fontSize: 21, letterSpacing: '-0.02em', color: t.ink, transition: 'color 0.3s' }}>
            {total}
          </span>
          <span style={{ fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, transition: 'color 0.3s' }}>
            technologies
          </span>
        </div>
      </div>

      {/* ── hint ── */}
      <p style={{
        fontFamily: SANS, fontSize: 12.5, color: t.inkFaint,
        marginBottom: 44,
        display: 'flex', alignItems: 'center', gap: 6,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease 180ms, color 0.3s',
      }}>
        <span style={{ fontSize: 15 }}>👆</span>
        Hover a skill — dots show proficiency, glow shows excitement
      </p>

      {/* ── category clusters ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
        gap: 'clamp(32px,5vw,52px)',
      }}>
        {CATEGORIES.map((cat, ci) => (
          <Cluster
            key={cat.id}
            cat={cat}
            accent={dark ? cat.accentDark : cat.accent}
            ink={t.ink}
            inkFaint={t.inkFaint}
            rule={t.rule}
            dark={dark}
            visible={visible}
            delay={ci * 90}
          />
        ))}
      </div>

      {/* ── legend ── */}
      <div style={{
        marginTop: 52,
        paddingTop: 28,
        borderTop: `1px solid ${t.rule}`,
        display: 'flex', alignItems: 'center',
        flexWrap: 'wrap', gap: '10px 24px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.45s ease 520ms, border-color 0.3s',
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
          letterSpacing: '0.09em', textTransform: 'uppercase',
          color: t.inkFaint, marginRight: 4, transition: 'color 0.3s',
        }}>
          Proficiency key
        </span>
        {[
          { n: 3, lbl: 'Familiar' },
          { n: 4, lbl: 'Proficient' },
          { n: 5, lbl: 'Expert' },
        ].map(({ n, lbl }) => (
          <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{
                  display: 'block', width: 4, height: 4, borderRadius: '50%',
                  background: i < n
                    ? t.ink
                    : dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, transition: 'color 0.3s',
            }}>
              {lbl}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;