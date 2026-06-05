import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../Context/ThemeContext';

interface CourseBadge {
  title: string;
  issuer: string;
  image?: string;
  url: string;
  badgeId?: string;
}

interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  url: string;
  previewImage?: string;
  skills: string[];
}

const COURSE_BADGES: CourseBadge[] = [
  {
    title: 'Networking Basics',
    issuer: 'Cisco',
    image: '/cisco-networking.png',
    badgeId: '4d2a06fb-b2ed-422e-9f5a-2d1e34a043be',
    url: 'https://www.credly.com/badges/4d2a06fb-b2ed-422e-9f5a-2d1e34a043be',
  },
  {
    title: 'Python Programming',
    issuer: 'Red Hat',
    image: '/redhat-python.png',
    badgeId: '7fa886be-7b26-4f3a-9af9-f210f5f37fc0',
    url: 'https://www.credly.com/badges/7fa886be-7b26-4f3a-9af9-f210f5f37fc0',
  },
  {
    title: 'System Administration',
    issuer: 'Red Hat',
    image: '/redhat-system administrator.png',
    badgeId: 'e2537380-a4ef-4649-83ac-ceb62042bfb7',
    url: 'https://www.credly.com/badges/e2537380-a4ef-4649-83ac-ceb62042bfb7',
  },
  {
    title: 'Linux Fundamentals',
    issuer: 'TryHackMe',
    image: '/certificates/Screenshot 2026-06-05 171826.png',
    url: 'https://tryhackme.com/harsh2227official/badges/terminaled?utm_campaign=social_share&utm_medium=social&utm_content=badge&utm_source=copy&sharerId=6434fe8f91428700437ffb9f',
  },
];

const COURSE_CERTIFICATES: CertificateItem[] = [
  {
    title: 'SQL Basic',
    issuer: 'HackerRank',
    year: '2024',
    url: 'https://www.hackerrank.com/certificates/iframe/2ac995a11ad0',
    previewImage: '/certificates/SQL Basics.png',
    skills: ['SQL', 'Queries', 'Databases'],
  },
  {
    title: 'SQL Intermediate',
    issuer: 'HackerRank',
    year: '2024',
    url: 'https://www.hackerrank.com/certificates/iframe/5546df6bf89b',
    previewImage: '/certificates/SQL Interm.png',
    skills: ['SQL', 'Queries', 'Databases'],
  },
  {
    title: 'Data Structures and Algorithms',
    issuer: 'Infosys',
    year: '2024',
    url: '/certificates/infosys-dsa.pdf',
    previewImage: '/certificates/infosys-dsa.png',
    skills: ['DSA', 'Python', 'Problem Solving'],
  },
  {
    title: 'AWS Job Simulation',
    issuer: 'AWS',
    year: '2025',
    url: '/certificates/aws-job simulation.pdf',
    previewImage: '/certificates/aws.png',
    skills: ['AWS', 'Cloud', 'Simulation'],
  },
];

const INTERNSHIP_CERTIFICATES: CertificateItem[] = [
  {
    title: 'DevOps Internship',
    issuer: 'Elevate Labs',
    year: '2025',
    url: '/certificates/elevate-devops.pdf',
    previewImage: '/certificates/elevate-devops.png',
    skills: ['Docker', 'Terraform', 'Jenkins', 'GCP'],
  },
  {
    title: 'Web Development Internship',
    issuer: 'Elevate Labs',
    year: '2025',
    url: '/certificates/elevate-web dev.pdf',
    previewImage: '/certificates/elevate-web dev.png',
    skills: ['React', 'Node.js', 'MongoDB', 'AI'],
  },
];

const BadgeCircle: React.FC<{ badge: CourseBadge; index: number }> = ({ badge, index }) => {
  const { t, dark } = useTheme();
  const SANS = "'Instrument Sans', system-ui, sans-serif";

  return (
    <a
      href={badge.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal${index > 0 ? ` reveal-d${Math.min(index, 3) as 1|2|3}` : ''}`}
      style={{
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${t.rule}`,
        borderRadius: 8,
        overflow: 'hidden',
        background: dark ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.012)',
        transition: 'opacity 0.15s, background 0.3s, border-color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.72')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <div style={{
        flex: 1,
        minHeight: 0,
        borderBottom: `1px solid ${t.rule}`,
        background: dark ? '#151514' : '#F4F4F1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: badge.image ? 10 : 16,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {badge.image ? (
          <img
            src={badge.image}
            alt={`${badge.title} badge`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: dark
              ? 'linear-gradient(145deg, rgba(212,40,40,0.22), rgba(255,255,255,0.035))'
              : 'linear-gradient(145deg, rgba(212,40,40,0.12), rgba(0,0,0,0.025))',
            transition: 'background 0.3s',
          }}>
            <span style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              border: '1px solid #D42828',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: SANS,
              fontSize: 20,
              fontWeight: 800,
              color: '#D42828',
            }}>
              THM
            </span>
            <span style={{
              fontFamily: SANS,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: t.inkMid,
              textAlign: 'center',
              transition: 'color 0.3s',
            }}>
              Linux<br />Fundamentals
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '10px 12px 11px', flexShrink: 0 }}>
        <p style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, color: t.ink, lineHeight: 1.3, marginBottom: 6, transition: 'color 0.3s' }}>
          {badge.title} - {badge.issuer}
        </p>
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: t.inkMid, transition: 'color 0.3s' }}>
          View badge ↗
        </span>
      </div>
    </a>
  );
};

