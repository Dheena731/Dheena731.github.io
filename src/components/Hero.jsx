import { profile } from '../data/profile';
import DotMatrix from './DotMatrix';
import Mascot from './Mascot';
import Reveal from './Reveal';

function Stat({ value, label, accentName, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="panel lift h-full px-4 py-3.5">
        <div
          className="display text-4xl md:text-[2.6rem]"
          style={{ color: `var(--${accentName})` }}
        >
          {value}
        </div>
        <div className="label mt-2 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {label}
        </div>
      </div>
    </Reveal>
  );
}

export default function Hero() {
  return (
    <section id="top" className="dotgrid relative overflow-hidden border-b-[3px]">
      {/* corner decor */}
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-56 w-56 rotate-12 border-[3px] opacity-[0.13] md:h-80 md:w-80"
        style={{ background: 'var(--blue)' }}
      />
      <div
        aria-hidden
        className="absolute -left-24 bottom-10 h-44 w-44 -rotate-6 rounded-full border-[3px] opacity-[0.1]"
        style={{ background: 'var(--orange)' }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span
                className="sticker inline-flex items-center gap-2"
                style={{ background: 'var(--teal)', color: '#0b0b08' }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: '#0b0b08' }}
                />
                Open to opportunities
              </span>
              <span className="sticker">📍 {profile.location}</span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="display text-[3.4rem] leading-[0.85] sm:text-[4.6rem] md:text-[5.6rem]">
              <span className="block">Dhinakaran</span>
              <span className="block outline-type">Thangaraj</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 max-w-[26rem]">
              <DotMatrix words={profile.rotatingTitles} />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <p
              className="mt-7 max-w-xl text-[1.02rem] leading-relaxed md:text-[1.1rem]"
              style={{ color: 'var(--ink-soft)' }}
            >
              {profile.blurb}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="panel lift label px-6 py-3.5 text-[12px]"
                style={{ background: 'var(--orange)', color: '#fff' }}
              >
                See the work →
              </a>
              <a
                href="#terminal"
                className="panel lift label px-6 py-3.5 text-[12px]"
              >
                $ open terminal
              </a>
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noreferrer"
                className="panel lift label px-6 py-3.5 text-[12px]"
                style={{ background: 'var(--yellow)', color: '#16150f' }}
              >
                Résumé ↗
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: mascot on a plinth */}
        <Reveal delay={200} className="hidden justify-self-center lg:block">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 translate-x-5 translate-y-5 border-[3px]"
              style={{ background: 'var(--purple)', opacity: 0.16 }}
            />
            <div className="panel-lg blueprint px-10 py-9">
              <Mascot size={210} />
              <div
                className="label mt-6 border-t-2 pt-3 text-center"
                style={{ color: 'var(--ink-soft)' }}
              >
                sys.status — online
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* stat strip */}
      <div className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} accentName={s.accent} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
