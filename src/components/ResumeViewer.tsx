import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink, Maximize2, Moon, RotateCw, Star, Sun, X, ZoomIn, ZoomOut } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist/types/src/display/api';
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';
import { useTheme } from '@/Context/ThemeContext';
import { RESUME_FILENAME, RESUME_URL, ResumeSource, useResume } from '@/Context/ResumeContext';
import { trackEvent } from '@/lib/analytics';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const SANS = "'Instrument Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";
const ZOOM_STEPS = [0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3];
const PAGE_GAP = 20;

interface PageSize { width: number; height: number }
interface LinkBox { url: string; left: number; top: number; width: number; height: number }

/* ─── single page ─────────────────────────────────────── */
const PdfPage = ({ doc, pageNumber, size, scale, rotation, paperDark, onLink }: {
  doc: PDFDocumentProxy;
  pageNumber: number;
  size: PageSize;
  scale: number;
  rotation: number;
  paperDark: boolean;
  onLink: (url: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [links, setLinks] = useState<LinkBox[]>([]);
  const turned = rotation % 180 !== 0;
  const width = (turned ? size.height : size.width) * scale;
  const height = (turned ? size.width : size.height) * scale;

  useEffect(() => {
    let task: RenderTask | null = null;
    let cancelled = false;

    // Debounced so rapid zoom clicks only paint the final scale.
    const timer = window.setTimeout(async () => {
      const page = await doc.getPage(pageNumber);
      if (cancelled || !canvasRef.current) return;
      const viewport = page.getViewport({ scale, rotation });
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const canvas = canvasRef.current;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      task = page.render({ canvasContext: ctx, viewport, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined });
      task.promise.catch(() => {});

      const annotations = await page.getAnnotations({ intent: 'display' });
      if (cancelled) return;
      setLinks(
        annotations
          .filter((a) => a.subtype === 'Link' && typeof a.url === 'string')
          .map((a) => {
            const [x1, y1, x2, y2] = viewport.convertToViewportRectangle(a.rect);
            return { url: a.url as string, left: Math.min(x1, x2), top: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1) };
          })
      );
    }, 90);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      task?.cancel();
    };
  }, [doc, pageNumber, scale, rotation]);

  return (
    <div
      data-page={pageNumber}
      style={{
        position: 'relative',
        width, height,
        flexShrink: 0,
        background: '#FFFFFF',
        borderRadius: 4,
        boxShadow: '0 1px 2px rgba(0,0,0,0.12), 0 12px 40px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        filter: paperDark ? 'invert(0.9) hue-rotate(180deg)' : 'none',
        transition: 'filter 0.3s',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} aria-label={`Resume page ${pageNumber}`} />
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.url}
          onClick={() => onLink(link.url)}
          style={{ position: 'absolute', left: link.left, top: link.top, width: link.width, height: link.height, cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

/* ─── viewer ──────────────────────────────────────────── */
const ResumeViewer = ({ source, onClose }: { source: ResumeSource; onClose: () => void }) => {
  const { t, dark } = useTheme();
  const { count, appreciated, toggleAppreciation } = useResume();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [sizes, setSizes] = useState<PageSize[]>([]);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState(1);
  const [fitWidth, setFitWidth] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [paperDark, setPaperDark] = useState(false);
  const [page, setPage] = useState(1);
  const [pop, setPop] = useState(false);

  const panelBg = dark ? '#0C0C0B' : '#EFEFEC';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const hover = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const starColor = dark ? '#FACC15' : '#D97706';

  /* load document */
  useEffect(() => {
    let destroyed = false;
    const task = pdfjs.getDocument({ url: RESUME_URL });
    task.promise
      .then(async (pdf) => {
        if (destroyed) return;
        const all = await Promise.all(
          Array.from({ length: pdf.numPages }, async (_, i) => {
            const p = await pdf.getPage(i + 1);
            const v = p.getViewport({ scale: 1 });
            return { width: v.width, height: v.height };
          })
        );
        if (destroyed) return;
        setSizes(all);
        setDoc(pdf);
      })
      .catch(() => !destroyed && setError(true));
    return () => {
      destroyed = true;
      task.destroy();
    };
  }, []);

  /* body scroll lock, focus */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  /* active reading time inside the viewer */
  useEffect(() => {
    let seconds = 0;
    let sent = false;
    const tick = window.setInterval(() => {
      if (document.visibilityState === 'visible') seconds += 1;
    }, 1000);
    const report = () => {
      if (sent || seconds < 1) return;
      sent = true;
      trackEvent('resume_view_time', source, seconds);
    };
    window.addEventListener('pagehide', report);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener('pagehide', report);
      report();
    };
  }, [source]);

  /* fit-to-width */
  const computeFit = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !sizes.length) return;
    const widest = Math.max(...sizes.map((s) => (rotation % 180 ? s.height : s.width)));
    const available = el.clientWidth - (el.clientWidth < 600 ? 24 : 64);
    setScale(Math.max(0.3, Math.min(available / widest, 1.6)));
  }, [sizes, rotation]);

  useEffect(() => {
    if (!fitWidth) return;
    computeFit();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(computeFit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitWidth, computeFit]);

  /* keep the reading position when the scale changes */
  const ratioRef = useRef(0);
  const zoomTo = useCallback((next: number) => {
    const el = scrollRef.current;
    if (el) ratioRef.current = el.scrollHeight ? (el.scrollTop + el.clientHeight / 2) / el.scrollHeight : 0;
    setFitWidth(false);
    setScale(Math.max(0.3, Math.min(next, 3)));
  }, []);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || !ratioRef.current) return;
    el.scrollTop = ratioRef.current * el.scrollHeight - el.clientHeight / 2;
    ratioRef.current = 0;
  }, [scale]);

  const zoomIn = useCallback(() => zoomTo(ZOOM_STEPS.find((z) => z > scale + 0.01) ?? 3), [scale, zoomTo]);
  const zoomOut = useCallback(() => zoomTo([...ZOOM_STEPS].reverse().find((z) => z < scale - 0.01) ?? 0.3), [scale, zoomTo]);

  /* current page from scroll position */
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const mid = el.scrollTop + el.clientHeight / 2;
    const pages = el.querySelectorAll<HTMLElement>('[data-page]');
    let current = 1;
    pages.forEach((p) => { if (p.offsetTop <= mid) current = Number(p.dataset.page); });
    setPage(current);
  };

  const goTo = useCallback((n: number) => {
    const target = scrollRef.current?.querySelector<HTMLElement>(`[data-page="${n}"]`);
    if (target && scrollRef.current) scrollRef.current.scrollTo({ top: target.offsetTop - PAGE_GAP, behavior: 'smooth' });
  }, []);

  /* keyboard + ctrl/pinch wheel zoom */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) { e.preventDefault(); return zoomIn(); }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); return zoomOut(); }
      if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); return setFitWidth(true); }
      if (e.target instanceof HTMLElement && e.target.closest('button,a,input')) return;
      if (e.key === '+' || e.key === '=') zoomIn();
      else if (e.key === '-') zoomOut();
      else if (e.key === '0') setFitWidth(true);
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goTo(Math.min(page + 1, sizes.length)); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(Math.max(page - 1, 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, zoomIn, zoomOut, goTo, page, sizes.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      zoomTo(scale * Math.exp(-e.deltaY * 0.0025));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [scale, zoomTo]);

  const appreciate = () => {
    if (!appreciated) {
      setPop(true);
      window.setTimeout(() => setPop(false), 450);
    }
    toggleAppreciation();
  };

  /* ─── ui helpers ─── */
  const iconBtn = (active = false): React.CSSProperties => ({
    width: 34, height: 34, flexShrink: 0,
    borderRadius: '50%',
    border: `1px solid ${border}`,
    background: active ? hover : 'transparent',
    color: active ? t.ink : t.inkMid,
    cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 0.2s, color 0.2s',
  });
  const hoverOn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = hover; e.currentTarget.style.color = t.ink; };
  const hoverOff = (active = false) => (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = active ? hover : 'transparent';
    e.currentTarget.style.color = active ? t.ink : t.inkMid;
  };

  // Plain render helper (not a component) so buttons keep focus across re-renders.
  const tool = (label: string, onClick: () => void, children: React.ReactNode, active = false) => (
    <button type="button" aria-label={label} title={label} onClick={onClick} style={iconBtn(active)} onMouseEnter={hoverOn} onMouseLeave={hoverOff(active)}>
      {children}
    </button>
  );

  return (
    <div
      role="dialog"
      className="rv-overlay"
      aria-modal="true"
      aria-label="Harsh Kumar resume"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: dark ? 'rgba(0,0,0,0.62)' : 'rgba(20,20,18,0.38)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0px, 2.5vw, 28px)',
        animation: 'rv-fade 0.25s ease both',
      }}
    >
      <div
        className="rv-panel"
        style={{
          width: 'min(1100px, 100%)', height: '100%',
          background: panelBg,
          border: `1px solid ${border}`,
          borderRadius: 14,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
          animation: 'rv-rise 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* ── header ── */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px 12px 20px', borderBottom: `1px solid ${border}`, flexWrap: 'wrap' }}>
          <div style={{ marginRight: 'auto', minWidth: 0 }}>
            <p style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.inkFaint, marginBottom: 2 }}>Resume</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.1, color: t.ink, whiteSpace: 'nowrap' }}>Harsh Kumar</h2>
          </div>

          {/* appreciation */}
          <button
            type="button"
            onClick={appreciate}
            aria-pressed={appreciated}
            title={appreciated ? 'You appreciated this resume — click to undo' : 'Liked the resume? Leave a star'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 34, padding: '0 14px 0 11px',
              borderRadius: 999,
              border: `1px solid ${appreciated ? starColor : border}`,
              background: appreciated ? (dark ? 'rgba(250,204,21,0.1)' : 'rgba(217,119,6,0.08)') : 'transparent',
              color: appreciated ? starColor : t.inkMid,
              fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
          >
            <Star size={15} strokeWidth={2.2} fill={appreciated ? starColor : 'none'} style={{ transform: pop ? 'scale(1.35) rotate(-12deg)' : 'none', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)' }} />
            <span className="rv-hide-sm">{appreciated ? 'Appreciated' : 'Appreciate'}</span>
            {count !== null && (
              <span style={{ fontVariantNumeric: 'tabular-nums', color: appreciated ? starColor : t.ink, paddingLeft: 8, borderLeft: `1px solid ${appreciated ? starColor : border}` }}>
                {new Intl.NumberFormat('en-IN').format(count)}
              </span>
            )}
          </button>

          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            onClick={() => trackEvent('resume_download', source)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              height: 34, padding: '0 16px',
              borderRadius: 999,
              background: t.btnBg, color: t.btnFg,
              fontFamily: SANS, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Download size={14} strokeWidth={2.4} /><span className="rv-hide-sm">Download</span>
          </a>
          <button ref={closeRef} type="button" aria-label="Close resume" title="Close (Esc)" onClick={onClose} style={iconBtn()} onMouseEnter={hoverOn} onMouseLeave={hoverOff()}>
            <X size={16} strokeWidth={2.2} />
          </button>
        </header>

        {/* ── toolbar ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderBottom: `1px solid ${border}`, overflowX: 'auto' }}>
          {tool('Previous page', () => goTo(Math.max(page - 1, 1)), <ChevronUp size={15} />)}
          <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: t.inkMid, minWidth: 54, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
            {sizes.length ? `${page} / ${sizes.length}` : '– / –'}
          </span>
          {tool('Next page', () => goTo(Math.min(page + 1, sizes.length)), <ChevronDown size={15} />)}

          <span style={{ width: 1, height: 20, background: border, margin: '0 6px', flexShrink: 0 }} />

          {tool('Zoom out (−)', zoomOut, <ZoomOut size={15} />)}
          <button
            type="button"
            onClick={() => zoomTo(1)}
            title="Reset to 100%"
            style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: t.ink, background: 'none', border: 'none', cursor: 'pointer', minWidth: 48, fontVariantNumeric: 'tabular-nums' }}
          >
            {Math.round(scale * 100)}%
          </button>
          {tool('Zoom in (+)', zoomIn, <ZoomIn size={15} />)}
          {tool('Fit to width (0)', () => setFitWidth(true), <Maximize2 size={14} />, fitWidth)}

          <span style={{ width: 1, height: 20, background: border, margin: '0 6px', flexShrink: 0 }} />

          {tool('Rotate', () => setRotation((r) => (r + 90) % 360), <RotateCw size={14} />)}
          {tool(paperDark ? 'Light paper' : 'Dark paper', () => setPaperDark((v) => !v), paperDark ? <Sun size={14} /> : <Moon size={14} />, paperDark)}
          {tool('Open in new tab', () => { trackEvent('resume_new_tab', source); window.open(RESUME_URL, '_blank', 'noopener'); }, <ExternalLink size={14} />)}

          <span className="rv-hide-sm" style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 11, color: t.inkFaint, whiteSpace: 'nowrap', paddingLeft: 12 }}>
            Ctrl + scroll to zoom · ← → pages
          </span>
        </div>

        {/* ── pages ── */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          style={{
            flex: 1, overflow: 'auto',
            background: dark ? '#111110' : '#E4E4E0',
            overscrollBehavior: 'contain',
          }}
        >
          {error ? (
            <div style={{ height: '100%', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
              <div>
                <p style={{ fontFamily: SERIF, fontSize: 28, color: t.ink, marginBottom: 8 }}>Couldn't load the resume.</p>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: t.inkMid, marginBottom: 20 }}>Try opening the PDF directly instead.</p>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.ink, border: `1px solid ${t.rule}`, padding: '11px 22px', borderRadius: 999 }}>
                  Open PDF ↗
                </a>
              </div>
            </div>
          ) : !doc ? (
            <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 'min(520px, 80%)', aspectRatio: '1 / 1.414', borderRadius: 4, background: dark ? '#1A1A18' : '#F4F4F1', animation: 'rv-pulse 1.4s ease-in-out infinite' }} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: PAGE_GAP, padding: `${PAGE_GAP}px 12px 40px`, width: 'max-content', minWidth: '100%' }}>
              {sizes.map((size, i) => (
                <PdfPage
                  key={i}
                  doc={doc}
                  pageNumber={i + 1}
                  size={size}
                  scale={scale}
                  rotation={rotation}
                  paperDark={paperDark}
                  onLink={(url) => {
                    let host = url;
                    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch { /* keep raw */ }
                    trackEvent('resume_link_click', host);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes rv-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rv-rise { from { transform: translateY(18px) scale(0.985); } to { transform: none; } }
        @keyframes rv-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        @media (max-width: 640px) {
          .rv-overlay { padding: 0 !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
          .rv-panel { border-radius: 0 !important; border: none !important; }
          .rv-hide-sm { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumeViewer;
