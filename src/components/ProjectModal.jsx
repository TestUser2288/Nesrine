import { useEffect, useRef } from 'react';
import { useLockBody } from '../hooks/useInteractions';
import ProjectVisual from './ProjectVisual';
import { Check, Close } from './icons';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Fiche détaillée d'un projet, avec piège à focus et fermeture au clavier. */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const restoreTo = useRef(null);

  useLockBody(Boolean(project));

  useEffect(() => {
    if (!project) return undefined;
    restoreTo.current = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.querySelector(FOCUSABLE)?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;

      // Piège à focus : la tabulation boucle à l'intérieur de la fiche.
      const items = [...dialog.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      restoreTo.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="overlay overlay--modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
      >
        <div
          className="modal__visual"
          style={{
            '--visual': `linear-gradient(140deg, color-mix(in srgb, ${project.tone} 16%, var(--surface)) 0%, var(--surface) 78%)`,
          }}
        >
          <ProjectVisual project={project} />
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fermer">
            <Close width="18" height="18" />
          </button>
        </div>

        <div className="modal__body">
          <div>
            <span className="pill" style={{ marginBottom: 'var(--sp-12)' }}>
              {project.tagLabel}
            </span>
            <h2 className="modal__title" id="modal-title">
              {project.title}
            </h2>
            <p className="mono muted" style={{ marginTop: 6 }}>
              {project.context}
            </p>
          </div>

          <p className="lede">{project.summary}</p>

          <div>
            <p className="modal__section-label">Ce que contient le projet</p>
            <ul className="modal__list">
              {project.points.map((point) => (
                <li key={point.slice(0, 30)}>
                  <Check width="15" height="15" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal__grid">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="modal__metric-value" style={{ color: project.tone }}>
                  {metric.value}
                </p>
                <p className="modal__metric-label">{metric.label}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="modal__section-label">Stack technique</p>
            <ul className="panel__stack">
              {project.stack.map((tool) => (
                <li className="chip" key={tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
