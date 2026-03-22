import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../Context/ThemeContext';

interface Project {
  num:        string;
  title:      string;
  subtitle:   string;
  year:       string;
  body:       string;
  highlights: string[];
  tags:       string[];
  link:       string;
  linkLabel:  string;
}

const PROJECTS: Project[] = [
  {
    num:      '01',
    title:    'TenderBlock',
    subtitle: 'Web3 Decentralised Tendering Platform',
    year:     '2026',
    body:     'A decentralised tendering platform on Flow blockchain where tender creation, bidding, and settlement execute fully on-chain, indexed into MySQL for fast reads and search.',
    highlights: [
      'On-chain tender lifecycle (creation, bidding, settlement) via Flow blockchain and FCL',
      'Dual-auth — wallet via FCL and JWT cookie — with IPFS document storage',
      'Rate limiting and paginated tender discovery API with status filters and text search',
      'MySQL indexed from blockchain events for performant queries',
    ],
    tags:      ['React', 'Node.js', 'Express', 'MySQL', 'Flow Blockchain', 'FCL', 'IPFS', 'JWT'],
    link:      'https://github.com/harsh2227kumar',
    linkLabel: 'View on GitHub',
  },
  {
    num:      '02',
    title:    'MemoryLens',
    subtitle: 'AI-Powered Multimodal Search Assistant',
    year:     '2026',
    body:     'Production-deployed AI search assistant combining semantic document retrieval (FAISS + AWS Titan embeddings) and face-based photo search via AWS Rekognition.',
    highlights: [
      'Semantic document retrieval using FAISS + AWS Titan embeddings',
      'Face-based photo search via AWS Rekognition',
      'Multi-format indexing pipeline — PDF, DOCX, PPTX, XLSX, images — with background processing',
      'Real-time progress tracking and unified React UI with ranked results and direct file access',
    ],
    tags:      ['React', 'FastAPI', 'FAISS', 'AWS Rekognition', 'AWS Bedrock', 'Textract', 'Python'],
    link:      'https://github.com/harsh2227kumar',
    linkLabel: 'View on GitHub',
  },
  {
    num:      '03',
    title:    'Smart Resume Builder',
    subtitle: 'Full-Stack MERN + Next.js · AI-Powered',
    year:     '2025',
    body:     'Full-stack resume builder with a multi-step editor, live preview, one-click PDF export, and Google Gemini AI suggestions for ATS-optimised content. Built during Web Dev internship.',
    highlights: [
      'Multi-step resume editor with live preview and one-click PDF export',
      'Google Gemini AI integration for ATS-optimised content suggestions',
      'Full-stack MERN + Next.js architecture with responsive design',
    ],
    tags:      ['React', 'Next.js', 'Node.js', 'MongoDB', 'Google Gemini AI', 'Tailwind CSS'],
    link:      'https://github.com/harsh2227kumar',
    linkLabel: 'View on GitHub',
  },
  {
    num:      '04',
    title:    'Zen Chat',
    subtitle: 'Real-Time Messaging App · React + Socket.IO',
    year:     '2025',
    body:     'Real-time chat web application supporting private and group chats, presence indicators, unread badges, and optimistic message updates for snappy UX.',
    highlights: [
      'Socket.IO for private and group real-time messaging with online/offline presence',
      'Optimistic message updates and read/delivery receipts',
      'Fully responsive TypeScript + React frontend with mobile slide-in sidebar',
      'TanStack Query for REST API integration; Zod validation with react-hook-form',
    ],
    tags:      ['React', 'TypeScript', 'Vite', 'Socket.IO', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'],
    link:      'https://github.com/harsh2227kumar',
    linkLabel: 'View on GitHub',
  },
  {
    num:      '05',
    title:    'College FAQ Chatbot',
    subtitle: 'Production NLP Chatbot · FastAPI + Docker',
    year:     '2026',
    body:     'Production-ready NLP chatbot with a 7-stage pipeline achieving 85%+ classifier accuracy, deployed as a FastAPI backend with Streamlit analytics dashboard.',
    highlights: [
      '7-stage pipeline: intent classification, TF-IDF retrieval, entity extraction, fallback handling',
      '85%+ classifier accuracy with scikit-learn and spaCy',
      'FastAPI backend with chat and analytics endpoints deployed via Docker Compose',
      'Streamlit dashboard with SQLite interaction logging for data-driven FAQ expansion',
    ],
    tags:      ['Python', 'FastAPI', 'Streamlit', 'scikit-learn', 'spaCy', 'Docker', 'SQLite'],
    link:      'https://github.com/harsh2227kumar',
    linkLabel: 'View on GitHub',
  },
  {
    num:      '06',
    title:    'Incident Management System',
    subtitle: 'Flask · Docker · JWT · REST API',
    year:     '2025',
    body:     'Full-stack incident management system with JWT role authentication (Admin, Technician, User), RESTful APIs, automated SMTP email alerts, and Docker containerisation.',
    highlights: [
      'JWT-based role authentication with three user tiers',
      'RESTful APIs for CRUD operations with validation and error handling',
      'Automated SMTP email alerts for real-time status updates',
      'Fully containerised with Docker + MySQL for portable, scalable deployment',
    ],
    tags:      ['Flask', 'Docker', 'MySQL', 'JWT', 'REST API', 'SMTP', 'Python'],
    link:      'https://github.com/harsh2227kumar/Incident-Management-Public',
    linkLabel: 'View on GitHub',
  },
];

const Projects = () => {
  const { t } = useTheme();
  const ref   = useReveal();

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(32px,5vw,72px)' }}
    >
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
        Projects
      </p>

      {PROJECTS.map((proj, i) => (
        <div
          key={i}
          className={`proj-row reveal${i > 0 ? ` reveal-d${Math.min(i % 3 + 1, 3) as 1|2|3}` : ''}`}
          style={{
            display: 'grid', gridTemplateColumns: '200px 1fr',
            gap: 'clamp(20px,4vw,48px)',
            padding: 'clamp(28px,4vw,44px) 0',
            borderTop: `1px solid ${t.rule}`,
            transition: 'border-color 0.3s',
          }}
        >
          {/* Left: number + year */}
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontFamily: SERIF, fontSize: 13, fontStyle: 'italic', color: t.inkFaint, marginBottom: 6, transition: 'color 0.3s' }}>
              {proj.num}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, letterSpacing: '0.04em', transition: 'color 0.3s' }}>
              {proj.year}
            </p>
          </div>

          {/* Right: content */}
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(19px,2.4vw,28px)', lineHeight: 1.2, letterSpacing: '-0.015em', color: t.ink, marginBottom: 5, transition: 'color 0.3s' }}>
              {proj.title}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: t.inkFaint, fontWeight: 500, marginBottom: 16, transition: 'color 0.3s' }}>
              {proj.subtitle}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 14, color: t.inkMid, lineHeight: 1.72, marginBottom: 18, transition: 'color 0.3s' }}>
              {proj.body}
            </p>

            <ul style={{ listStyle: 'none', marginBottom: 20 }}>
              {proj.highlights.map((h, j) => (
                <li key={j} style={{
                  fontFamily: SANS, fontSize: 13.5,
                  color: t.inkMid, lineHeight: 1.6,
                  padding: '3px 0 3px 14px',
                  position: 'relative',
                  transition: 'color 0.3s',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: t.inkFaint, fontSize: 11, top: '6px', transition: 'color 0.3s' }}>—</span>
                  {h}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {proj.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 10px', borderRadius: 4, transition: 'color 0.3s, border-color 0.3s' }}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={proj.link} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: t.ink, borderBottom: `1px solid ${t.ink}`, paddingBottom: 1, display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color 0.3s, border-color 0.3s, opacity 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {proj.linkLabel} ↗
            </a>
          </div>
        </div>
      ))}

      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, transition: 'border-color 0.3s' }} />
    </section>
  );
};

export default Projects;