import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../context/ThemeContext';

const EDUCATION = [
  { period: 'Aug 2024 – May 2028', status: 'Pursuing', degree: 'B.Tech in Computer Science Engineering', inst: 'Symbiosis Institute of Technology, Nagpur', score: '7.5', scoreLabel: 'CGPA' },
  { period: '2022', status: 'Completed', degree: 'HSC — Class 12th', inst: 'Tuli Public School, Nagpur', score: '64', scoreLabel: '%' },
  { period: '2020', status: 'Completed', degree: 'SSC — Class 10th', inst: 'Delhi Public School, Nagpur', score: '78', scoreLabel: '%' },
];

const CERTS = [
  { issuer: 'Elevate Labs',  name: 'DevOps Internship Certificate',             year: 'Jul 2025', url: 'https://drive.google.com/file/d/1BFEDKfKpIcAuKLDPLUpSy38N98qz0E3G/view?usp=sharing' },
  { issuer: 'Red Hat',       name: 'Certified Specialist in Python Programming', year: '2024',     url: 'https://drive.google.com/file/d/1E5bomX4mh-Mu2i6g1nLGLLzjUeThLvf5/view?usp=sharing' },
  { issuer: 'Various',       name: 'Data Structures and Algorithms using Python', year: '2024',    url: 'https://drive.google.com/file/d/1N3743EI2kjaGNkTPrFVpL2qcUTMWsHIw/view?usp=sharing' },
  { issuer: 'Cisco',         name: 'Networking Basics',                          year: '2024',     url: 'https://drive.google.com/file/d/1IwkEBHZZMXX3ckIWnE-fu4qhknYnhKgC/view?usp=sharing' },
  { issuer: 'HackerRank',    name: 'SQL (Intermediate)',                         year: '2024',     url: 'https://drive.google.com/file/d/1c5PKrI2ozjyXnl_1QlHOP7JP_9Qn33y_/view?usp=sharing' },
];

const Education = () => {
  const { t } = useTheme();
  const ref = useReveal();

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,60px)' }}
    >
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
        Education
      </p>

      {EDUCATION.map((edu, i) => (
        <div
          key={i}
          className={`edu-row reveal${i > 0 ? ` reveal-d${Math.min(i, 3) as 1|2|3}` : ''}`}
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
              fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
              color: edu.status === 'Pursuing' ? t.green : t.inkFaint,
              border: `1px solid ${edu.status === 'Pursuing' ? t.green : t.rule}`,
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
            <p style={{ fontFamily: SANS, fontSize: 13.5, color: t.inkMid, marginBottom: 14, transition: 'color 0.3s' }}>{edu.inst}</p>
            <div style={{ fontFamily: SERIF, fontSize: 36, lineHeight: 1, letterSpacing: '-0.025em', color: t.ink, transition: 'color 0.3s' }}>
              {edu.score}
              <span style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, letterSpacing: '0.06em', textTransform: 'uppercase', marginLeft: 6, transition: 'color 0.3s' }}>
                {edu.scoreLabel}
              </span>
            </div>
          </div>
        </div>
      ))}
      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />

      {/* Certifications */}
      <div style={{ marginTop: 56 }}>
        <p className="reveal" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 28, transition: 'color 0.3s' }}>
          Licenses &amp; Certifications
        </p>

        <div className="cert-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {CERTS.map((cert, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const lastRow = Math.floor((CERTS.length - 1) / 3);
            return (
              <div
                key={i}
                style={{
                  padding: '26px 22px',
                  borderLeft: col === 0 ? 'none' : `1px solid ${t.rule}`,
                  borderBottom: row === lastRow ? 'none' : `1px solid ${t.rule}`,
                  paddingLeft: col === 0 ? 0 : 22,
                  transition: 'border-color 0.3s',
                }}
              >
                <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 8, transition: 'color 0.3s' }}>
                  {cert.issuer}
                </p>
                <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: t.ink, lineHeight: 1.4, marginBottom: 5, transition: 'color 0.3s' }}>
                  {cert.name}
                </p>
                <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, marginBottom: 14, transition: 'color 0.3s' }}>{cert.year}</p>
                <a
                  href={cert.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: t.ink, borderBottom: `1px solid ${t.ink}`, display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'opacity 0.15s, color 0.3s, border-color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  View ↗
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;