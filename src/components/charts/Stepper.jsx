const TONES = {
  formation: { color: 'var(--series-2)', label: 'Formation' },
  experience: { color: 'var(--series-1)', label: 'Expérience' },
};

/**
 * Frise des jalons. Les étapes sont équidistantes — chaque jalon porte sa
 * date, la frise ne prétend donc pas être une échelle de temps continue.
 * Deux teintes seulement (formation / expérience), doublées par la légende.
 */
export default function Stepper({ items, title, subtitle }) {
  return (
    <div className="viz">
      <div className="viz__head">
        <div>
          <h3 className="viz__title">{title}</h3>
          {subtitle ? <p className="viz__subtitle">{subtitle}</p> : null}
        </div>
      </div>

      {/* Version horizontale : trois rangées de grille partagées. */}
      <div className="stepper stepper--horizontal" style={{ '--cols': items.length }}>
        <span className="stepper__rail" aria-hidden="true" />

        {items.map((item) => (
          <span className="stepper__year" key={`year-${item.label}`}>
            {item.year}
          </span>
        ))}

        {/* La colonne est explicite : le rail occupe déjà toute la rangée 2,
            l'auto-placement enverrait les pastilles dans des colonnes fantômes. */}
        {items.map((item, index) => (
          <span
            className="stepper__dot-cell"
            key={`dot-${item.label}`}
            style={{ gridColumn: index + 1 }}
          >
            <span className="stepper__dot" style={{ '--dot': TONES[item.kind].color }} />
          </span>
        ))}

        {items.map((item) => (
          <span className="stepper__text" key={`text-${item.label}`}>
            <span className="stepper__label">{item.label}</span>
            <span className="stepper__meta">{item.meta}</span>
          </span>
        ))}
      </div>

      {/* Version empilée sous 900px. */}
      <ol className="stepper stepper--stacked">
        {items.map((item) => (
          <li className="stepper__item" key={`stacked-${item.label}`}>
            <span className="stepper__item-dot" style={{ '--dot': TONES[item.kind].color }} />
            <span className="stepper__item-body">
              <span className="stepper__year">{item.year}</span>
              <span className="stepper__label">{item.label}</span>
              <span className="stepper__meta">{item.meta}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="viz__legend">
        {Object.values(TONES).map((tone) => (
          <span className="viz__legend-item" key={tone.label}>
            <span className="viz__legend-swatch" style={{ '--swatch': tone.color }} />
            {tone.label}
          </span>
        ))}
      </div>
    </div>
  );
}
