import React, { createContext, useContext, useEffect, useState } from 'react';

/* --- TOKEN SHAPES ----------------------------------- */
export interface ThemeTokens {
  bg:        string;   // page background
  surface:   string;   // nav / marquee bg
  navBlur:   string;   // frosted nav bg
  ink:       string;   // primary text
  inkMid:    string;   // secondary text
  inkFaint:  string;   // tertiary / placeholders
  rule:      string;   // hairline dividers
  green:     string;   // availability green (stays same)
  btnBg:     string;   // primary button bg
  btnFg:     string;   // primary button text
  outlineFg: string;   // ghost button text
  outlineBorder: string;
  inputBorder: string;
  inputFocus:  string;
  scrollThumb: string;
  marqueeItem: string;
  marqueeDot:  string;
  skillBar:    string;
  metricNum:   string;
}

/* --- LIGHT TOKENS ----------------------------------- */
export const LIGHT: ThemeTokens = {
  bg:            '#FFFFFF',
  surface:       '#FFFFFF',
  navBlur:       'rgba(255,255,255,0.92)',
  ink:           '#1A1A1A',
  inkMid:        '#5C5C5C',
  inkFaint:      '#ABABAB',
  rule:          '#E4E4E0',
  green:         '#16A34A',
  btnBg:         '#1A1A1A',
  btnFg:         '#FFFFFF',
  outlineFg:     '#5C5C5C',
  outlineBorder: '#E4E4E0',
  inputBorder:   '#E4E4E0',
  inputFocus:    '#1A1A1A',
  scrollThumb:   '#E4E4E0',
  marqueeItem:   '#CBCBC6',
  marqueeDot:    '#E4E4E0',
  skillBar:      '#1A1A1A',
  metricNum:     '#1A1A1A',
};

/* --- DARK TOKENS ------------------------------------ */
export const DARK: ThemeTokens = {
  bg:            '#111110',
  surface:       '#111110',
  navBlur:       'rgba(17,17,16,0.92)',
  ink:           '#F0EFE9',
  inkMid:        '#8A8A82',
  inkFaint:      '#4A4A46',
  rule:          '#2A2A28',
  green:         '#22C55E',
  btnBg:         '#F0EFE9',
  btnFg:         '#111110',
  outlineFg:     '#8A8A82',
  outlineBorder: '#2A2A28',
  inputBorder:   '#2A2A28',
  inputFocus:    '#F0EFE9',
  scrollThumb:   '#2A2A28',
  marqueeItem:   '#3A3A36',
  marqueeDot:    '#2A2A28',
  skillBar:      '#F0EFE9',
  metricNum:     '#F0EFE9',
};

/* --- CONTEXT ---------------------------------------- */
interface ThemeCtx {
  dark: boolean;
  toggle: () => void;
  t: ThemeTokens;
}

const noop = () => undefined;

const ThemeContext = createContext<ThemeCtx>({
  dark: false,
  toggle: noop,
  t: LIGHT,
});

export const useTheme = () => useContext(ThemeContext);

/* --- PROVIDER --------------------------------------- */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('hk-theme');
      if (saved) return saved === 'dark';
    } catch {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggle = () =>
    setDark((d) => {
      const next = !d;
      try {
        localStorage.setItem('hk-theme', next ? 'dark' : 'light');
      } catch {
        return next;
      }
      return next;
    });

  // Apply to <html> for CSS var overrides
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.body.style.background = dark ? DARK.bg : LIGHT.bg;
    document.body.style.color = dark ? DARK.ink : LIGHT.ink;
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle, t: dark ? DARK : LIGHT }}>
      {children}
    </ThemeContext.Provider>
  );
};
