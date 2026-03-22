import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

/* ─── ICON HELPER ───────────────────────────────────────
   cdn.simpleicons.org/<slug>/<hex> returns the brand SVG
   in that colour. On hover we pass 'ffffff' for white.
──────────────────────────────────────────────────────── */
const si = (slug: string, hex: string) =>
  `https://cdn.simpleicons.org/${slug}/${hex}`;

/* ─── DATA ──────────────────────────────────────────────── */
interface Skill {
  name:      string;
  level:     number;
  slug:      string;   // simpleicons slug
  color:     string;   // brand hex (no #)
  darkInvert?: boolean; // invert on dark bg (for black icons)
}
interface Category {
  id: string; label: string;
  accent: string; accentDark: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: 'lang', label: 'Languages',
    accent: 'hsl(152,62%,40%)', accentDark: 'hsl(152,65%,52%)',
    skills: [
      { name: 'Python',       level: 5, slug: 'python',       color: '3776AB' },
      { name: 'JavaScript',   level: 5, slug: 'javascript',   color: 'F7DF1E' },
      { name: 'TypeScript',   level: 4, slug: 'typescript',   color: '3178C6' },
      { name: 'Java',         level: 4, slug: 'openjdk',      color: 'ED8B00' },
      { name: 'SQL',          level: 4, slug: 'mysql',        color: '4479A1' },
      { name: 'HTML5',        level: 5, slug: 'html5',        color: 'E34F26' },
      { name: 'CSS3',         level: 5, slug: 'css3',         color: '1572B6' },
      { name: 'Bash',         level: 4, slug: 'gnubash',      color: '4EAA25' },
      { name: 'C',            level: 3, slug: 'c',            color: '00599C' },
    ],
  },
  {
    id: 'frontend', label: 'Frontend',
    accent: 'hsl(196,80%,46%)', accentDark: 'hsl(196,85%,56%)',
    skills: [
      { name: 'React',        level: 5, slug: 'react',        color: '61DAFB' },
      { name: 'Next.js',      level: 4, slug: 'nextdotjs',    color: '000000', darkInvert: true },
      { name: 'Vite',         level: 4, slug: 'vite',         color: '646CFF' },
      { name: 'Tailwind CSS', level: 5, slug: 'tailwindcss',  color: '06B6D4' },
      { name: 'shadcn/ui',    level: 4, slug: 'shadcnui',     color: '000000', darkInvert: true },
      { name: 'Streamlit',    level: 4, slug: 'streamlit',    color: 'FF4B4B' },
    ],
  },
  {
    id: 'backend', label: 'Backend',
    accent: 'hsl(22,88%,56%)', accentDark: 'hsl(22,90%,64%)',
    skills: [
      { name: 'Node.js',      level: 4, slug: 'nodedotjs',   color: '339933' },
      { name: 'Express.js',   level: 4, slug: 'express',     color: '000000', darkInvert: true },
      { name: 'Flask',        level: 5, slug: 'flask',       color: '000000', darkInvert: true },
      { name: 'FastAPI',      level: 4, slug: 'fastapi',     color: '009688' },
      { name: 'Socket.IO',    level: 4, slug: 'socketdotio', color: '010101', darkInvert: true },
      { name: 'JWT',          level: 4, slug: 'jsonwebtokens',color: '000000', darkInvert: true },
    ],
  },
  {
    id: 'devops', label: 'DevOps & Cloud',
    accent: 'hsl(270,68%,60%)', accentDark: 'hsl(270,72%,68%)',
    skills: [
      { name: 'Docker',         level: 5, slug: 'docker',              color: '2496ED' },
      { name: 'Terraform',      level: 4, slug: 'terraform',           color: '7B42BC' },
      { name: 'Jenkins',        level: 4, slug: 'jenkins',             color: 'D24939' },
      { name: 'GitHub Actions', level: 4, slug: 'githubactions',       color: '2088FF' },
      { name: 'GCP',            level: 4, slug: 'googlecloud',         color: '4285F4' },
      { name: 'AWS',            level: 3, slug: 'amazonwebservices',   color: 'FF9900' },
      { name: 'Azure',          level: 3, slug: 'microsoftazure',      color: '0078D4' },
      { name: 'DigitalOcean',   level: 4, slug: 'digitalocean',        color: '0080FF' },
    ],
  },
  {
    id: 'db', label: 'Databases',
    accent: 'hsl(340,75%,55%)', accentDark: 'hsl(340,80%,65%)',
    skills: [
      { name: 'MySQL',      level: 5, slug: 'mysql',      color: '4479A1' },
      { name: 'PostgreSQL', level: 4, slug: 'postgresql', color: '4169E1' },
      { name: 'MongoDB',    level: 4, slug: 'mongodb',    color: '47A248' },
      { name: 'Oracle',     level: 3, slug: 'oracle',     color: 'F80000' },
      { name: 'SQLite',     level: 4, slug: 'sqlite',     color: '003B57' },
    ],
  },
  {
    id: 'tools', label: 'Tools & More',
    accent: 'hsl(48,90%,52%)', accentDark: 'hsl(48,92%,60%)',
    skills: [
      { name: 'Git',         level: 5, slug: 'git',         color: 'F05032' },
      { name: 'GitHub',      level: 5, slug: 'github',      color: '181717', darkInvert: true },
      { name: 'Linux',       level: 4, slug: 'linux',       color: 'FCC624' },
      { name: 'Postman',     level: 4, slug: 'postman',     color: 'FF6C37' },
      { name: 'Jira',        level: 3, slug: 'jira',        color: '0052CC' },
      { name: 'IPFS',        level: 3, slug: 'ipfs',        color: '65C2CB' },
      { name: 'scikit-learn',level: 3, slug: 'scikitlearn', color: 'F7931E' },
    ],
  },
];

