import Reveal from './Reveal';

export default function SectionHead({ index, title, kicker, accentName = 'orange' }) {
  return (
    <Reveal>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b-[3px] pb-5">
        <div className="flex items-end gap-4">
          <span
            className="display grid h-12 w-12 shrink-0 place-items-center border-[3px] text-xl"
            style={{ background: `var(--${accentName})`, color: '#fff' }}
          >
            {index}
          </span>
          <div>
            {kicker && (
              <div className="label mb-1.5" style={{ color: 'var(--ink-soft)' }}>
                {kicker}
              </div>
            )}
            <h2 className="display text-4xl md:text-5xl">{title}</h2>
          </div>
        </div>
        <div
          aria-hidden
          className="hidden h-5 flex-1 min-w-24 border-2 sm:block"
          style={{
            background:
              'repeating-linear-gradient(45deg, var(--line) 0 5px, transparent 5px 10px)',
          }}
        />
      </div>
    </Reveal>
  );
}
