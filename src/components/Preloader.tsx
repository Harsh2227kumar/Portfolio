import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Preloader = () => {
  const { t } = useTheme();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return Math.min(p + Math.random() * 18 + 5, 100);
      });
    }, 85);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: t.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      transition: 'background 0.3s',
    }}>
      <p style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 'clamp(28px,5vw,48px)',
        letterSpacing: '-0.025em',
        color: t.ink,
        marginBottom: 40,
        lineHeight: 1,
        transition: 'color 0.3s',
      }}>
        Harsh{' '}
        <em style={{ fontStyle: 'italic', color: t.inkFaint }}>Kumar</em>
      </p>

      <div style={{
        width: 160, height: 1,
        background: t.rule,
        borderRadius: 99, overflow: 'hidden',
        transition: 'background 0.3s',
      }}>
        <div style={{
          height: '100%',
          background: t.ink,
          borderRadius: 99,
          width: `${Math.min(pct, 100)}%`,
          transition: 'width 0.1s ease, background 0.3s',
        }} />
      </div>

      <p style={{
        fontFamily: "'Instrument Sans', system-ui, sans-serif",
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: t.inkFaint,
        marginTop: 20,
        transition: 'color 0.3s',
      }}>
        Loading
      </p>
    </div>
  );
};

export default Preloader;