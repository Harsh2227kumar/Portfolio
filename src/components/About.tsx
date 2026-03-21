import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../context/ThemeContext';

const META = [
  { label: 'Location',     value: 'Nagpur, India' },
  { label: 'Currently',    value: 'DevOps Intern @ Elevate Labs' },
  { label: 'Education',    value: 'B.Tech CSE, SIT Nagpur' },
  { label: 'CGPA',         value: '7.5 / 10' },
  { label: 'Availability', value: 'Open to opportunities', green: true },
  { label: 'Email',        value: 'harsh2227official@gmail.com', link: 'mailto:harsh2227official@gmail.com' },
];

const About = () => {
  const { t } = useTheme();
  const ref = useReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,60px)',
      }}
    >
      <p className="reveal" style={{
        fontFamily: "'Instrument Sans', system-ui, sans-serif",
        fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: t.inkFaint, marginBottom: 44,
        transition: 'color 0.3s',
      }}>
        About
      </p>

      <div className="about-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <h2 className="reveal" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(30px,4vw,46px)',
            lineHeight: 1.15, letterSpacing: '-0.02em',
            color: t.ink, marginBottom: 24,
            transition: 'color 0.3s',
          }}>
            Building at the<br />
            <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>intersection</em> of<br />
            code &amp; cloud.
          </h2>

          <div className="reveal reveal-d1" style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontSize: 15, color: t.inkMid, lineHeight: 1.75,
            transition: 'color 0.3s',
          }}>
            <p>
              I'm a passionate DevOps and Web Development enthusiast pursuing B.Tech in
              Computer Science Engineering at Symbiosis Institute of Technology, Nagpur.
              My journey is driven by curiosity and a relentless pursuit of building
              robust, scalable systems.
            </p>
            <p style={{ marginTop: 16 }}>
              With hands-on experience across technical internships and hackathon
              organisations, I've built a solid foundation in DevOps, Web Development,
              Networking, and Cybersecurity — including CI/CD pipelines and infrastructure
              as code.
            </p>
          </div>
        </div>

        {/* Right — meta table */}
        <div className="reveal reveal-d2">
          {META.map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '14px 0',
              borderBottom: `1px solid ${t.rule}`,
              ...(i === 0 ? { borderTop: `1px solid ${t.rule}` } : {}),
              transition: 'border-color 0.3s',
            }}>
              <span style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 11.5, fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: t.inkFaint, transition: 'color 0.3s',
              }}>
                {row.label}
              </span>
              <span style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 14, fontWeight: 500,
                textAlign: 'right',
                color: row.green ? t.green : t.ink,
                transition: 'color 0.3s',
              }}>
                {row.link
                  ? <a href={row.link} style={{ color: t.ink, transition: 'color 0.3s' }}>{row.value}</a>
                  : row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;