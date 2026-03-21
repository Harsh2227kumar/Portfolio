import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../context/ThemeContext';

interface Project {
  num: string; title: string; subtitle: string;
  body: string; highlights: string[];
  tags: string[]; link: string; linkLabel: string;
}

const PROJECTS: Project[] = [
  {
    num: '01', title: 'Multi-Cloud Auto Deployment', subtitle: 'GCP + DigitalOcean · Infrastructure as Code',
    body: 'Deployed scalable NGINX web servers across Google Cloud Platform and DigitalOcean using Terraform — consistent, automated multi-cloud infrastructure provisioning with idempotent setup scripts.',
    highlights: [
      'Provisioned Ubuntu VMs on GCP and DigitalOcean with modular Terraform config',
      'Automated NGINX install and content deploy via single idempotent shell script',
      'SSH via Terraform remote-exec for secure, no-touch server initialisation',
      'IaC best practices: versioned, repeatable, multi-cloud delivery',
    ],
    tags: ['Terraform', 'GCP', 'DigitalOcean', 'NGINX', 'Bash', 'SSH'],
    link: 'https://github.com/Harsh2227kumar/Multi-Cloud-Deployment-Terraform/',
    linkLabel: 'View on GitHub',
  },
  {
    num: '02', title: 'Incident Management System', subtitle: 'Elevate Labs · Dockerised Flask App',
    body: 'A comprehensive ticket tracking system with role-based access control, REST APIs, and automated SMTP email alerts. Built during DevOps internship — cut incident resolution time by 30%.',
    highlights: [
      'RBAC with full ticket lifecycle management (Open → In Progress → Resolved)',
      'Automated email notifications on every state change',
      'Fully containerised with Docker for consistent deployments',
    ],
    tags: ['Flask', 'Docker', 'SQLite', 'SMTP', 'Python', 'Bootstrap'],
    link: 'https://github.com/harsh2227kumar/Incident-Management-Public',
    linkLabel: 'View on GitHub',
  },
  {
    num: '03', title: 'Hack4Maha — Official Website', subtitle: 'Live production site · React.js',
    body: 'Frontend development for a major Maharashtra hackathon. Fully responsive, modern design serving 500+ participants with registration, schedules, and live event updates.',
    highlights: [
      'Fully responsive across all device sizes',
      'Built with React.js and Tailwind CSS',
      'Live in production throughout the hackathon',
    ],
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Git'],
    link: 'https://hack4maha.live/',
    linkLabel: 'Visit live site',
  },
];

const Projects = () => {
  const { t } = useTheme();
  const ref = useReveal();

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,60px)' }}
    >
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 4, transition: 'color 0.3s' }}>
        Projects
      </p>

      {PROJECTS.map((proj, i) => (
        <div
          key={i}
          className={`proj-row reveal${i > 0 ? ` reveal-d${Math.min(i, 3) as 1|2|3}` : ''}`}
          style={{
            display: 'grid', gridTemplateColumns: '200px 1fr',
            gap: 'clamp(20px,4vw,48px)',
            padding: 'clamp(28px,4vw,44px) 0',
            borderTop: `1px solid ${t.rule}`,
            transition: 'border-color 0.3s',
          }}
        >
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontFamily: SERIF, fontSize: 13, fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>{proj.num}</p>
          </div>

          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.2, letterSpacing: '-0.015em', color: t.ink, marginBottom: 5, transition: 'color 0.3s' }}>
              {proj.title}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 12.5, color: t.inkFaint, fontWeight: 500, marginBottom: 18, transition: 'color 0.3s' }}>
              {proj.subtitle}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 14.5, color: t.inkMid, lineHeight: 1.72, marginBottom: 20, maxWidth: 580, transition: 'color 0.3s' }}>
              {proj.body}
            </p>

            <ul style={{ listStyle: 'none', marginBottom: 22 }}>
              {proj.highlights.map((h, j) => (
                <li key={j} style={{ fontFamily: SANS, fontSize: 13.5, color: t.inkMid, padding: '3px 0 3px 14px', position: 'relative', lineHeight: 1.6, transition: 'color 0.3s' }}>
                  <span style={{ position: 'absolute', left: 0, color: t.inkFaint, fontSize: 11, top: '6px', transition: 'color 0.3s' }}>—</span>
                  {h}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {proj.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 500, color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 10px', borderRadius: 4, transition: 'color 0.3s, border-color 0.3s' }}>
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