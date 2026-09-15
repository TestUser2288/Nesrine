import { useCallback, useEffect, useState } from 'react';
import About from './components/About';
import CommandPalette from './components/CommandPalette';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Preloader from './components/Preloader';
import Projects from './components/Projects';
import { BackToTop, ScrollProgress } from './components/ScrollUtils';
import Skills from './components/Skills';
import { ToastProvider, useToast } from './components/Toasts';
import { useLockBody } from './hooks/useInteractions';
import { useTheme } from './hooks/useTheme';

const TYPING = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

function AppShell() {
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const toast = useToast();

  useLockBody(!ready);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // Raccourcis globaux : Cmd/Ctrl+K ouvre la palette, T bascule le thème.
  useEffect(() => {
    const onKeyDown = (event) => {
      const typing = TYPING.has(event.target?.tagName) || event.target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }

      if (!typing && !event.metaKey && !event.ctrlKey && event.key.toLowerCase() === 't') {
        toggle();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />

      <a className="skip-link" href="#profil">
        Aller au contenu
      </a>

      <Nav theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Expertise />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        theme={theme}
        onToggleTheme={toggle}
        onToast={toast}
      />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  );
}
