import { education, publication, languages, profile } from '../data/profile';
import SectionHead from './SectionHead';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="border-b-[3px] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="05" kicker="The paperwork" title="Background" accentName="yellow" />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* left: story + education */}
          <div className="space-y-6">
            <Reveal>
              <div className="panel p-6 md:p-7">
                <div className="label mb-3" style={{ color: 'var(--ink-soft)' }}>
                  ▸ readme.md
                </div>
                <div className="space-y-4 text-[1rem] leading-relaxed">
                  <p>
                    I came out of an AI &amp; Data Science degree wanting to build models. I ended up
                    somewhere more interesting: making AI do the parts of security compliance that
                    people quietly dread.
                  </p>
                  <p>
                    At <strong>SQ1 Cybersecurity Solutions</strong> I'm part of the team building a{' '}
                    GRC compliance platform. The problems are unusually concrete — can an agent
                    read a policy, find the evidence that proves a control is met, and justify its
                    answer well enough that a human auditor signs off? That question covers
                    retrieval, evaluation, agent design and a lot of unglamorous plumbing.
                  </p>
                  <p>
                    Before that: computer vision on a factory floor at Krishtec, fine-tuning small
                    language models on legal contracts, and a manufacturing internship at Lenovo that
                    taught me how real production lines actually work.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 80}>
                  <div className="panel lift h-full p-5">
                    <div
                      className="sticker mb-3"
                      style={{ background: `var(--${e.accent})`, color: '#fff' }}
                    >
                      {e.period}
                    </div>
                    <h3 className="display text-[1.15rem] leading-tight">{e.degree}</h3>
                    <p className="mt-2 text-[0.92rem]" style={{ color: 'var(--ink-soft)' }}>
                      {e.school}
                      <br />
                      {e.place}
                    </p>
                    <div
                      className="display mt-4 border-t-2 pt-3 text-2xl"
                      style={{ color: `var(--${e.accent})` }}
                    >
                      {e.score}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: publication, languages, now */}
          <div className="space-y-6">
            <Reveal delay={60}>
              <a
                href={publication.url}
                target="_blank"
                rel="noreferrer"
                className="panel lift block p-6"
                style={{ background: 'var(--ink)', color: 'var(--paper)' }}
              >
                <div className="label mb-3" style={{ color: 'var(--yellow)' }}>
                  ▸ published research
                </div>
                <h3 className="display text-2xl leading-tight">{publication.title}</h3>
                <p className="mt-3 text-[0.92rem] opacity-75">
                  {publication.journal} · {publication.date}
                </p>
                <p className="mt-3 text-[0.85rem] opacity-60">
                  {publication.authors.join(', ')}
                </p>
                <div
                  className="label mt-5 border-t-2 pt-3"
                  style={{ borderColor: 'var(--ink-soft)', color: 'var(--teal)' }}
                >
                  DOI {publication.doi} ↗
                </div>
              </a>
            </Reveal>

            <Reveal delay={120}>
              <div className="panel p-6">
                <div className="label mb-4" style={{ color: 'var(--ink-soft)' }}>
                  ▸ currently
                </div>
                <ul className="space-y-3 text-[0.95rem]">
                  {[
                    ['Building', 'AI agents for GRC auditing at SQ1'],
                    ['Learning', 'evaluation methods for agentic pipelines'],
                    ['Based in', profile.location],
                  ].map(([k, v]) => (
                    <li key={k} className="flex gap-3">
                      <span className="label w-20 shrink-0 pt-0.5" style={{ color: 'var(--orange)' }}>
                        {k}
                      </span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="panel p-6">
                <div className="label mb-4" style={{ color: 'var(--ink-soft)' }}>
                  ▸ languages
                </div>
                <div className="space-y-3">
                  {languages.map((l) => (
                    <div key={l.name} className="flex items-center justify-between gap-4">
                      <span className="display text-lg">{l.name}</span>
                      <span className="sticker" style={{ boxShadow: 'none' }}>
                        {l.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
