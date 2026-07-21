import { useRef, useState } from 'react';
import { projects } from '../data/profile';
import SectionHead from './SectionHead';
import Reveal from './Reveal';

/** Trading card: tilts toward the pointer, flips on click for the detail side. */
function Card({ project }) {
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 11, y: px * 13 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <Reveal>
      <div style={{ perspective: '1200px' }}>
        <div
          ref={ref}
          data-hot
          onPointerMove={onMove}
          onPointerLeave={reset}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          className="relative h-[23rem] w-full outline-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? tilt.y + 180 : tilt.y}deg)`,
            transition: 'transform .55s cubic-bezier(.2,.7,.2,1)',
          }}
        >
          {/* FRONT */}
          <div
            className="panel-lg absolute inset-0 flex flex-col overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div
              className="flex items-center justify-between border-b-[3px] px-4 py-2.5"
              style={{ background: `var(--${project.accent})` }}
            >
              <span className="label text-white">{project.tag}</span>
              <span className="label text-white">{project.year}</span>
            </div>

            <div className="dotgrid flex flex-1 flex-col p-5">
              <h3 className="display text-[1.7rem] leading-none">{project.title}</h3>
              <p
                className="mt-4 flex-1 text-[0.95rem] leading-relaxed"
                style={{ color: 'var(--ink-soft)' }}
              >
                {project.blurb}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t-2 pt-4">
                {project.metrics.map((m) => (
                  <div key={m.k}>
                    <div
                      className="display text-[1.05rem] leading-tight"
                      style={{ color: `var(--${project.accent})` }}
                    >
                      {m.v}
                    </div>
                    <div className="label mt-0.5 text-[9px]" style={{ color: 'var(--ink-soft)' }}>
                      {m.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="label flex items-center justify-between border-t-[3px] px-4 py-2.5"
              style={{ background: 'var(--paper-2)', color: 'var(--ink-soft)' }}
            >
              <span>{project.stack.length} technologies</span>
              <span>flip ↻</span>
            </div>
          </div>

          {/* BACK */}
          <div
            className="panel-lg absolute inset-0 flex flex-col overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div
              className="flex items-center justify-between border-b-[3px] px-4 py-2.5"
              style={{ background: 'var(--ink)' }}
            >
              <span className="label" style={{ color: 'var(--paper)' }}>
                ▶ Details
              </span>
              <span className="label" style={{ color: `var(--${project.accent})` }}>
                {project.id}
              </span>
            </div>

            <div className="blueprint flex flex-1 flex-col p-5">
              <p className="text-[0.95rem] leading-relaxed">{project.detail}</p>

              <div className="mt-auto border-t-2 pt-4">
                <div className="label mb-2.5" style={{ color: 'var(--ink-soft)' }}>
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="sticker"
                      style={{ boxShadow: 'none', background: 'var(--paper-2)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="label flex items-center justify-between border-t-[3px] px-4 py-2.5"
              style={{ background: 'var(--paper-2)', color: 'var(--ink-soft)' }}
            >
              <span>{project.title}</span>
              <span>↻ back</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-b-[3px] px-5 py-16 md:px-8 md:py-24"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="02"
          kicker="Click any card to flip it"
          title="Projects"
          accentName="blue"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
