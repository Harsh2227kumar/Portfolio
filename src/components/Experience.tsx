import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../context/ThemeContext';

interface Metric { num: string; label: string; }
interface ExpItem {
  company: string; period: string; type: string;
  title: string; body: string;
  metrics?: Metric[]; tags: string[];
}

const EXPERIENCES: ExpItem[] = [
  {
    company: 'Elevate Labs', period: 'Jun 2025 – Jul 2025', type: 'Internship',
    title: 'DevOps Intern',
    body: 'Built containerised infrastructure and automated multi-cloud deployments from scratch. Architected CI/CD pipelines using Jenkins for reliable cross-cloud delivery on GCP and DigitalOcean.',
    metrics: [
      { num: '40%',  label: 'deployment time reduction' },
      { num: '30%',  label: 'incident resolution improvement' },
      { num: '2',    label: 'cloud providers automated' },
    ],
    tags: ['Docker', 'Terraform', 'Jenkins', 'GCP', 'DigitalOcean', 'Flask', 'Bash'],
  },
  {
    company: 'Hack4Maha & Hack4Brahma', period: 'Apr 2025 – Oct 2025', type: 'Volunteer',
    title: "Lead, Hacker's Experience & Web Developer",
    body: 'Managed engagement and logistics for 500+ participants across two major hackathon events. Built and deployed the official event website with React.js and Tailwind CSS.',
    metrics: [
      { num: '500+', label: 'participants managed' },
      { num: '2',    label: 'major events organised' },
    ],
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Event Management'],
  },
  {
    company: 'Unstop', period: 'Sep 2025 – Present', type: 'Volunteer',
    title: 'Campus Ambassador',
    body: 'Promoting student participation in hackathons, coding competitions, and technical events. Building community engagement and facilitating networking opportunities across campus.',
    tags: ['Community Building', 'Outreach'],
  },
];

const Experience = () => {
  const { t } = useTheme();
  const ref = useReveal();

  const SANS = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,60px)',
      }}
    >
      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, marginBottom: 'clamp(56px,8vw,96px)', transition: 'border-color 0.3s' }} />

      <p className="reveal" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
        Experience
      </p>

      {EXPERIENCES.map((exp, i) => (
        <div
          key={i}
          className={`exp-row reveal${i > 0 ? ` reveal-d${Math.min(i, 3) as 1|2|3}` : ''}`}
          style={{
            display: 'grid', gridTemplateColumns: '200px 1fr',
            gap: 'clamp(20px,4vw,48px)',
            padding: 'clamp(28px,4vw,44px) 0',
            borderTop: `1px solid ${t.rule}`,
            transition: 'border-color 0.3s',
          }}
        >
          {/* Left */}
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 4, transition: 'color 0.3s' }}>{exp.company}</p>
            <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, marginBottom: 10, transition: 'color 0.3s' }}>{exp.period}</p>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 9px', borderRadius: 4, display: 'inline-block', transition: 'color 0.3s, border-color 0.3s' }}>
              {exp.type}
            </span>
          </div>

          {/* Right */}
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.18, letterSpacing: '-0.015em', color: t.ink, marginBottom: 14, transition: 'color 0.3s' }}>
              {exp.title}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 14.5, color: t.inkMid, lineHeight: 1.72, marginBottom: exp.metrics ? 24 : 20, transition: 'color 0.3s' }}>
              {exp.body}
            </p>

            {exp.metrics && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginBottom: 22 }}>
                {exp.metrics.map((m, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', color: t.metricNum, transition: 'color 0.3s' }}>{m.num}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, marginTop: 4, transition: 'color 0.3s' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {exp.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 500, color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 10px', borderRadius: 4, transition: 'color 0.3s, border-color 0.3s' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />
    </section>
  );
};

export default Experience;