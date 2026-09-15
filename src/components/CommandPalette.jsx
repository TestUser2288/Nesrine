import { useEffect, useMemo, useRef, useState } from 'react';
import { nav, profile } from '../data/content';
import { useLockBody } from '../hooks/useInteractions';
import {
  Briefcase,
  Chart,
  CmdKey,
  Copy,
  Download,
  Grid,
  Home,
  Linkedin,
  Mail,
  Moon,
  Route,
  Search,
  Sun,
  User,
} from './icons';

const SECTION_ICONS = {
  profil: User,
  experience: Briefcase,
  projets: Grid,
  competences: Chart,
  parcours: Route,
};

const deburr = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Score de correspondance approximative : sous-séquence, insensible aux accents. */
function fuzzyScore(haystack, needle) {
  if (!needle) return 1;
  const text = deburr(haystack);
  const query = deburr(needle);

  if (text.includes(query)) return 100 - text.indexOf(query);

  let index = 0;
  let score = 0;
  for (const char of query) {
    const found = text.indexOf(char, index);
    if (found === -1) return 0;
    score += found === index ? 2 : 1;
    index = found + 1;
  }
  return score;
}

/**
 * Palette de commandes (Cmd+K / Ctrl+K) : navigation, actions rapides et
 * bascule de thème, pilotées entièrement au clavier.
 */
export default function CommandPalette({ open, onClose, theme, onToggleTheme, onToast }) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useLockBody(open);

  const commands = useMemo(() => {
    const go = (id) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return [
      {
        group: 'Navigation',
        id: 'top',
        label: 'Retour en haut',
        icon: Home,
        run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      },
      ...nav.map((item) => ({
        group: 'Navigation',
        id: item.id,
        label: `Aller à ${item.label}`,
        icon: SECTION_ICONS[item.id] ?? Grid,
        run: go(item.id),
      })),
      {
        group: 'Actions',
        id: 'contact',
        label: 'Aller au formulaire de contact',
        icon: Mail,
        run: go('contact'),
      },
      {
        group: 'Actions',
        id: 'copy',
        label: "Copier l'adresse email",
        icon: Copy,
        hint: profile.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            onToast?.('Adresse email copiée');
          } catch {
            onToast?.(profile.email);
          }
        },
      },
      {
        group: 'Actions',
        id: 'cv',
        label: 'Télécharger le CV (PDF)',
        icon: Download,
        run: () => window.open(profile.cv, '_blank', 'noopener'),
      },
      {
        group: 'Actions',
        id: 'linkedin',
        label: 'Ouvrir le profil LinkedIn',
        icon: Linkedin,
        run: () => window.open(profile.linkedin, '_blank', 'noopener'),
      },
      {
        group: 'Préférences',
        id: 'theme',
        label: theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre',
        icon: theme === 'dark' ? Sun : Moon,
        hint: 'T',
        run: onToggleTheme,
      },
    ];
  }, [theme, onToggleTheme, onToast]);

  const results = useMemo(
    () =>
      commands
        .map((command) => ({ command, score: fuzzyScore(command.label, query) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.command),
    [commands, query]
  );

  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    // Le focus doit attendre que la couche soit peinte.
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Garde la ligne sélectionnée visible pendant la navigation au clavier.
  useEffect(() => {
    listRef.current?.querySelector('.palette__item.is-active')?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const runAt = (index) => {
    const command = results[index];
    if (!command) return;
    onClose();
    // Laisse la couche se fermer avant de défiler ou d'ouvrir un onglet.
    setTimeout(() => command.run(), 60);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => (c + 1) % Math.max(1, results.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(1, results.length));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      runAt(cursor);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  let lastGroup = null;

  return (
    <div
      className="overlay overlay--palette"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Palette de commandes"
        onKeyDown={onKeyDown}
      >
        <div className="palette__search">
          <Search width="18" height="18" />
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            placeholder="Rechercher une section ou une action…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Rechercher une commande"
          />
          <kbd>Esc</kbd>
        </div>

        <div className="palette__list" ref={listRef}>
          {results.length === 0 ? (
            <p className="palette__empty">Aucun résultat pour « {query} »</p>
          ) : (
            results.map((command, index) => {
              const Icon = command.icon;
              const header = command.group !== lastGroup ? command.group : null;
              lastGroup = command.group;

              return (
                <div key={`${command.group}-${command.id}`}>
                  {header ? <p className="palette__group">{header}</p> : null}
                  <button
                    type="button"
                    className={`palette__item${index === cursor ? ' is-active' : ''}`}
                    onMouseEnter={() => setCursor(index)}
                    onClick={() => runAt(index)}
                  >
                    <span className="palette__item-icon">
                      <Icon width="16" height="16" />
                    </span>
                    {command.label}
                    {command.hint ? (
                      <span className="palette__item-hint">{command.hint}</span>
                    ) : null}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> naviguer
          </span>
          <span>
            <kbd>↵</kbd> ouvrir
          </span>
          <span>
            <CmdKey />
            <kbd>K</kbd> fermer
          </span>
        </div>
      </div>
    </div>
  );
}
