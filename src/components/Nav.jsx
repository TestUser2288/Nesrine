import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { nav, profile } from '../data/content';
import { useActiveSection, useScrolled } from '../hooks/useScrollState';
import { CmdKey, Moon, Sun } from './icons';

const sectionIds = nav.map((item) => item.id);

export default function Nav({ theme, onToggleTheme, onOpenPalette }) {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0, shown: false });
  const listRef = useRef(null);

  // Mesure la position du lien actif pour y faire glisser la pastille.
  const movePill = useCallback(() => {
    const list = listRef.current;
    const current = list?.querySelector('.nav__link.is-active');
    if (!list || !current) {
      setPill((p) => ({ ...p, shown: false }));
      return;
    }
    const listBox = list.getBoundingClientRect();
    const box = current.getBoundingClientRect();
    setPill({ x: box.left - listBox.left, w: box.width, shown: true });
  }, []);

  useLayoutEffect(() => {
    movePill();
  }, [active, movePill]);

  useEffect(() => {
    window.addEventListener('resize', movePill);
    return () => window.removeEventListener('resize', movePill);
  }, [movePill]);

  // Le tiroir mobile ne doit pas survivre au passage en grand écran.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1041px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const className = ['nav', scrolled ? 'is-scrolled' : '', open ? 'is-open' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={className}>
      <div className="container">
        <div className="nav__inner">
          <a className="brand" href="#top" aria-label={`${profile.name} — retour en haut`}>
            <span className="brand__mark" aria-hidden="true">
              {profile.initial}
            </span>
            {profile.firstName}
          </a>

          <nav className="nav__links" ref={listRef} aria-label="Navigation principale">
            <span
              className="nav__pill"
              aria-hidden="true"
              style={{
                transform: `translateX(${pill.x}px)`,
                width: `${pill.w}px`,
                opacity: pill.shown ? 1 : 0,
              }}
            />
            {nav.map((item) => (
              <a
                key={item.id}
                className={`nav__link${active === item.id ? ' is-active' : ''}`}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="kbd-hint"
              onClick={onOpenPalette}
              aria-label="Ouvrir la palette de commandes"
            >
              <CmdKey />
              <kbd>K</kbd>
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? <Sun width="17" height="17" /> : <Moon width="17" height="17" />}
            </button>

            <a className="btn btn--brand btn--sm nav__cta" href="#contact">
              Me contacter
            </a>

            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="nav__burger" />
            </button>
          </div>
        </div>

        <nav className="nav__drawer" aria-label="Navigation mobile">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Me contacter
          </a>
        </nav>
      </div>
    </header>
  );
}
