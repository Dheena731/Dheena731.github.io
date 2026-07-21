import { useEffect, useRef, useState } from 'react';

/**
 * A little CRT terminal character. Its eyes track the pointer, it blinks on a
 * loose timer, and it goes wide-eyed when you poke it.
 */
export default function Mascot({ size = 200 }) {
  const wrap = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [poked, setPoked] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist, 420) / 420;
      setLook({ x: (dx / dist) * 5.5 * reach, y: (dy / dist) * 4 * reach });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    let t;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, 2200 + Math.random() * 3600);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  const eyeH = blink ? 1.6 : poked ? 13 : 9;

  return (
    <div
      ref={wrap}
      data-hot
      onPointerDown={() => setPoked(true)}
      onPointerUp={() => setPoked(false)}
      onPointerLeave={() => setPoked(false)}
      className="floaty select-none"
      style={{ width: size, cursor: 'pointer' }}
      aria-hidden
    >
      <svg viewBox="0 0 120 128" width="100%" style={{ overflow: 'visible' }}>
        {/* antenna */}
        <line x1="60" y1="14" x2="60" y2="26" stroke="var(--line)" strokeWidth="3.5" />
        <circle
          cx="60"
          cy="10"
          r="5.5"
          fill="var(--orange)"
          stroke="var(--line)"
          strokeWidth="3"
          className="pulse-ring"
        />

        {/* shadow */}
        <rect x="14" y="30" width="96" height="76" fill="var(--line)" />

        {/* body */}
        <rect
          x="8"
          y="24"
          width="96"
          height="76"
          rx="4"
          fill="var(--card)"
          stroke="var(--line)"
          strokeWidth="3.5"
        />

        {/* screen */}
        <rect
          x="18"
          y="34"
          width="76"
          height="46"
          rx="2"
          fill="var(--ink)"
          stroke="var(--line)"
          strokeWidth="2.5"
        />

        {/* eyes */}
        <g transform={`translate(${look.x} ${look.y})`}>
          <rect x="36" y={57 - eyeH / 2} width="9" height={eyeH} rx="1" fill="var(--teal)" />
          <rect x="67" y={57 - eyeH / 2} width="9" height={eyeH} rx="1" fill="var(--teal)" />
        </g>

        {/* mouth */}
        <rect
          x={poked ? 52 : 48}
          y="70"
          width={poked ? 16 : 24}
          height={poked ? 7 : 3.5}
          rx="1.5"
          fill="var(--yellow)"
        />

        {/* screen glare */}
        <path d="M22 38 L38 38 L22 62 Z" fill="#fff" opacity="0.07" />

        {/* controls */}
        <circle cx="27" cy="90" r="4" fill="var(--orange)" stroke="var(--line)" strokeWidth="2.5" />
        <rect x="40" y="86.5" width="30" height="7" rx="3.5" fill="var(--paper-2)" stroke="var(--line)" strokeWidth="2.5" />
        <circle cx="85" cy="90" r="4" fill="var(--blue)" stroke="var(--line)" strokeWidth="2.5" />

        {/* legs */}
        <rect x="26" y="100" width="12" height="12" fill="var(--card)" stroke="var(--line)" strokeWidth="3.5" />
        <rect x="74" y="100" width="12" height="12" fill="var(--card)" stroke="var(--line)" strokeWidth="3.5" />
      </svg>
    </div>
  );
}
