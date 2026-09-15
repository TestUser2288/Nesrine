import { useRef, useState } from 'react';

const SIZE = { w: 440, h: 360, cx: 220, cy: 170, r: 112 };
const RINGS = [0.25, 0.5, 0.75, 1];

/** Coordonnées d'un point : l'axe 0 pointe vers le haut, sens horaire. */
function point(index, total, ratio) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: SIZE.cx + Math.cos(angle) * SIZE.r * ratio,
    y: SIZE.cy + Math.sin(angle) * SIZE.r * ratio,
  };
}

function polygon(total, ratio) {
  return Array.from({ length: total }, (_, index) => {
    const { x, y } = point(index, total, ratio);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

/** Coupe un libellé long en deux lignes pour éviter le chevauchement. */
function wrap(label) {
  if (label.length <= 16) return [label];
  const words = label.split(' ');
  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(' '), words.slice(middle).join(' ')];
}

/**
 * Radar à série unique : une seule teinte, aucune identité à distinguer.
 * Anneaux et rayons en filets discrets, marqueurs cerclés de la surface.
 */
export default function DomainRadar({ domains, title, subtitle }) {
  const [tip, setTip] = useState(null);
  const [hovered, setHovered] = useState(null);
  const root = useRef(null);

  const total = domains.length;
  const shape = domains
    .map((domain, index) => {
      const { x, y } = point(index, total, domain.value / 100);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const showTip = (event, domain, position) => {
    const bounds = root.current?.getBoundingClientRect();
    const svgBounds = event.currentTarget.ownerSVGElement.getBoundingClientRect();
    if (!bounds) return;
    const scale = svgBounds.width / SIZE.w;
    setTip({
      label: domain.label,
      value: domain.value,
      x: svgBounds.left - bounds.left + position.x * scale,
      y: svgBounds.top - bounds.top + position.y * scale,
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

      <div className="radar">
        <svg viewBox={`0 0 ${SIZE.w} ${SIZE.h}`} role="img" aria-label={title}>
          {RINGS.map((ring) => (
            <polygon className="radar__grid" key={ring} points={polygon(total, ring)} />
          ))}

          {domains.map((domain, index) => {
            const edge = point(index, total, 1);
            return (
              <line
                className="radar__spoke"
                key={domain.label}
                x1={SIZE.cx}
                y1={SIZE.cy}
                x2={edge.x}
                y2={edge.y}
              />
            );
          })}

          <text className="radar__ring-label" x={SIZE.cx + 4} y={SIZE.cy - SIZE.r + 12}>
            100
          </text>
          <text className="radar__ring-label" x={SIZE.cx + 4} y={SIZE.cy - SIZE.r / 2 + 12}>
            50
          </text>

          <polygon className="radar__area" points={shape} />

          {domains.map((domain, index) => {
            const position = point(index, total, domain.value / 100);
            return (
              <g key={domain.label}>
                <circle
                  className="radar__marker"
                  cx={position.x}
                  cy={position.y}
                  r={hovered === index ? 7 : 5}
                />
                <circle
                  className="radar__hit"
                  cx={position.x}
                  cy={position.y}
                  r="16"
                  onMouseEnter={(event) => {
                    setHovered(index);
                    showTip(event, domain, position);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setTip(null);
                  }}
                />
              </g>
            );
          })}

          {domains.map((domain, index) => {
            const anchorPoint = point(index, total, 1);
            const dx = anchorPoint.x - SIZE.cx;
            const anchor = Math.abs(dx) < 12 ? 'middle' : dx > 0 ? 'start' : 'end';
            const offsetX = Math.abs(dx) < 12 ? 0 : dx > 0 ? 14 : -14;
            const offsetY = anchorPoint.y < SIZE.cy ? -12 : 20;
            const lines = wrap(domain.label);

            return (
              <text
                className="radar__axis-label"
                key={domain.label}
                x={anchorPoint.x + offsetX}
                y={anchorPoint.y + offsetY}
                textAnchor={anchor}
              >
                {lines.map((line, lineIndex) => (
                  <tspan
                    key={line}
                    x={anchorPoint.x + offsetX}
                    dy={lineIndex === 0 ? 0 : 13}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
        </svg>
      </div>

      {tip ? (
        <div className="viz__tooltip" style={{ left: tip.x, top: tip.y }}>
          <strong>{tip.label}</strong> <span>· {tip.value} / 100</span>
        </div>
      ) : null}

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Domaine</th>
            <th scope="col">Niveau sur 100</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <tr key={domain.label}>
              <th scope="row">{domain.label}</th>
              <td>{domain.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
