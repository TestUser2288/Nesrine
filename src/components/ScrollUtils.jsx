import { useScrollProgress } from '../hooks/useScrollState';
import { ArrowUp } from './icons';

/** Barre de progression de lecture, collée au haut de la fenêtre. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="progress" aria-hidden="true">
      <div className="progress__bar" style={{ '--p': progress }} />
    </div>
  );
}

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Bouton de retour en haut, cerclé de la même progression. */
export function BackToTop() {
  const progress = useScrollProgress();
  const shown = progress > 0.08;

  return (
    <button
      type="button"
      className={`to-top${shown ? ' is-shown' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Revenir en haut de la page"
      tabIndex={shown ? 0 : -1}
    >
      <svg className="to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="to-top__ring-track" cx="24" cy="24" r={RADIUS} />
        <circle
          className="to-top__ring-value"
          cx="24"
          cy="24"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp width="17" height="17" />
    </button>
  );
}
