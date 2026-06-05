import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../Context/ThemeContext';

interface HackathonProject {
  name: string;
  description: string;
  highlights: string[];
  tech: string[];
  github?: string;
  demo?: string;
}

interface Hackathon {
  event: string;
  year: string;
  role: string;
  location: string;
  status: string;
  summary: string;
  projects: HackathonProject[];
}

const HACKATHONS: Hackathon[] = [
  {
    event: 'CodeSprint Hackathon',
    year: '2025',
    role: 'Participant',
    location: 'Online',
    status: '36-hr Build',
    summary:
      'Built a full-stack project with a small team during a time-boxed hackathon sprint, focusing on rapid prototyping, clean user flow, and a working MVP.',
    projects: [
      {
        name: 'SkillSwap',
        description:
          'A peer-to-peer skill exchange platform where students can list skills, match with other learners, and schedule collaborative learning sessions.',
        highlights: [
          'Built authentication, profile creation, and skill listing flows',
          'Implemented match discovery with filters for skill category and availability',
          'Created a responsive dashboard for requests, accepted matches, and session status',
        ],
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        github: 'https://github.com/harsh2227kumar',
      },
    ],
  },
  {
    event: 'InnovateX Hackathon',
    year: '2025',
    role: 'Participant',
    location: 'Campus Hackathon',
    status: '24-hr Build',
    summary:
      'Participated in a campus hackathon and built an AI-assisted web app prototype aimed at solving a practical student productivity problem.',
    projects: [
      {
        name: 'StudyMate AI',
        description:
          'An AI study assistant that lets students upload notes, generate summaries, create quizzes, and track revision topics from one interface.',
        highlights: [
          'Designed note upload and summary generation workflow',
          'Added quiz generation from extracted study material',
          'Built a clean React interface for subjects, summaries, and revision history',
        ],
        tech: ['React', 'FastAPI', 'Python', 'Gemini API', 'Tailwind CSS'],
        github: 'https://github.com/harsh2227kumar',
      },
    ],
  },
  {
    event: 'BuildForGood Hackathon',
    year: '2024',
    role: 'Participant',
    location: 'Online',
    status: '48-hr Build',
    summary:
      'Worked on a social-impact hackathon project, turning the idea into a working prototype with user-facing screens and backend APIs.',
    projects: [
      {
        name: 'MedAlert',
        description:
          'A medication reminder and emergency contact web app for patients, with schedule tracking, alerts, and a simple caregiver view.',
        highlights: [
          'Created medicine schedule CRUD flows with reminder status tracking',
          'Built emergency contact cards and caregiver-friendly patient overview',
          'Implemented backend APIs for schedules, users, and alert history',
        ],
        tech: ['React', 'Flask', 'SQLite', 'JWT', 'Bootstrap'],
        github: 'https://github.com/harsh2227kumar',
      },
    ],
  },
];

const Hackathons = () => {
  const { t } = useTheme();
  const ref = useReveal();

  const SANS = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="hackathons"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px,3.5vw,40px) clamp(32px,5vw,72px)' }}
    >
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 10, transition: 'color 0.3s' }}>
        Hackathons
      </p>

      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, flexWrap: 'wrap', marginBottom: 18 }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1.1, letterSpacing: '-0.022em', color: t.ink, transition: 'color 0.3s' }}>
          Builds from <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>hackathon floors</em>
        </h2>
        <span style={{ fontFamily: SANS, fontSize: 12, color: t.inkFaint, transition: 'color 0.3s' }}>
          {HACKATHONS.length} events
        </span>
      </div>

      <p className="reveal reveal-d1" style={{ fontFamily: SANS, fontSize: 14, color: t.inkMid, lineHeight: 1.72, maxWidth: 760, marginBottom: 28, transition: 'color 0.3s' }}>
        A running list of hackathons I have participated in, along with the projects I built, technical choices, key features, and repository links from each build.
      </p>

      {HACKATHONS.map((hack, i) => (
        <div
          key={hack.event}
          className={`hack-row reveal${i > 0 ? ` reveal-d${Math.min(i, 3) as 1|2|3}` : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: 'clamp(20px,4vw,48px)',
            padding: 'clamp(28px,4vw,44px) 0',
            borderTop: `1px solid ${t.rule}`,
            transition: 'border-color 0.3s',
          }}
        >
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontFamily: SERIF, fontSize: 14, fontStyle: 'italic', color: t.inkFaint, marginBottom: 6, transition: 'color 0.3s' }}>
              {hack.year}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: t.ink, marginBottom: 8, transition: 'color 0.3s' }}>
              {hack.role}
            </p>
            <span style={{
              fontFamily: SANS,
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: t.green,
              border: `1px solid ${t.green}`,
              padding: '3px 9px',
              borderRadius: 4,
              display: 'inline-block',
              transition: 'color 0.3s, border-color 0.3s',
            }}>
              {hack.status}
            </span>
          </div>

          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,30px)', lineHeight: 1.18, letterSpacing: '-0.015em', color: t.ink, marginBottom: 5, transition: 'color 0.3s' }}>
              {hack.event}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: t.inkFaint, fontWeight: 500, marginBottom: 14, transition: 'color 0.3s' }}>
              {hack.location}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 14, color: t.inkMid, lineHeight: 1.72, marginBottom: 22, transition: 'color 0.3s' }}>
              {hack.summary}
            </p>

            {hack.projects.map((project) => (
              <div key={project.name} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
                  <h4 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: t.ink, transition: 'color 0.3s' }}>
                    {project.name}
                  </h4>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: t.ink, borderBottom: `1px solid ${t.ink}`, paddingBottom: 1, transition: 'opacity 0.15s, color 0.3s, border-color 0.3s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: t.ink, borderBottom: `1px solid ${t.ink}`, paddingBottom: 1, transition: 'opacity 0.15s, color 0.3s, border-color 0.3s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                </div>

                <p style={{ fontFamily: SANS, fontSize: 13.5, color: t.inkMid, lineHeight: 1.68, marginBottom: 12, transition: 'color 0.3s' }}>
                  {project.description}
                </p>

                <ul style={{ listStyle: 'none', marginBottom: 16 }}>
                  {project.highlights.map((highlight) => (
                    <li key={highlight} style={{
                      fontFamily: SANS,
                      fontSize: 13,
                      color: t.inkMid,
                      lineHeight: 1.6,
                      padding: '3px 0 3px 14px',
                      position: 'relative',
                      transition: 'color 0.3s',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: t.inkFaint, fontSize: 11, top: 6, transition: 'color 0.3s' }}>—</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {project.tech.map((tag) => (
                    <span key={tag} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 10px', borderRadius: 4, transition: 'color 0.3s, border-color 0.3s' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />
    </section>
  );
};

export default Hackathons;
