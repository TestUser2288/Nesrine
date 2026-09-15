import Reveal from './Reveal';

/**
 * En-tête de section : numéro, libellé, titre dont le mot de chute porte
 * l'accent de marque, puis un chapô optionnel.
 */
export default function SectionHeading({ num, label, lead, accent, tail, lede }) {
  return (
    <div className="head">
      <Reveal className="head__top">
        <span className="head__num">{num}</span>
        <span className="eyebrow">{label}</span>
      </Reveal>

      <Reveal delay={90}>
        <h2 className="head__title h2">
          {lead} <span className="hl">{accent}</span>
          {tail}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={150}>
          <p className="head__lede lede">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
