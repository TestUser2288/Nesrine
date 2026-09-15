import { useCallback, useEffect, useState } from 'react';

const KEY = 'nb-theme';

function readStored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    // Navigation privée ou stockage bloqué : on retombe sur le réglage système.
    return null;
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Thème clair/sombre. Un choix explicite est mémorisé et estampillé sur
 * <html data-theme>, ce qui doit l'emporter sur la préférence système.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => readStored() || systemTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0e0d14' : '#ffffff');
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* stockage indisponible : le thème reste valable pour la session */
    }
  }, [theme]);

  // Suit le système tant que l'utilisateur n'a rien choisi lui-même.
  useEffect(() => {
    if (readStored()) return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setTheme(event.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
