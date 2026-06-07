import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../Context/ThemeContext';

const EDUCATION = [
  {
    period:     'Aug 2024 – May 2028',
    status:     'Pursuing',
    degree:     'B.Tech in Computer Science Engineering',
    inst:       'Symbiosis Institute of Technology, Nagpur',
    score:      '7.4',
    scoreLabel: 'CGPA',
    courses:    ['Data Structures & Algorithms', 'Operating Systems', 'Design & Analysis of Algorithms', 'OOP (Java & Python)', 'Database Management Systems', 'Computer Networks'],
  },
];

const VOLUNTEERING = [
  { role: 'Organiser', org: 'SITNovate 1.0 (24-hr Hackathon) | Enthusia 4.0', inst: 'Symbiosis Institute of Technology' },
  { role: 'Organiser & Sponsorship', org: 'Enthusia 5.0 (College Cultural & Technical Fest)', inst: 'Symbiosis Institute of Technology' },
  { role: 'Campus Ambassador', org: 'Unstop (Present)', inst: 'Promoting hackathons and tech competitions across campus' },
  { role: 'Lead, Hacker\'s Experience & Web Developer', org: 'Hack4Brahma & Hack4Maha Hackathons', inst: '' },
];

const Education = () => {
  const { t } = useTheme();
  const ref   = useReveal();
  const volunteerRef = useReveal();

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <>
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px,3.5vw,40px) clamp(32px,5vw,72px)' }}
    >
      {/* ── Education ── */}
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
        Education
      </p>
      <h2 className="reveal reveal-d1" style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1.1, letterSpacing: '-0.022em', color: t.ink, marginBottom: 18, transition: 'color 0.3s' }}>
        Learning the systems behind <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>software engineering</em>
      </h2>

      {EDUCATION.map((edu, i) => (
        <div
          key={i}
          className="edu-row reveal"
          style={{
            display: 'grid', gridTemplateColumns: '200px 1fr',
            gap: 'clamp(20px,4vw,48px)',
            padding: 'clamp(24px,3.5vw,38px) 0',
            borderTop: `1px solid ${t.rule}`,
            transition: 'border-color 0.3s',
          }}
        >
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, marginBottom: 8, transition: 'color 0.3s' }}>{edu.period}</p>
            <span style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: t.green, border: `1px solid ${t.green}`,
              padding: '2px 8px', borderRadius: 4, display: 'inline-block',
              transition: 'color 0.3s, border-color 0.3s',
            }}>
              {edu.status}
            </span>
          </div>
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(18px,2.2vw,26px)', lineHeight: 1.25, letterSpacing: '-0.01em', color: t.ink, marginBottom: 5, transition: 'color 0.3s' }}>
              {edu.degree}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 13.5, color: t.inkMid, marginBottom: 14, transition: 'color 0.3s' }}>
              {edu.inst}
            </p>
            <div style={{ fontFamily: SERIF, fontSize: 34, lineHeight: 1, letterSpacing: '-0.025em', color: t.ink, marginBottom: 16, transition: 'color 0.3s' }}>
              {edu.score}
              <span style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, letterSpacing: '0.06em', textTransform: 'uppercase', marginLeft: 6, transition: 'color 0.3s' }}>
                {edu.scoreLabel}
              </span>
            </div>
            {/* Coursework chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {edu.courses.map(c => (
                <span key={c} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 9px', borderRadius: 4, transition: 'color 0.3s, border-color 0.3s' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />
    </section>

      {/* ── Volunteering & Leadership ── */}
    <section
      id="volunteer"
      ref={volunteerRef as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px,3.5vw,40px) clamp(32px,5vw,72px)' }}
    >
        <p className="reveal" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
          Volunteering &amp; Leadership
        </p>
        <h2 className="reveal reveal-d1" style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1.1, letterSpacing: '-0.022em', color: t.ink, marginBottom: 18, transition: 'color 0.3s' }}>
          Leading from <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>campus to community</em>
        </h2>

        {VOLUNTEERING.map((v, i) => (
          <div
            key={i}
            className={`edu-row reveal${i > 0 ? ` reveal-d${Math.min(i, 3) as 1|2|3}` : ''}`}
            style={{
              display: 'grid', gridTemplateColumns: '200px 1fr',
              gap: 'clamp(20px,4vw,48px)',
              padding: 'clamp(18px,3vw,28px) 0',
              borderTop: `1px solid ${t.rule}`,
              transition: 'border-color 0.3s',
            }}
          >
            <div style={{ paddingTop: 2 }}>
              <p style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, color: t.inkFaint, textTransform: 'uppercase', letterSpacing: '0.07em', transition: 'color 0.3s' }}>
                {v.role}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: t.ink, marginBottom: 3, transition: 'color 0.3s' }}>
                {v.org}
              </p>
              {v.inst && (
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: t.inkFaint, transition: 'color 0.3s' }}>
                  {v.inst}
                </p>
              )}
            </div>
          </div>
        ))}
        <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />
    </section>
    </>
  );
};

export default Education;
