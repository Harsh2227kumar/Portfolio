import React, { useEffect, useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

/* ─── TICKER ─────────────────────────────────────────── */
const TICKER = [
  { label: 'REACT.JS',      icon: '⚛'  },
  { label: 'TYPESCRIPT',    icon: '🔷' },
  { label: 'NODE.JS',       icon: '🟢' },
  { label: 'PYTHON',        icon: '🐍' },
  { label: 'FLASK',         icon: '🫙' },
  { label: 'FASTAPI',       icon: '⚡' },
  { label: 'DOCKER',        icon: '🐳' },
  { label: 'TERRAFORM',     icon: '🏗' },
  { label: 'GCP',           icon: '☁'  },
  { label: 'AWS',           icon: '🟠' },
  { label: 'POSTGRESQL',    icon: '🐘' },
  { label: 'MONGODB',       icon: '🍃' },
  { label: 'JENKINS CI/CD', icon: '🔧' },
  { label: 'KUBERNETES',    icon: '☸'  },
  { label: 'TAILWIND CSS',  icon: '🌬' },
  { label: 'JWT AUTH',      icon: '🔐' },
];

/* ─── COLOUR PALETTE (dark-mode only) ──────────────────
   Each group is assigned one hue. Chosen to be vivid but
   not neon — they sit well against near-black backgrounds.
───────────────────────────────────────────────────────── */
const PALETTE = {
  amber:   '#F5A623',   // warm gold
  sky:     '#38BDF8',   // bright sky blue
  lime:    '#A3E635',   // electric lime
  rose:    '#FB7185',   // soft red-pink
  violet:  '#C084FC',   // light purple
  teal:    '#2DD4BF',   // cool teal
  orange:  '#FB923C',   // punchy orange
  emerald: '#34D399',   // rich green
  indigo:  '#818CF8',   // periwinkle
  fuchsia: '#E879F9',   // hot pink-purple
  yellow:  '#FACC15',   // vivid yellow
};

/* ─── HIGHLIGHT GROUPS ──────────────────────────────────
   Each entry:
     terms  — exact phrases to match (case-insensitive)
     color  — dark-mode color key from PALETTE
   The terms in one group all share the same color so
   semantically related tech words look like a unit.
───────────────────────────────────────────────────────── */
interface HighlightGroup {
  terms: string[];
  colorKey: keyof typeof PALETTE;
}

const GROUPS: HighlightGroup[] = [
  {
    // Who he is
    terms:    ['Full Stack Developer', 'Software Engineer'],
    colorKey: 'amber',
  },
  {
    // JS ecosystem — frameworks
    terms:    ['React.js', 'TypeScript', 'Node.js'],
    colorKey: 'sky',
  },
  {
    // Python ecosystem
    terms:    ['Flask', 'FastAPI', 'Python'],
    colorKey: 'lime',
  },
  {
    // JavaScript language (separate from frameworks)
    terms:    ['JavaScript'],
    colorKey: 'yellow',
  },
  {
    // API / auth layer
    terms:    ['REST APIs', 'JWT authentication'],
    colorKey: 'rose',
  },
  {
    // Databases
    terms:    ['MySQL', 'MongoDB'],
    colorKey: 'emerald',
  },
  {
    // Front-end build tools
    terms:    ['Vite', 'Tailwind CSS'],
    colorKey: 'violet',
  },
  {
    // Cloud platforms
    terms:    ['AWS', 'Google Cloud (GCP)', 'DigitalOcean'],
    colorKey: 'orange',
  },
  {
    // DevOps practice
    terms:    ['CI/CD pipelines', 'containerisation'],
    colorKey: 'teal',
  },
  {
    // Architecture / meta-concepts
    terms:    ['software engineering', 'system architecture'],
    colorKey: 'fuchsia',
  },
];

/* ─── BUILD TERM→COLOR MAP ──────────────────────────── */
const termColorMap = new Map<string, keyof typeof PALETTE>();
GROUPS.forEach(group => {
  group.terms.forEach(term => {
    termColorMap.set(term.toLowerCase(), group.colorKey);
  });
});

/* ─── ALL TERMS (flat, sorted longest-first) ─────────── */
const ALL_TERMS = GROUPS.flatMap(g => g.terms)
  .sort((a, b) => b.length - a.length);

/* ─── TOKENISE SUMMARY ──────────────────────────────── */
const SUMMARY_BODY =
  `Full Stack Developer and Software Engineer with hands-on experience in back-end development, web application development, and cloud-based DevOps. Proficient in building end-to-end web applications using React.js, TypeScript, Node.js, Flask, and FastAPI, with strong back-end expertise in Python and JavaScript. Experienced in designing and consuming REST APIs, JWT authentication, and database management with MySQL and MongoDB. Skilled in web design using front-end technologies including React.js, TypeScript, Vite, and Tailwind CSS. Hands-on with cloud platforms including AWS, Google Cloud (GCP), and DigitalOcean, along with containerisation and CI/CD pipelines. Passionate about solving real-world problems through scalable software engineering and system architecture.`;

function tokenise(text: string): Array<{ word: string; colorKey: keyof typeof PALETTE | null }> {
  const esc    = ALL_TERMS.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex  = new RegExp(`(${esc.join('|')})`, 'gi');
  const parts  = text.split(regex);

  return parts.map(part => {
    const key = part.toLowerCase();
    const colorKey = termColorMap.get(key) ?? null;
    return { word: part, colorKey };
  });
}

const TOKENS = tokenise(SUMMARY_BODY);

/* ─── RENDERED SUMMARY ───────────────────────────────── */
interface SummaryProps { dark: boolean; inkColor: string; inkMidColor: string; }

const SummaryText: React.FC<SummaryProps> = ({ dark, inkColor, inkMidColor }) => (
  <>
    {TOKENS.map((tok, i) => {
      if (!tok.colorKey) {
        // plain text — render as-is
        return <span key={i} style={{ color: inkMidColor, transition: 'color 0.3s' }}>{tok.word}</span>;
      }

      if (dark) {
        // dark mode: rich colour + bold
        const hex = PALETTE[tok.colorKey];
        return (
          <strong
            key={i}
            style={{
              fontWeight: 700,
              color: hex,
              /* subtle glow for pop */
              textShadow: `0 0 20px ${hex}44`,
              transition: 'color 0.3s, text-shadow 0.3s',
            }}
          >
            {tok.word}
          </strong>
        );
      } else {
        // light mode: pure black bold, no colour
        return (
          <strong
            key={i}
            style={{
              fontWeight: 700,
              color: inkColor,
              transition: 'color 0.3s',
            }}
          >
            {tok.word}
          </strong>
        );
      }
    })}
  </>
);

/* ─── MAIN COMPONENT ─────────────────────────────────── */
const Hero: React.FC = () => {
  const { t, dark } = useTheme();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(id);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:   entered ? 1 : 0,
    transform: entered ? 'none' : 'translateY(22px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                 transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const doubled = [...TICKER, ...TICKER];
  const S = "'Instrument Sans', system-ui, sans-serif";

  return (
    <section
      id="home"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── TECH TICKER ───────────────────────────────── */}
      <div
        style={{
          ...fade(0),
          borderBottom: `1px solid ${t.rule}`,
          overflow: 'hidden',
          padding: '11px 0',
          flexShrink: 0,
          transition: 'border-color 0.3s',
        }}
      >
        <div style={{ display: 'flex', width: 'max-content', animation: 'ticker-run 38s linear infinite' }}>
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0 18px',
                fontFamily: S, fontSize: 10.5,
                fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: t.inkFaint, whiteSpace: 'nowrap',
                transition: 'color 0.3s',
              }}
            >
              <span style={{ fontSize: 12 }}>{item.icon}</span>
              {item.label}
              <span style={{ color: t.rule, marginLeft: 18, fontSize: 6 }}>●</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker-run {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── HERO BODY ──────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(48px,7vw,96px) clamp(36px,6vw,80px)',
        }}
      >
        {/* Greeting */}
        <p
          style={{
            ...fade(60),
            fontFamily: S,
            fontSize: 13, fontWeight: 700,
            letterSpacing: '0.13em', textTransform: 'uppercase',
            color: t.inkFaint, marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'color 0.3s',
          }}
        >
          Hi, I'm Harsh 👋
        </p>

        {/* Big summary — colours in dark, bold black in light */}
        <p
          style={{
            ...fade(140),
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(18px,2.1vw,28px)',
            lineHeight: 1.6,
            letterSpacing: '-0.012em',
            color: t.inkMid,          // base colour (plain words)
            maxWidth: 1090,
            marginBottom: 52,
            fontWeight: 400,
            transition: 'color 0.3s',
          }}
        >
          <SummaryText dark={dark} inkColor={t.ink} inkMidColor={t.inkMid} />
        </p>

        {/* CTAs */}
        <div style={{ ...fade(260), display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontFamily: S, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: t.btnBg, color: t.btnFg,
              padding: '13px 28px', borderRadius: 999,
              transition: 'background 0.3s, color 0.3s, opacity 0.15s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get in touch
          </a>
          <a
            href="#experience"
            onClick={e => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontFamily: S, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: t.inkMid,
              border: `1px solid ${t.rule}`,
              padding: '13px 28px', borderRadius: 999,
              transition: 'color 0.2s, border-color 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = t.ink; e.currentTarget.style.borderColor = t.inkMid; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.inkMid; e.currentTarget.style.borderColor = t.rule; }}
          >
            View work
          </a>
        </div>
      </div>

      {/* ── SCROLL CUE ─────────────────────────────────── */}
      <div
        style={{
          ...fade(380),
          padding: '18px clamp(36px,6vw,80px) 28px',
          display: 'flex', alignItems: 'center', gap: 12,
          borderTop: `1px solid ${t.rule}`,
          flexShrink: 0,
          transition: 'border-color 0.3s',
        }}
      >
        <button
          onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            fontFamily: S, fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: t.inkFaint, background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
            display: 'inline-flex', alignItems: 'center', gap: 9,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = t.ink)}
          onMouseLeave={e => (e.currentTarget.style.color = t.inkFaint)}
        >
          SELECTED WORK
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: 'cue-bounce 1.9s ease-in-out infinite' }}
          >
            <line x1="12" y1="5" x2="12" y2="19"/>
            <polyline points="19 12 12 19 5 12"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes cue-bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;