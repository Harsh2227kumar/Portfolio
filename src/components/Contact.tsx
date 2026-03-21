import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  { label: 'Email',    value: 'harsh2227official@gmail.com',      href: 'mailto:harsh2227official@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/harsh-2227-kumar',  href: 'https://www.linkedin.com/in/harsh-2227-kumar/' },
  { label: 'GitHub',   value: 'github.com/harsh2227kumar',         href: 'https://github.com/harsh2227kumar' },
  { label: 'Location', value: 'Nagpur, Maharashtra, India',        href: null },
];

const Contact = () => {
  const { t } = useTheme();
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [msg, setMsg]   = useState('');
  const [ok, setOk]     = useState(false);

  const SANS  = "'Instrument Sans', system-ui, sans-serif";
  const SERIF = "'Instrument Serif', Georgia, serif";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setMsg('');
    const fd = new FormData();
    fd.append('access_key', '0c7064db-4ebd-41e9-91a2-fbb203f4c205');
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('message', form.message);
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setMsg("Message sent — I'll be in touch soon!"); setOk(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setMsg('Something went wrong. Please try again.'); setOk(false);
      }
    } catch {
      setMsg('Network error. Please try again.'); setOk(false);
    }
    setSending(false);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,60px) clamp(80px,12vw,140px)' }}
    >
      <hr style={{ border: 'none', borderTop: `1px solid ${t.rule}`, marginBottom: 'clamp(56px,8vw,96px)', transition: 'border-color 0.3s' }} />

      <p className="reveal" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 44, transition: 'color 0.3s' }}>
        Contact
      </p>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <h2 className="reveal" style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: t.ink, marginBottom: 20, transition: 'color 0.3s' }}>
            Let's build<br />
            <em style={{ fontStyle: 'italic', color: t.inkFaint, transition: 'color 0.3s' }}>something great</em><br />
            together.
          </h2>

          <p className="reveal reveal-d1" style={{ fontFamily: SANS, fontSize: 14.5, color: t.inkMid, lineHeight: 1.72, marginBottom: 36, transition: 'color 0.3s' }}>
            Open to DevOps roles, full-stack projects, internships, and collaborations.
            I respond to every message.
          </p>

          <div className="reveal reveal-d2">
            {LINKS.map((link, i) => {
              const inner = (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '14px 0',
                  borderBottom: `1px solid ${t.rule}`,
                  ...(i === 0 ? { borderTop: `1px solid ${t.rule}` } : {}),
                  transition: 'border-color 0.3s',
                }}>
                  <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: t.ink, transition: 'color 0.3s' }}>{link.label}</span>
                  <span style={{ fontFamily: SANS, fontSize: 12.5, color: t.inkFaint, display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.3s' }}>
                    {link.value} {link.href && '↗'}
                  </span>
                </div>
              );
              return link.href ? (
                <a
                  key={i} href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ display: 'block', transition: 'opacity 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {inner}
                </a>
              ) : <div key={i}>{inner}</div>;
            })}
          </div>
        </div>

        {/* Right — form */}
        <form
          className="reveal reveal-d1"
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          {[
            { key: 'name',    label: 'Your name',     type: 'text',  placeholder: 'Harsh Kumar' },
            { key: 'email',   label: 'Email address', type: 'email', placeholder: 'you@example.com' },
          ].map((field) => (
            <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: t.inkFaint, transition: 'color 0.3s' }}>
                {field.label}
              </label>
              <input
                type={field.type} required
                placeholder={field.placeholder}
                value={(form as any)[field.key]}
                onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                className="ed-input"
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: t.inkFaint, transition: 'color 0.3s' }}>
              Message
            </label>
            <textarea
              required rows={5}
              placeholder="Tell me about your project or just say hello…"
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="ed-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 8 }}>
            <button
              type="submit" disabled={sending}
              style={{
                fontFamily: SANS, fontSize: 13.5, fontWeight: 600,
                background: t.btnBg, color: t.btnFg,
                border: 'none', cursor: sending ? 'default' : 'pointer',
                padding: '11px 26px', borderRadius: 999,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                opacity: sending ? 0.55 : 1,
                transition: 'background 0.3s, color 0.3s, opacity 0.15s',
              }}
              onMouseEnter={(e) => { if (!sending) e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={(e) => { if (!sending) e.currentTarget.style.opacity = '1'; }}
            >
              {sending && (
                <svg style={{ width: 14, height: 14, animation: 'spin 0.7s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              )}
              {sending ? 'Sending…' : 'Send message'}
            </button>

            {msg && (
              <p style={{ fontFamily: SANS, fontSize: 13, color: ok ? t.green : '#DC2626' }}>{msg}</p>
            )}
          </div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>
      </div>
    </section>
  );
};

export default Contact;