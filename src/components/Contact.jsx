import { profile } from '../data/profile';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import Mascot from './Mascot';

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: 'orange',
    icon: '✉',
  },
  {
    label: 'LinkedIn',
    value: 'dhinakaran-thangaraj',
    href: profile.linkedin,
    accent: 'blue',
    icon: 'in',
  },
  {
    label: 'GitHub',
    value: profile.handle,
    href: profile.github,
    accent: 'purple',
    icon: '⌥',
  },
  {
    label: 'Résumé',
    value: 'Download PDF',
    href: profile.resume,
    accent: 'teal',
    icon: '↓',
    local: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="blueprint border-b-[3px] px-5 py-16 md:px-8 md:py-24"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead index="06" kicker="The part that matters" title="Get in touch" accentName="red" />

        <Reveal>
          <div className="panel-lg mb-6 flex flex-col items-center gap-7 p-8 text-center md:flex-row md:p-10 md:text-left">
            <div className="shrink-0">
              <Mascot size={140} />
            </div>
            <div>
              <h3 className="display text-3xl leading-tight md:text-4xl">
                Hiring for AI/ML?
                <br />
                <span style={{ color: 'var(--orange)' }}>Let's talk.</span>
              </h3>
              <p className="mt-4 max-w-lg text-[1rem] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                I'm open to roles in applied AI — LLM systems, agentic pipelines, RAG, and anywhere
                security meets machine learning. Fastest way to reach me is email.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="panel lift label mt-6 inline-block px-6 py-3.5 text-[12px]"
                style={{ background: 'var(--orange)', color: '#fff' }}
              >
                ✉ {profile.email}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 70}>
              <a
                href={l.local ? import.meta.env.BASE_URL + l.href : l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="panel lift flex h-full flex-col p-5"
              >
                <span
                  className="display grid h-11 w-11 place-items-center border-[2.5px] text-lg"
                  style={{ background: `var(--${l.accent})`, color: '#fff' }}
                >
                  {l.icon}
                </span>
                <span className="label mt-4" style={{ color: 'var(--ink-soft)' }}>
                  {l.label}
                </span>
                <span className="mt-1 break-all text-[0.92rem] font-medium">{l.value}</span>
                <span className="label mt-auto pt-4" style={{ color: `var(--${l.accent})` }}>
                  open ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
