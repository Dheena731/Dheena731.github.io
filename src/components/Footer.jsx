import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="px-5 py-10 md:px-8" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="display text-2xl">{profile.name}</div>
          <div className="label mt-2" style={{ color: 'var(--yellow)' }}>
            {profile.subtitle}
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="sticker lift"
            style={{ background: 'transparent', color: 'var(--paper)' }}
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="sticker lift"
            style={{ background: 'transparent', color: 'var(--paper)' }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="sticker lift"
            style={{ background: 'transparent', color: 'var(--paper)' }}
          >
            Email
          </a>
        </div>
      </div>

      <div
        className="label mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t-2 pt-6"
        style={{ borderColor: 'var(--ink-soft)', color: 'var(--ink-soft)' }}
      >
        <span>© {new Date().getFullYear()} — built with React, Vite &amp; too much coffee</span>
        <a href="#top" className="hover:underline">
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
