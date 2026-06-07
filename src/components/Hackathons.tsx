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
  eventUrl: string;
  year: string;
  role: string;
  location: string;
  status: string;
  summary: string;
  projects: HackathonProject[];
}

const HACKATHONS: Hackathon[] = [
  {
    event: 'AI for Bharat Hackathon',
    eventUrl: 'https://hack2skill.com/event/ai-for-bharat',
    year: '2026',
    role: 'Selected Participant',
    location: 'Online · India',
    status: '24-hr Hackathon',
    summary:
      'Presented the solution idea, got selected for the build phase, and built an AI-powered multimodal retrieval project for the national AI for Bharat program supported by AWS.',
    projects: [
      {
        name: 'MemoryLens',
        description:
          'An AI-powered multimodal search assistant that combines semantic document retrieval with face-based photo search, helping users find memories, files, and people across mixed media.',
        highlights: [
          'Built semantic document retrieval using FAISS and AWS Titan embeddings',
          'Added face-based photo search using AWS Rekognition',
          'Created a multi-format indexing pipeline for PDFs, DOCX, PPTX, XLSX, and images',
          'Designed a unified React interface with ranked results, progress tracking, and direct file access',
        ],
        tech: ['React', 'FastAPI', 'Python', 'FAISS', 'AWS Bedrock', 'AWS Rekognition', 'AWS Textract'],
        github: 'https://github.com/harsh2227kumar',
      },
    ],
  },
  {
    event: 'iDEA 2.0 Hackathon',
    eventUrl: 'https://www.ideahackathon.com/',
    year: '2026',
    role: 'Selected Participant',
    location: 'Union Bank of India · FinTech Hackathon',
    status: '24-hr Hackathon',
    summary:
      'Presented the idea and built a banking-focused complaint intelligence platform during iDEA 2.0, a national innovation challenge presented by Union Bank of India.',
    projects: [
      {
        name: 'CustomerPulse',
        description:
          'A GenAI-powered customer complaint intelligence dashboard for banking teams, focused on complaint processing, sentiment, urgency, churn risk, human-review routing, and SLA visibility.',
        highlights: [
          'Built a React/Vite dashboard connected to a FastAPI backend and PostgreSQL storage',
          'Used AWS Bedrock enrichment, pgvector RAG, and persisted batch jobs for complaint intelligence',
          'Implemented real complaint search, intake, processing progress, analytics, duplicate detection, exports, and SLA reporting',
          'Designed operational views for support agents, managers, and demo judges with real backend-driven data',
        ],
        tech: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'pgvector', 'AWS Bedrock', 'S3', 'Docker'],
        github: 'https://github.com/Harsh2227kumar/CustomerPulse',
      },
    ],
  },
  {
    event: 'Sankalp Bharat Hackathon 2K26',
    eventUrl: 'https://sankalpbharat.stvincentngp.edu.in/problem-statements',
    year: '2026',
    role: 'Selected Participant',
    location: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
    status: '24-hr Hackathon',
    summary:
      'Built CarbonLens for Sankalp Bharat, a hackathon organized by St. Vincent Pallotti College of Engineering & Technology, Nagpur, around the ESG performance and GHG monitoring problem statement.',
    projects: [
      {
        name: 'CarbonLens',
        description:
          'A smart ESG control tower that centralizes emissions data, calculates Scope 1 and Scope 2 footprints, supports limited Scope 3 supplier inputs, and turns scattered reporting into accountable workflows.',
        highlights: [
          'Built activity data upload, manual entry, governance dashboards, and supplier submission workflows',
          'Implemented deterministic emissions calculations with issue tracking and audit-ready summaries',
          'Created role-based flows for sustainability managers, operations teams, suppliers, and leadership reviewers',
          'We were stuck near the end because we could not find proper datasets to continue further.',
        ],
        tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Express', 'Prisma', 'SQLite', 'Recharts'],
        github: 'https://github.com/Abhinav0912007/Sankalp_Bharat',
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
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,30px)', lineHeight: 1.18, letterSpacing: '-0.015em', marginBottom: 5 }}>
              <a
                href={hack.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: t.ink, borderBottom: `1px solid ${t.rule}`, transition: 'color 0.3s, border-color 0.3s, opacity 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.55')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {hack.event} ↗
              </a>
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
