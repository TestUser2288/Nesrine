import { useRef, useState } from 'react';

/**
 * Barres horizontales — une série par carte, donc une seule couleur par
 * graphique (la longueur porte la magnitude, la teinte porte l'identité du
 * groupe). Les valeurs sont étiquetées en clair : la teinte aqua passe sous
 * 3:1 sur fond blanc et la règle de secours impose un libellé lisible.
 */
export default function ProficiencyChart({ title, subtitle, tone, items }) {
  const [tip, setTip] = useState(null);
  const root = useRef(null);

  const showTip = (event, item) => {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    const target = event.currentTarget.getBoundingClientRect();
    setTip({
      label: item.label,
      value: item.value,
      x: event.clientX - bounds.left,
      y: target.top - bounds.top,
    });
  };

  return (
    <div className="viz" ref={root}>
      <div className="viz__head">
        <div>
          <h3 className="viz__title">{title}</h3>
          {subtitle ? <p className="viz__subtitle">{subtitle}</p> : null}
        </div>
      </div>

      <div className="bars">
        {items.map((item, index) => (
          <div
            className="bar-row"
            key={item.label}
            onMouseEnter={(event) => showTip(event, item)}
            onMouseMove={(event) => showTip(event, item)}
            onMouseLeave={() => setTip(null)}
          >
            <div className="bar-row__head">
              <span className="bar-row__label">{item.label}</span>
              <span className="bar-row__value">{item.value}</span>
            </div>
            <div className="bar-row__track">
              <div
                className="bar-row__fill"
                style={{
                  '--value': `${item.value}%`,
                  '--series': tone,
                  '--bar-delay': `${index * 70}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {tip ? (
        <div className="viz__tooltip" style={{ left: tip.x, top: tip.y }}>
          <strong>{tip.label}</strong> <span>· {tip.value} / 100</span>
        </div>
      ) : null}

      {/* Équivalent tabulaire pour lecteurs d'écran et impression. */}
      <table className="sr-only">
        <caption>{title} — niveau de maîtrise sur 100</caption>
        <thead>
          <tr>
            <th scope="col">Compétence</th>
            <th scope="col">Niveau</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
