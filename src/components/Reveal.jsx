import { useReveal } from '../hooks/useReveal';

/**
 * Enveloppe un bloc dans une apparition au défilement.
 * `delay` est exprimé en millisecondes et cascade les éléments d'une grille.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, ...rest }) {
  const { ref, isVisible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    />
  );
}
