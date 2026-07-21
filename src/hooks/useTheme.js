import { useCallback, useEffect, useState } from 'react';

const KEY = 'dt-theme';

/** 'paper' (light) | 'crt' (dark). Persisted, falls back to system preference. */
export function useTheme() {
  const [theme, setTheme] = useState('paper');

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === 'paper' || saved === 'crt') {
      setTheme(saved);
      return;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('crt');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('crt', theme === 'crt');
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'crt' ? 'paper' : 'crt')), []);

  return { theme, toggle };
}
