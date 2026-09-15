import { useEffect, useRef, useState } from 'react';

/**
 * Révèle un bloc à l'entrée dans le viewport.
 * Fade + translation courte, jamais de ressort : le mouvement doit rester
 * lent et pondéré (cubic-bezier(0.625, 0.05, 0, 1)).
 */
export function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}