/* ─── PILL ──────────────────────────────────────────────── */
const Pill: React.FC<{
  skill: Skill; accent: string;
  ink: string; rule: string; dark: boolean;
  delay: number; visible: boolean;
}> = ({ skill, accent, ink, rule, dark, delay, visible }) => {
  const [hov, setHov] = useState(false);
  const [pop, setPop] = useState(false);
  const [err, setErr] = useState(false);

  const onClick = () => { setPop(true); setTimeout(() => setPop(false), 420); };

  /* swap to white icon on hover; colored icon at rest */
  const src = err ? null : si(skill.slug, hov ? 'ffffff' : skill.color);

  /* for black-brand icons on dark bg, invert so they're visible */
  const needsInvert = !hov && dark && skill.darkInvert;

  const dotFilled = hov ? 'rgba(255,255,255,0.95)' : accent;
  const dotEmpty  = hov
    ? 'rgba(255,255,255,0.22)'
    : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)');

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display:        'inline-flex',
        flexDirection:  'column',
        gap:            8,
        padding:        '10px 13px 9px',
        borderRadius:   14,
        border:         `1px solid ${hov ? accent : rule}`,
        background:     hov
          ? accent
          : (dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)'),
        cursor:         'pointer',
        outline:        'none',
        opacity:        visible ? 1 : 0,
        transform:      visible
          ? (pop ? 'scale(0.88)' : hov ? 'translateY(-3px) scale(1.05)' : 'none')
          : 'translateY(14px) scale(0.94)',
        transition: `
          opacity   0.48s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
          transform 0.48s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
          background 0.15s ease,
          border-color 0.15s ease,
          box-shadow 0.15s ease
        `,
        boxShadow: hov ? `0 8px 24px ${accent}4a` : 'none',
      }}
    >
      {/* Icon + name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {/* Icon */}
        <span style={{
          width: 18, height: 18, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hov ? 'scale(1.3) rotate(-8deg)' : 'none',
        }}>
          {src ? (
            <img
              src={src}
              alt={skill.name}
              width={17}
              height={17}
              onError={() => setErr(true)}
              style={{
                objectFit: 'contain',
                filter: needsInvert ? 'invert(1) brightness(2)' : 'none',
                transition: 'filter 0.15s',
              }}
            />
          ) : (
            /* fallback: abbreviation */
            <span style={{
              fontSize: 9.5, fontWeight: 800,
              color: hov ? '#fff' : accent,
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              letterSpacing: '-0.01em',
            }}>
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </span>

        {/* Skill name */}
        <span style={{
          fontFamily:    "'Instrument Sans', system-ui, sans-serif",
          fontSize:      12.5,
          fontWeight:    600,
          letterSpacing: '-0.01em',
          color:         hov ? '#fff' : ink,
          whiteSpace:    'nowrap',
          transition:    'color 0.15s',
        }}>
          {skill.name}
        </span>
      </div>

      {/* Proficiency dots */}
      <div style={{ display: 'flex', gap: 3, paddingLeft: 1 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{
            display:      'block',
            width:        4,
            height:       4,
            borderRadius: '50%',
            background:   i < skill.level ? dotFilled : dotEmpty,
            transition:   `background 0.12s ease ${i * 20}ms`,
          }} />
        ))}
      </div>
    </button>
  );
};

