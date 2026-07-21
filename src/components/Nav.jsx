import { useEffect, useState } from 'react';
import { SECTIONS } from '../lib/util';
import { profile } from '../data/profile';

export default function Nav({ theme, onToggleTheme }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? (scrollY / max) * 100 : 0);

      let current = '';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= innerHeight * 0.35) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="flex items-stretch justify-between border-b-[3px] backdrop-blur-md"
        style={{ background: 'color-mix(in srgb, var(--paper) 88%, transparent)' }}
      >
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5 border-r-[3px] px-4 py-3 md:px-5"
        >
          <span
            className="grid h-8 w-8 shrink-0 place-items-center border-2 text-[13px] font-black transition-transform duration-200 group-hover:-rotate-12"
            style={{ background: 'var(--orange)', color: '#fff' }}
          >
            DT
          </span>
          <span className="hidden leading-none sm:block">
            <span className="display block text-[15px]">{profile.name}</span>
            <span className="label mt-1 block" style={{ color: 'var(--ink-soft)' }}>
              {profile.role}
            </span>
          </span>
        </a>

        <div className="hidden flex-1 items-stretch lg:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="label relative grid place-items-center border-r-2 px-5 transition-colors"
              style={{
                background: active === s.id ? 'var(--ink)' : 'transparent',
                color: active === s.id ? 'var(--paper)' : 'var(--ink)',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-stretch">
          <a
            href={import.meta.env.BASE_URL + profile.resume}
            target="_blank"
            rel="noreferrer"
            className="label hidden items-center gap-2 border-l-[3px] px-5 transition-colors hover:brightness-95 md:flex"
            style={{ background: 'var(--yellow)', color: '#16150f' }}
          >
            ↓ Résumé
          </a>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'crt' ? 'Switch to paper theme' : 'Switch to CRT theme'}
            className="label grid w-14 place-items-center border-l-[3px] text-base transition-colors hover:bg-[var(--paper-2)]"
          >
            {theme === 'crt' ? '☀' : '☾'}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="label grid w-14 place-items-center border-l-[3px] text-lg lg:hidden"
          >
            {open ? '✕' : '≡'}
          </button>
        </div>
      </nav>

      {/* scroll progress rail */}
      <div className="h-[5px] border-b-[3px]" style={{ background: 'var(--paper-2)' }}>
        <div
          className="h-full transition-[width] duration-75"
          style={{
            width: `${progress}%`,
            background:
              'repeating-linear-gradient(45deg, var(--orange) 0 7px, var(--yellow) 7px 14px)',
          }}
        />
      </div>

      {open && (
        <div className="border-b-[3px] lg:hidden" style={{ background: 'var(--card)' }}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="label block border-b-2 px-5 py-3.5 last:border-b-0"
            >
              → {s.label}
            </a>
          ))}
          <a
            href={import.meta.env.BASE_URL + profile.resume}
            target="_blank"
            rel="noreferrer"
            className="label block px-5 py-3.5"
            style={{ background: 'var(--yellow)', color: '#16150f' }}
          >
            ↓ Download Résumé
          </a>
        </div>
      )}
    </header>
  );
}
