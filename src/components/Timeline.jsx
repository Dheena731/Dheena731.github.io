import { useEffect, useRef, useState } from 'react';
import { experience } from '../data/profile';
import SectionHead from './SectionHead';
import Reveal from './Reveal';

/** Vertical PCB trace that fills as the section scrolls past. */
function Trace({ progress }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-1.5 md:block"
      style={{ background: 'var(--paper-2)', border: '2px solid var(--line)' }}
    >
      <div
        className="w-full"
        style={{
          height: `${progress * 100}%`,
          background:
            'repeating-linear-gradient(180deg, var(--orange) 0 8px, var(--yellow) 8px 16px)',
          transition: 'height .12s linear',
        }}
      />
    </div>
  );
}

function Node({ accentName, current }) {
  return (
    <div className="relative z-10 shrink-0">
      <div
        className={`grid h-14 w-14 place-items-center border-[3px] ${current ? 'pulse-ring' : ''}`}
        style={{ background: `var(--${accentName})` }}
      >
        <div
          className="h-4 w-4 rounded-full border-2"
          style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
        />
      </div>
    </div>
  );
}

function Job({ job }) {
  const [open, setOpen] = useState(job.current ?? false);

  return (
    <Reveal>
      <div className="flex gap-5 md:gap-7">
        <Node accentName={job.accent} current={job.current} />

        <div className="panel lift min-w-0 flex-1">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-start justify-between gap-4 border-b-2 p-5 text-left"
            style={{ background: 'var(--paper-2)' }}
          >
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span
                  className="sticker"
                  style={{ background: `var(--${job.accent})`, color: '#fff' }}
                >
                  {job.period}
                </span>
                {job.current && (
                  <span className="sticker" style={{ background: 'var(--teal)', color: '#0b0b08' }}>
                    ● Current
                  </span>
                )}
              </div>
              <h3 className="display text-2xl md:text-[1.75rem]">{job.company}</h3>
              <p className="mt-1 text-[0.95rem]" style={{ color: 'var(--ink-soft)' }}>
                {job.role}
              </p>
            </div>
            <span
              className="display grid h-9 w-9 shrink-0 place-items-center border-2 text-xl leading-none"
              style={{ background: 'var(--card)' }}
            >
              {open ? '−' : '+'}
            </span>
          </button>

          <div className="p-5">
            <div className="label mb-3 flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--ink-soft)' }}>
              <span>▣ {job.product}</span>
              <span>◎ {job.location}</span>
            </div>
            <p className="text-[0.98rem] leading-relaxed">{job.summary}</p>

            <div
              className="grid transition-[grid-template-rows,opacity] duration-300"
              style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <ul className="mt-5 space-y-3 border-t-2 pt-5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-[7px] h-2 w-2 shrink-0"
                        style={{ background: `var(--${job.accent})` }}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t-2 pt-4">
              {job.stack.map((s) => (
                <span key={s} className="sticker" style={{ boxShadow: 'none' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight * 0.4;
      const seen = innerHeight * 0.6 - r.top;
      setProgress(Math.max(0, Math.min(1, total > 0 ? seen / total : 0)));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="work" className="border-b-[3px] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHead index="01" kicker="Where I've shipped" title="Experience" accentName="orange" />
        <div ref={ref} className="relative space-y-8">
          <Trace progress={progress} />
          {experience.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