/* ─── CATEGORY COLUMN ───────────────────────────────────── */
const Col: React.FC<{
  cat: Category; accent: string;
  ink: string; inkFaint: string; rule: string; dark: boolean;
  visible: boolean; delay: number;
}> = ({ cat, accent, ink, inkFaint, rule, dark, visible, delay }) => {
  const colRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFired(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={colRef} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Category label with accent dot */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        opacity:   visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: accent, flexShrink: 0,
          boxShadow: `0 0 10px ${accent}88`,
        }} />
        <span style={{
          fontFamily:    "'Instrument Sans', system-ui, sans-serif",
          fontSize:      10.5,
          fontWeight:    700,
          letterSpacing: '0.11em',
          textTransform: 'uppercase',
          color:         inkFaint,
          transition:    'color 0.3s',
        }}>
          {cat.label}
        </span>
      </div>

      {/* Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {cat.skills.map((sk, si) => (
          <Pill
            key={sk.name}
            skill={sk}
            accent={accent}
            ink={ink}
            rule={rule}
            dark={dark}
            delay={delay + si * 38}
            visible={visible && fired}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── SECTION ───────────────────────────────────────────── */
const Skills: React.FC = () => {
  const { t, dark } = useTheme();
  const sectionRef  = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.03 }
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
      style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(32px,5vw,72px)' }}
    >
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 14,
      }}>
        <div>
          <p style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: t.inkFaint, marginBottom: 10,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.44s ease, transform 0.44s ease, color 0.3s',
          }}>
            Skills
          </p>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(26px,3.6vw,40px)',
            letterSpacing: '-0.022em', lineHeight: 1.1,
            color: t.ink,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(12px)',
            transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1) 60ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) 60ms, color 0.3s',
          }}>
            Things I{' '}
            <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>work with</em>
          </h2>
        </div>

        {/* Tech count badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          padding: '8px 16px', borderRadius: 999,
          border: `1px solid ${t.rule}`,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(8px)',
          transition: 'opacity 0.44s ease 120ms, transform 0.44s ease 120ms, border-color 0.3s',
        }}>
          <span style={{ fontFamily: SERIF, fontSize: 20, letterSpacing: '-0.02em', color: t.ink, transition: 'color 0.3s' }}>
            {total}
          </span>
          <span style={{ fontFamily: SANS, fontSize: 11, color: t.inkFaint, transition: 'color 0.3s' }}>
            technologies
          </span>
        </div>
      </div>

      {/* Hint */}
      <p style={{
        fontFamily: SANS, fontSize: 12, color: t.inkFaint,
        marginBottom: 44,
        opacity: visible ? 0.8 : 0,
        transition: 'opacity 0.4s ease 200ms, color 0.3s',
      }}>
        Hover any skill to see proficiency · dots = level
      </p>

      {/* ── Category grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 255px), 1fr))',
        gap: 'clamp(32px,4vw,52px)',
      }}>
        {CATEGORIES.map((cat, ci) => (
          <Col
            key={cat.id}
            cat={cat}
            accent={dark ? cat.accentDark : cat.accent}
            ink={t.ink}
            inkFaint={t.inkFaint}
            rule={t.rule}
            dark={dark}
            visible={visible}
            delay={ci * 80}
          />
        ))}
      </div>

      {/* ── Legend ── */}
      <div style={{
        marginTop: 52, paddingTop: 24,
        borderTop: `1px solid ${t.rule}`,
        display: 'flex', alignItems: 'center',
        flexWrap: 'wrap', gap: '10px 24px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.44s ease 540ms, border-color 0.3s',
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 10.5, fontWeight: 700,
          letterSpacing: '0.09em', textTransform: 'uppercase',
          color: t.inkFaint, marginRight: 4, transition: 'color 0.3s',
        }}>
          Proficiency
        </span>
        {[{ n: 3, lbl: 'Familiar' }, { n: 4, lbl: 'Proficient' }, { n: 5, lbl: 'Expert' }].map(({ n, lbl }) => (
          <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{
                  display: 'block', width: 4, height: 4, borderRadius: '50%',
                  background: i < n
                    ? t.ink
                    : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)'),
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
            <span style={{ fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, transition: 'color 0.3s' }}>
              {lbl}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;