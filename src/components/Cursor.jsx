import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, .chip, .tab, .filter';

/**
 * Curseur maison : un point qui colle au pointeur et un anneau qui le suit
 * avec un amortissement (interpolation linéaire à chaque frame). L'anneau
 * grossit au survol des éléments interactifs.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pointer };
    let frame = 0;

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      // Amortissement : l'anneau rattrape 18 % de l'écart par frame.
      ringPos.x += (pointer.x - ringPos.x) * 0.18;
      ringPos.y += (pointer.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    const onOver = (event) => {
      ring.classList.toggle('is-hot', Boolean(event.target.closest?.(INTERACTIVE)));
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    frame = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
