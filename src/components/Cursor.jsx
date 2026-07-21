import { useEffect, useRef, useState } from 'react';

/**
 * Crosshair cursor with a trailing ring that snaps to a square over
 * interactive elements. Desktop pointers only — touch keeps the native cursor.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.body.classList.add('has-cursor');

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let hot = false;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const over = e.target instanceof Element
        ? e.target.closest('a, button, input, textarea, [data-hot]')
        : null;
      if (!!over !== hot) {
        hot = !!over;
        ring.current?.classList.toggle('is-hot', hot);
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onLeave = () => dot.current && (dot.current.style.opacity = '0');
    const onEnter = () => dot.current && (dot.current.style.opacity = '1');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        .cur-ring { transition: width .18s, height .18s, border-radius .18s, background-color .18s; }
        .cur-ring.is-hot {
          width: 42px; height: 42px;
          background-color: color-mix(in srgb, var(--orange) 18%, transparent);
          border-color: var(--orange);
        }
      `}</style>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ width: 6, height: 6, background: 'var(--orange)' }}
      />
      <div
        ref={ring}
        aria-hidden
        className="cur-ring pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 26,
          height: 26,
          border: '2px solid var(--ink)',
          background: 'transparent',
        }}
      />
    </>
  );
}
