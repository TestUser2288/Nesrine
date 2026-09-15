import { useCallback, useEffect, useRef, useState } from 'react';

const finePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Attraction magnétique : l'élément suit le curseur dans un rayon donné,
 * puis revient à sa place. Désactivé au doigt et en mouvement réduit.
 */
export function useMagnetic(strength = 0.35, radius = 90) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !finePointer()) return undefined;

    let frame = 0;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (distance < radius + Math.max(rect.width, rect.height) / 2) {
          node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
        } else {
          node.style.transform = '';
        }
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.style.transform = '';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    node.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [strength, radius]);

  return ref;
}

/** Inclinaison 3D suivant la position du curseur sur l'élément. */
export function useTilt(max = 9) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !finePointer()) return undefined;

    let frame = 0;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform =
          `rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.style.transform = '';
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}

/** Projecteur : expose la position du curseur en variables CSS. */
export function useSpotlight() {
  const ref = useRef(null);

  const onMouseMove = useCallback((event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}

/**
 * Compteur animé, déclenché à l'entrée dans le viewport.
 * L'amortissement est une courbe ease-out cubique.
 */
export function useCountUp(target, { duration = 1600, start = false } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }

    let frame = 0;
    let startedAt = 0;

    const tick = (now) => {
      if (!startedAt) startedAt = now;
      const p = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value;
}

/** Gèle le défilement de la page tant qu'une couche modale est ouverte. */
export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.dataset.locked = 'true';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      delete document.body.dataset.locked;
      document.body.style.paddingRight = previous;
    };
  }, [locked]);
}

/**
 * FLIP : mémorise la position des cartes avant un changement de filtre,
 * puis anime l'écart entre l'ancienne et la nouvelle position. C'est ce
 * qui donne l'impression que les cartes glissent au lieu de sauter.
 */
export function useFlip(dependency) {
  const containerRef = useRef(null);
  const positions = useRef(new Map());

  // Mesure AVANT le rendu suivant.
  const capture = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    positions.current = new Map();
    for (const child of container.children) {
      const key = child.dataset.flipKey;
      if (key) positions.current.set(key, child.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || positions.current.size === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (const child of container.children) {
      const key = child.dataset.flipKey;
      const previous = key && positions.current.get(key);
      if (!previous) continue;

      const next = child.getBoundingClientRect();
      const dx = previous.left - next.left;
      const dy = previous.top - next.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;

      child.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0)` },
          { transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }
    positions.current = new Map();
  }, [dependency]);

  return { containerRef, capture };
}
