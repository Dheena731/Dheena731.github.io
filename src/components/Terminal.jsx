import { useEffect, useRef, useState } from 'react';
import { profile, experience, projects, packages, skillGroups, education, publication } from '../data/profile';
import { recordInstall } from '../lib/packageProgress';
import SectionHead from './SectionHead';
import Reveal from './Reveal';

const C = {
  ok: 'var(--teal)',
  warn: 'var(--yellow)',
  hot: 'var(--orange)',
  dim: 'var(--ink-soft)',
  link: 'var(--blue)',
};

const line = (text, color) => ({ text, color });

const BANNER = [
  '  ██████  ██   ██ ████████',
  '  ██   ██ ██   ██    ██   ',
  '  ██   ██ ███████    ██   ',
  '  ██   ██ ██   ██    ██   ',
  '  ██████  ██   ██    ██   ',
];

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [past, setPast] = useState([]);
  const [pastIdx, setPastIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setHistory([
      ...BANNER.map((b) => line(b, C.hot)),
      line(''),
      line(`${profile.name} — ${profile.role}`, C.ok),
      line(`Interactive shell v1.0 · ${profile.location}`, C.dim),
      line(''),
      line("Type 'help' to see what this thing does.", C.warn),
      line(''),
    ]);
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const COMMANDS = {
    help: () => [
      line('Available commands:', C.warn),
      line(''),
      ...[
        ['whoami', 'who you are talking to'],
        ['work', 'employment history'],
        ['projects', 'things I have built'],
        ['packages', 'what I ship to PyPI'],
        ['pip install <pkg>', 'actually install one (try it)'],
        ['stack', 'languages, frameworks, tools'],
        ['education', 'degrees and scores'],
        ['papers', 'published research'],
        ['contact', 'how to reach me'],
        ['resume', 'open full CV on LinkedIn'],
        ['neofetch', 'system info, retro style'],
        ['theme', 'toggle paper / CRT'],
        ['social', 'open github or linkedin'],
        ['clear', 'wipe the screen'],
      ].map(([c, d]) => line(`  ${c.padEnd(20)} ${d}`)),
      line(''),
      line('Try: sudo hire me', C.hot),
    ],

    whoami: () => [
      line(profile.name, C.ok),
      line(`${profile.subtitle}`),
      line(''),
      line(profile.blurb),
      line(''),
      line(`location   ${profile.location}`, C.dim),
      line(`github     ${profile.handle}`, C.dim),
    ],

    work: () =>
      experience.flatMap((j) => [
        line(`● ${j.company}  [${j.period}]`, C.hot),
        line(`  ${j.role}`),
        line(`  ${j.product} · ${j.location}`, C.dim),
        ...j.points.slice(0, 3).map((p) => line(`   - ${p}`)),
        line(''),
      ]),

    projects: () =>
      projects.flatMap((p) => [
        line(`▸ ${p.title}  (${p.year})`, C.link),
        line(`  ${p.blurb}`),
        line(`  stack: ${p.stack.join(', ')}`, C.dim),
        line(''),
      ]),

    stack: () =>
      skillGroups.flatMap((g) => [
        line(`${g.label}`, C.ok),
        line(`  ${g.items.join(' · ')}`),
        line(''),
      ]),

    packages: () =>
      packages.flatMap((p) => [
        line(`📦 ${p.name} — v${p.version}`, C.warn),
        line(`   ${p.tagline}`),
        line(`   ${p.install}`, C.link),
        line(''),
      ]),

    pip: (args) => {
      const [sub, pkgName] = args;
      if (sub !== 'install' || !pkgName) {
        return [
          line('usage: pip install <package>', C.warn),
          line(`try: pip install ${packages[0].name}`, C.dim),
        ];
      }

      const pkg = packages.find((p) => p.name === pkgName.toLowerCase());
      if (!pkg) {
        return [
          line(`ERROR: Could not find a version that satisfies the requirement ${pkgName}`, C.hot),
          line(`available: ${packages.map((p) => p.name).join(', ')}`, C.dim),
        ];
      }

      const script = [
        line(`Collecting ${pkg.name}`),
        line(`  Downloading ${pkg.name}-${pkg.version}-py3-none-any.whl`, C.dim),
        line('Resolving dependencies... done', C.dim),
        line(`Installing collected packages: ${pkg.name}`),
        line(`Successfully installed ${pkg.name}-${pkg.version}`, C.ok),
      ];

      script.forEach((l, i) => {
        setTimeout(() => {
          setHistory((h) => [...h, l]);
          if (i === script.length - 1) {
            const { gained, leveledUp } = recordInstall(pkg.id);
            setTimeout(() => {
              setHistory((h) => [
                ...h,
                line(''),
                line(
                  `+${gained} xp${leveledUp ? ' — LEVEL UP!' : ''} · see the Packages section below`,
                  C.warn,
                ),
                line(''),
              ]);
            }, 200);
          }
        }, i * 260);
      });

      return [];
    },

    education: () =>
      education.flatMap((e) => [
        line(`🎓 ${e.degree}`, C.warn),
        line(`   ${e.school}, ${e.place}`),
        line(`   ${e.period} — ${e.score}`, C.dim),
        line(''),
      ]),

    papers: () => [
      line(`📄 ${publication.title}`, C.warn),
      line(`   ${publication.journal} · ${publication.date}`),
      line(`   ${publication.authors.join(', ')}`, C.dim),
      line(`   DOI: ${publication.doi}`, C.link),
    ],

    contact: () => [
      line(`email      ${profile.email}`, C.ok),
      line(`linkedin   ${profile.linkedin}`, C.link),
      line(`github     ${profile.github}`, C.link),
      line(''),
      line('Run `social github` or `social linkedin` to open a tab.', C.dim),
    ],

    resume: () => {
      window.open(profile.resumeHref, '_blank', 'noopener');
      return [line('→ opening full CV on LinkedIn…', C.ok)];
    },

    neofetch: () => [
      line('       ▄▄▄▄▄▄▄        ', C.hot),
      line(`     ▄█████████▄      ${profile.name}`, C.hot),
      line(`     ██ ▀███▀ ██      ${'─'.repeat(profile.name.length)}`, C.hot),
      line(`     ██  ███  ██      role     ${profile.role}`, C.hot),
      line(`     ▀█████████▀      company  SQ1 Cybersecurity`, C.hot),
      line(`        ██ ██         product  GRC platform (contributor)`, C.hot),
      line(`       ▄█▀ ▀█▄        langs    Python, SQL, JS`, C.hot),
      line('                      focus    LLM agents, RAG, GRC'),
      line('                      degree   B.Tech AI & DS, 8.2'),
      line('                      shell    /bin/curiosity'),
    ],

    theme: () => {
      document.documentElement.classList.toggle('crt');
      const crt = document.documentElement.classList.contains('crt');
      localStorage.setItem('dt-theme', crt ? 'crt' : 'paper');
      return [line(`→ theme set to ${crt ? 'CRT (dark)' : 'PAPER (light)'}`, C.ok)];
    },

    social: (args) => {
      const which = (args[0] || '').toLowerCase();
      if (which === 'github') {
        window.open(profile.github, '_blank', 'noopener');
        return [line('→ opening github…', C.ok)];
      }
      if (which === 'linkedin') {
        window.open(profile.linkedin, '_blank', 'noopener');
        return [line('→ opening linkedin…', C.ok)];
      }
      return [line('usage: social <github|linkedin>', C.warn)];
    },

    sudo: (args) => {
      if (args.join(' ').toLowerCase().startsWith('hire me')) {
        return [
          line('[sudo] password for recruiter: ********', C.dim),
          line(''),
          line('  ✓ Permission granted.', C.ok),
          line(''),
          line(`  Reach me at ${profile.email}`, C.warn),
          line('  Available for AI/ML engineering roles.', C.warn),
          line(''),
        ];
      }
      return [line(`${profile.handle} is not in the sudoers file. This incident has been reported.`, C.hot)];
    },

    ls: () => [
      line('work/  projects/  packages/  stack/  education/  papers/  contact/', C.link),
    ],

    date: () => [line(new Date().toString())],
    echo: (args) => [line(args.join(' '))],
    clear: () => 'CLEAR',
  };

  const ALIASES = {
    experience: 'work',
    exp: 'work',
    pkgs: 'packages',
    pypi: 'packages',
    skills: 'stack',
    tech: 'stack',
    edu: 'education',
    publications: 'papers',
    cv: 'resume',
    about: 'whoami',
    me: 'whoami',
    '?': 'help',
    man: 'help',
  };

  const run = (raw) => {
    const cmd = raw.trim();
    const prompt = line(`dhina@portfolio:~$ ${cmd}`, C.ok);
    if (!cmd) return setHistory((h) => [...h, prompt]);

    const [head, ...args] = cmd.split(/\s+/);
    const key = ALIASES[head.toLowerCase()] ?? head.toLowerCase();
    const fn = COMMANDS[key];

    setPast((p) => [cmd, ...p].slice(0, 50));
    setPastIdx(-1);

    if (!fn) {
      return setHistory((h) => [
        ...h,
        prompt,
        line(`command not found: ${head}`, C.hot),
        line("try 'help'", C.dim),
        line(''),
      ]);
    }

    const out = fn(args);
    if (out === 'CLEAR') return setHistory([]);
    setHistory((h) => [...h, prompt, ...out, line('')]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(pastIdx + 1, past.length - 1);
      if (next >= 0) {
        setPastIdx(next);
        setInput(past[next]);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = pastIdx - 1;
      setPastIdx(next);
      setInput(next < 0 ? '' : past[next]);
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const all = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
      const hit = all.find((c) => c.startsWith(input.toLowerCase()) && input);
      if (hit) setInput(hit);
    }
  };

  const QUICK = ['whoami', 'work', 'projects', 'pip install toolproxy', 'stack', 'sudo hire me'];

  return (
    <section
      id="terminal"
      className="border-b-[3px] px-5 py-16 md:px-8 md:py-24"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          index="05"
          kicker="Yes, it actually runs"
          title="Terminal"
          accentName="purple"
        />

        <Reveal>
          <div className="panel-lg overflow-hidden">
            {/* title bar */}
            <div
              className="flex items-center gap-2.5 border-b-[3px] px-4 py-2.5"
              style={{ background: 'var(--paper-2)' }}
            >
              <span className="flex gap-1.5">
                {['var(--red)', 'var(--yellow)', 'var(--teal)'].map((c) => (
                  <span
                    key={c}
                    className="inline-block h-3.5 w-3.5 rounded-full border-2"
                    style={{ background: c }}
                  />
                ))}
              </span>
              <span className="label mx-auto" style={{ color: 'var(--ink-soft)' }}>
                dhina@portfolio — bash — 80×24
              </span>
            </div>

            {/* screen */}
            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              className="h-[26rem] overflow-y-auto p-4 font-mono text-[12.5px] leading-[1.65] md:text-[13.5px]"
              style={{ background: '#0b0d0c', color: '#d6e8d8' }}
            >
              {history.map((l, i) => (
                <pre
                  key={i}
                  className="m-0 whitespace-pre-wrap break-words font-mono"
                  style={{ color: l.color || '#d6e8d8' }}
                >
                  {l.text || ' '}
                </pre>
              ))}

              <div className="flex items-center gap-2">
                <span style={{ color: C.ok }}>dhina@portfolio:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                  className="flex-1 border-0 bg-transparent font-mono text-[12.5px] outline-none md:text-[13.5px]"
                  style={{ color: '#d6e8d8' }}
                />
                <span className="caret" style={{ color: C.hot }}>
                  ▊
                </span>
              </div>
            </div>

            {/* quick keys */}
            <div
              className="flex flex-wrap gap-2 border-t-[3px] p-3"
              style={{ background: 'var(--paper-2)' }}
            >
              {QUICK.map((q) => (
                <button key={q} onClick={() => run(q)} className="sticker lift">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