const CertificatePreview: React.FC<{ item: CertificateItem }> = ({ item }) => {
  const { t, dark } = useTheme();
  const SANS = "'Instrument Sans', system-ui, sans-serif";

  if (item.previewImage) {
    return (
      <div style={{
        aspectRatio: '16 / 10',
        borderBottom: `1px solid ${t.rule}`,
        background: '#FFFFFF',
        overflow: 'hidden',
        padding: 6,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <img
          src={item.previewImage}
          alt={`${item.title} certificate preview`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: '16 / 10',
      borderBottom: `1px solid ${t.rule}`,
      background: dark ? '#151514' : '#F4F4F1',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <span style={{
        fontFamily: SANS,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: t.green,
        border: `1px solid ${t.green}`,
        borderRadius: 4,
        padding: '4px 9px',
        transition: 'color 0.3s, border-color 0.3s',
      }}>
        {item.issuer}
      </span>
      <span style={{
        fontFamily: SANS,
        fontSize: 11,
        color: t.inkFaint,
        textAlign: 'center',
        transition: 'color 0.3s',
      }}>
        Preview image pending
      </span>
    </div>
  );
};

const CertificateCard: React.FC<{ item: CertificateItem; index: number }> = ({ item, index }) => {
  const { t, dark } = useTheme();
  const SANS = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <article
      className={`reveal${index > 0 ? ` reveal-d${Math.min(index, 3) as 1|2|3}` : ''}`}
      style={{
        border: `1px solid ${t.rule}`,
        borderRadius: 8,
        overflow: 'hidden',
        background: dark ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.012)',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <CertificatePreview item={item} />
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          padding: 12,
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.74')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{
            fontFamily: SANS,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: t.green,
            border: `1px solid ${t.green}`,
            borderRadius: 4,
            padding: '2px 7px',
            transition: 'color 0.3s, border-color 0.3s',
          }}>
            {item.issuer}
          </span>
          <span style={{ fontFamily: SANS, fontSize: 11.5, color: t.inkFaint, transition: 'color 0.3s' }}>
            {item.year}
          </span>
        </div>

        <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(16px,1.65vw,20px)', lineHeight: 1.18, letterSpacing: '-0.012em', color: t.ink, marginBottom: 10, transition: 'color 0.3s' }}>
          {item.title} - {item.issuer}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {item.skills.map((skill) => (
            <span key={skill} style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 500, color: t.inkMid, border: `1px solid ${t.rule}`, padding: '3px 8px', borderRadius: 4, transition: 'color 0.3s, border-color 0.3s' }}>
              {skill}
            </span>
          ))}
        </div>

        <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: t.ink, borderBottom: `1px solid ${t.ink}`, paddingBottom: 1, transition: 'color 0.3s, border-color 0.3s' }}>
          View certificate ↗
        </span>
      </a>
    </article>
  );
};

const BadgesCertifications = () => {
  const { t } = useTheme();
  const ref = useReveal();

  const SANS = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  return (
    <section
      id="badges-certifications"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(24px,3.5vw,40px) clamp(32px,5vw,72px)' }}
    >
      <p className="reveal" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 10, transition: 'color 0.3s' }}>
        Badges &amp; Certifications
      </p>

      <h1 className="reveal" style={{ fontFamily: SERIF, fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.04, letterSpacing: '-0.025em', color: t.ink, marginBottom: 18, transition: 'color 0.3s' }}>
        Courses
      </h1>

      <p className="reveal reveal-d1" style={{ fontFamily: SANS, fontSize: 14, color: t.inkMid, lineHeight: 1.72, maxWidth: 760, marginBottom: 38, transition: 'color 0.3s' }}>
        Course badges, exam certificates, and internship completion proof collected in one place.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(42px,6vw,68px)' }}>
        <div>
          <h2 className="reveal" style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.018em', color: t.ink, marginBottom: 18, transition: 'color 0.3s' }}>
            Badges
          </h2>
          <div className="proof-row-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
            {COURSE_BADGES.map((badge, index) => (
              <BadgeCircle key={badge.title} badge={badge} index={index} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="reveal" style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.018em', color: t.ink, marginBottom: 18, transition: 'color 0.3s' }}>
            Certificates
          </h2>
          <div className="proof-row-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
            {COURSE_CERTIFICATES.map((item, index) => (
              <CertificateCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="reveal" style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.018em', color: t.ink, marginBottom: 18, transition: 'color 0.3s' }}>
            Internships
          </h2>
          <div className="proof-row-grid internship-proof-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
            {INTERNSHIP_CERTIFICATES.map((item, index) => (
              <CertificateCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, marginTop: 24, transition: 'border-color 0.3s' }} />
    </section>
  );
};

export default BadgesCertifications;
