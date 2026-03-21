import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Preloader   from '@/components/Preloader';
import Navigation  from '@/components/Navigation';
import Hero        from '@/components/Hero';
import About       from '@/components/About';
import Experience  from '@/components/Experience';
import Projects    from '@/components/Projects';
import Skills      from '@/components/Skills';
import Education   from '@/components/Education';
import Contact     from '@/components/Contact';

const Index = () => {
  const { t } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div style={{ background: t.bg, minHeight: '100vh', transition: 'background 0.3s' }}>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${t.rule}`,
        maxWidth: 1100, margin: '0 auto',
        padding: '28px clamp(20px,5vw,60px)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 12,
        transition: 'border-color 0.3s',
      }}>
        <span style={{
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 12.5, color: t.inkFaint, transition: 'color 0.3s',
        }}>
          © {new Date().getFullYear()} Harsh Kumar
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/harsh2227kumar' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harsh-2227-kumar/' },
            { label: 'Email',    href: 'mailto:harsh2227official@gmail.com' },
          ].map((l) => (
            <a
              key={l.label} href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 12.5, color: t.inkFaint, transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = t.inkFaint)}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Index;