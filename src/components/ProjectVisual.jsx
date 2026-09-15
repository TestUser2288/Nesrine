/**
 * Motif d'en-tête génératif — volontairement abstrait : pas d'axes, pas de
 * courbe de performance, pour ne jamais suggérer des résultats chiffrés qui
 * ne figurent pas au dossier. La variante est dérivée de l'identifiant.
 */
export default function ProjectVisual({ project, variant }) {
  const tone = project.tone;
  const kind = variant ?? project.id.length % 3;

  return (
    <svg
      viewBox="0 0 480 270"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {/* Trame de points commune aux trois variantes */}
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => (
          <circle
            key={`d-${row}-${col}`}
            cx={24 + col * 33}
            cy={30 + row * 34}
            r="1.7"
            fill={tone}
            fillOpacity={0.26 - row * 0.03}
          />
        ))
      )}

      {kind === 0 &&
        Array.from({ length: 6 }, (_, ring) => (
          <circle
            key={`r-${ring}`}
            cx="392"
            cy="46"
            r={30 + ring * 32}
            fill="none"
            stroke={tone}
            strokeOpacity={0.24 - ring * 0.03}
            strokeWidth="1.6"
          />
        ))}

      {kind === 1 &&
        Array.from({ length: 9 }, (_, index) => (
          <rect
            key={`b-${index}`}
            x={300 + index * 20}
            y={210 - (index % 4) * 34 - 26}
            width="11"
            height={(index % 4) * 34 + 30}
            rx="5"
            fill={tone}
            fillOpacity={0.16 + (index % 4) * 0.05}
          />
        ))}

      {kind === 2 && (
        <>
          <path
            d="M296 186 C 330 186, 336 108, 368 108 S 412 58, 452 44"
            fill="none"
            stroke={tone}
            strokeOpacity="0.5"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M296 210 C 336 210, 344 150, 380 150 S 424 104, 452 96"
            fill="none"
            stroke={tone}
            strokeOpacity="0.22"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
