import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../Context/ThemeContext';

interface Metric { num: string; label: string; }
interface ExpItem {
  company: string; period: string; type: string;
  title: string; body: string;
  bullets: string[];
  metrics?: Metric[];
  tags: string[];
}

const EXPERIENCES: ExpItem[] = [
  {
    company: 'Elevate Labs',
    period:  'Nov 2025 – Dec 2025',
    type:    'Internship',
    title:   'Web Developer Intern',
    body:    'Shipped two production-grade full-stack applications during a one-month web development internship — combining modern frontend, real-time backend, and AI-powered features.',
    bullets: [
      'Built Smart Resume Builder — full-stack MERN + Next.js app with multi-step resume editor, live preview, one-click PDF export, and Google Gemini AI suggestions for ATS-optimised content',
      'Developed Zen Chat — real-time messaging app using React, TypeScript, and Socket.IO with private/group chats, presence indicators, optimistic updates, and fully responsive mobile layout',
    ],
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Socket.IO', 'MongoDB', 'Google Gemini AI', 'Tailwind CSS'],
  },
  {
    company: 'Elevate Labs',
    period:  'Jun 2025 – Jul 2025',
    type:    'Internship',
    title:   'DevOps Intern',
    body:    'Automated multi-cloud infrastructure and built containerised deployment pipelines across GCP and DigitalOcean — cutting deployment time by 40% and incident resolution time by 30%.',
    bullets: [
      'Automated multi-cloud deployments on GCP and DigitalOcean using Terraform and shell scripts; set up Jenkins CI/CD pipelines for containerised apps',
      'Built a Dockerised Flask app with RBAC, REST APIs, and automated email alerts; created scalable IaC templates',
    ],
    metrics: [
      { num: '40%', label: 'deployment time reduction' },
      { num: '30%', label: 'incident resolution improvement' },
    ],
    tags: ['Docker', 'Terraform', 'Jenkins', 'GCP', 'DigitalOcean', 'Flask', 'Bash', 'CI/CD'],
  },
];

const Experience = () => {
  const { t } = useTheme();
  const ref   = useReveal();

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px,3.5vw,40px) clamp(32px,5vw,72px)' }}
    >
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
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
          {/* Left meta */}
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 4, transition: 'color 0.3s' }}>
              {exp.company}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, marginBottom: 10, transition: 'color 0.3s' }}>
              {exp.period}
            </p>
            <span style={{
              fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: t.inkMid, border: `1px solid ${t.rule}`,
              padding: '3px 9px', borderRadius: 4, display: 'inline-block',
              transition: 'color 0.3s, border-color 0.3s',
            }}>
              {exp.type}
            </span>
          </div>

          {/* Right content */}
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.18, letterSpacing: '-0.015em', color: t.ink, marginBottom: 12, transition: 'color 0.3s' }}>
              {exp.title}
            </h3>

            <p style={{ fontFamily: SANS, fontSize: 14, color: t.inkMid, lineHeight: 1.72, marginBottom: 18, transition: 'color 0.3s' }}>
              {exp.body}
            </p>

            {/* Bullet achievements */}
            <ul style={{ listStyle: 'none', marginBottom: exp.metrics ? 24 : 20 }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{
                  fontFamily: SANS, fontSize: 13.5,
                  color: t.inkMid, lineHeight: 1.65,
                  padding: '4px 0 4px 16px',
                  position: 'relative',
                  transition: 'color 0.3s',
                }}>
                  <span style={{ position: 'absolute', left: 0, top: 9, width: 5, height: 5, borderRadius: '50%', background: t.inkFaint, transition: 'background 0.3s', display: 'block' }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* Metrics */}
            {exp.metrics && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginBottom: 22 }}>
                {exp.metrics.map((m, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: SERIF, fontSize: 28, lineHeight: 1, letterSpacing: '-0.02em', color: t.metricNum, transition: 'color 0.3s' }}>
                      {m.num}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: t.inkFaint, marginTop: 4, transition: 'color 0.3s' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {exp.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: SANS, fontSize: 11.5, fontWeight: 500,
                  color: t.inkMid, border: `1px solid ${t.rule}`,
                  padding: '3px 10px', borderRadius: 4,
                  transition: 'color 0.3s, border-color 0.3s',
                }}>
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
