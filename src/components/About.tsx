import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../Context/ThemeContext';

const META = [
  { label: 'Location',     value: 'Nagpur, India' },
  { label: 'Phone',        value: '+91 9405677894' },
  { label: 'Education',    value: 'B.Tech CSE, SIT Nagpur' },
  { label: 'CGPA',         value: '7.4 / 10' },
  { label: 'Open to',      value: 'Remote / Relocation', green: true },
  { label: 'Availability', value: 'Open to opportunities', green: true },
  { label: 'Email',        value: 'harsh2227official@gmail.com', link: 'mailto:harsh2227official@gmail.com' },
];

const About = () => {
  const { t } = useTheme();
  const ref = useReveal();

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 'clamp(24px,3.5vw,40px) clamp(32px,5vw,72px)'
      }}
    >
      <p className="reveal" style={{
        fontFamily: SANS, fontSize: 13, fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: t.inkFaint, marginBottom: 44, transition: 'color 0.3s',
      }}>
        About
      </p>

      <div className="about-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'start' }}>

        {/* Left — headline + bio */}
        <div>
          <h2 className="reveal" style={{
            fontFamily: SERIF,
            fontSize: 'clamp(28px,3.8vw,44px)',
            lineHeight: 1.12, letterSpacing: '-0.022em',
            color: t.ink, marginBottom: 24, transition: 'color 0.3s',
          }}>
            Building at the<br />
            <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>intersection</em> of<br />
            code &amp; cloud.
          </h2>

          <div className="reveal reveal-d1" style={{
            fontFamily: SANS, fontSize: 14.5,
            color: t.inkMid, lineHeight: 1.78, transition: 'color 0.3s',
          }}>
            <p>
              Full Stack Developer and Software Engineer pursuing B.Tech in Computer Science
              Engineering at Symbiosis Institute of Technology, Nagpur. Passionate about building
              end-to-end web applications and scalable backend systems.
            </p>
            <p style={{ marginTop: 16 }}>
              Experienced across two internships at Elevate Labs — from DevOps infrastructure
              automation to shipping production full-stack applications with AI integrations.
              Also active in organising major hackathons and leading technical teams on campus.
            </p>
          </div>
        </div>

        {/* Right — meta table */}
        <div className="reveal reveal-d2">
          {META.map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '13px 0',
              borderBottom: `1px solid ${t.rule}`,
              ...(i === 0 ? { borderTop: `1px solid ${t.rule}` } : {}),
              transition: 'border-color 0.3s',
            }}>
              <span style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: t.inkFaint, transition: 'color 0.3s',
              }}>
                {row.label}
              </span>
              <span style={{
                fontFamily: SANS, fontSize: 13.5, fontWeight: 500,
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

      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, marginTop: 'clamp(24px,3.5vw,40px)', transition: 'border-color 0.3s' }} />
    </section>
  );
};

export default About;
