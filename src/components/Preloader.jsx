import { useEffect, useState } from 'react';
import { profile } from '../data/content';

/** Au-delà de ce délai, on n'attend plus la fenêtre : la page est montrée. */
const MAX_WAIT = 1400;

/**
 * Préchargeur : progresse par paliers irréguliers, plafonné à 90 % tant que
 * la fenêtre n'a pas fini de charger. L'état de chargement est relu à chaque
 * tick (plutôt qu'écouté une seule fois) pour ne jamais rester bloqué si
 * l'évènement `load` est passé avant le montage du composant.
 */
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();

    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) return 100;
        const complete =
          document.readyState === 'complete' || performance.now() - startedAt > MAX_WAIT;
        const ceiling = complete ? 100 : 90;
        const step = current < 60 ? 16 : 9;
        return Math.min(ceiling, current + Math.random() * step);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return undefined;
    const timer = setTimeout(() => {
      setDone(true);
      onDone?.();
    }, 220);
    return () => clearTimeout(timer);
  }, [progress, onDone]);

  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden={done}>
      <div className="loader__inner">
        <span className="loader__mark">{profile.initial}</span>
        <div className="loader__track">
          <div className="loader__fill" style={{ '--p': `${progress}%` }} />
        </div>
        <span className="loader__count">{String(Math.round(progress)).padStart(3, '0')} %</span>
      </div>
    </div>
  );
}
