import { useEffect, useState } from 'react';
import { packages } from '../data/profile';
import { XP_PER_INSTALL, levelFor, readProgress, recordInstall, onProgressChange } from '../lib/packageProgress';
import SectionHead from './SectionHead';
import Reveal from './Reveal';

/** Fake terminal preview: types the install command, then a short install log. */
function InstallDemo({ pkg, installed, onInstall }) {
  const [lines, setLines] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setLines([]);

    const script = [
      `$ ${pkg.install}`,
      `Collecting ${pkg.name}`,
      `  Downloading ${pkg.name}-${pkg.version}-py3-none-any.whl`,
      'Resolving dependencies... done',
      `Installing collected packages: ${pkg.name}`,
      `Successfully installed ${pkg.name}-${pkg.version}`,
    ];

    script.forEach((text, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, text]);
        if (i === script.length - 1) {
          setRunning(false);
          onInstall();
        }
      }, i * 260);
    });
  };

  return (
    <div>
      <button
        onClick={run}
        disabled={running}
        data-hot
        className="label flex w-full items-center justify-between border-2 px-3 py-2.5 text-left disabled:opacity-60"
        style={{ background: 'var(--ink)', color: 'var(--paper)' }}
      >
        <span>
          {running ? 'installing…' : installed ? `✓ ${pkg.install}` : `▶ ${pkg.install}`}
        </span>
        {!running && <span style={{ color: `var(--${pkg.accent})` }}>{installed ? '+ again' : `+${XP_PER_INSTALL} xp`}</span>}
      </button>

      <div
        className="mt-2 min-h-[7.5rem] overflow-hidden border-2 p-3 font-mono text-[11px] leading-relaxed"
        style={{ background: '#0b0d0c', color: '#8fe3a3', borderColor: 'var(--line)' }}
      >
        {lines.length === 0 && !running && (
          <span style={{ color: '#5a6b5d' }}>// press install to run the demo</span>
        )}
        {lines.map((l, i) => (
          <div key={i} style={i === 0 ? { color: '#d6e8d8' } : undefined}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function PackageCard({ pkg, installed, onInstall }) {
  return (
    <Reveal>
      <div className="panel lift flex h-full flex-col">
        <div
          className="flex items-center justify-between border-b-2 px-4 py-2.5"
          style={{ background: `var(--${pkg.accent})` }}
        >
          <span className="label text-white">v{pkg.version}</span>
          <span className="label text-white">{pkg.releases} releases on PyPI</span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-baseline gap-2">
            <h3 className="display text-xl">{pkg.name}</h3>
            {installed && (
              <span className="sticker" style={{ background: 'var(--teal)', color: '#0b0b08' }}>
                ✓ installed
              </span>
            )}
          </div>
          <p className="mt-1 text-[0.85rem] font-medium" style={{ color: 'var(--ink-soft)' }}>
            {pkg.tagline}
          </p>
          <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed">{pkg.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.keywords.map((k) => (
              <span key={k} className="sticker" style={{ boxShadow: 'none', fontSize: '9px' }}>
                {k}
              </span>
            ))}
          </div>

          <div className="mt-4 border-t-2 pt-4">
            <InstallDemo pkg={pkg} installed={installed} onInstall={onInstall} />
          </div>

          <div className="label mt-4 flex gap-4" style={{ color: 'var(--ink-soft)' }}>
            <a href={pkg.pypi} target="_blank" rel="noreferrer" className="hover:underline">
              PyPI ↗
            </a>
            <a href={pkg.repo} target="_blank" rel="noreferrer" className="hover:underline">
              Source ↗
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Packages() {
  const [installedIds, setInstalledIds] = useState([]);
  const [xp, setXp] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const { installed, xp: savedXp } = readProgress();
    setInstalledIds(installed);
    setXp(savedXp);

    // Pick up installs fired from the terminal's `pip install` command too.
    return onProgressChange((e) => {
      setInstalledIds(e.detail.installed);
      setXp(e.detail.xp);
    });
  }, []);

  const handleInstall = (pkg) => {
    const prevXp = xp;
    const alreadyInstalled = installedIds.includes(pkg.id);
    const { xp: nextXp, gained } = recordInstall(pkg.id);

    const before = levelFor(prevXp);
    const after = levelFor(nextXp);
    if (after.idx > before.idx) {
      setToast(`Level up → ${after.name}`);
      setTimeout(() => setToast(null), 2600);
    } else if (!alreadyInstalled) {
      setToast(`+${gained} xp — ${pkg.name} installed`);
      setTimeout(() => setToast(null), 1800);
    }
  };

  const level = levelFor(xp);
  const span = level.next ? level.next.at - level.at : 1;
  const into = xp - level.at;
  const pct = level.next ? Math.min(100, Math.round((into / span) * 100)) : 100;

  return (
    <section id="packages" className="border-b-[3px] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="03"
          kicker="Open source, published to PyPI"
          title="Packages"
          accentName="blue"
        />

        <Reveal>
          <div className="panel mb-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="display grid h-14 w-14 shrink-0 place-items-center border-2 text-lg"
                style={{ background: 'var(--purple)', color: '#fff' }}
              >
                {installedIds.length}/{packages.length}
              </div>
              <div>
                <div className="label" style={{ color: 'var(--ink-soft)' }}>
                  rank
                </div>
                <div className="display text-xl">{level.name}</div>
              </div>
            </div>

            <div className="w-full sm:max-w-xs">
              <div className="label mb-1.5 flex justify-between" style={{ color: 'var(--ink-soft)' }}>
                <span>{xp} xp</span>
                <span>{level.next ? `${level.next.at} xp → ${level.next.name}` : 'max rank'}</span>
              </div>
              <div className="h-4 w-full border-2" style={{ background: 'var(--paper-2)' }}>
                <div
                  className="h-full transition-[width] duration-500"
                  style={{
                    width: `${pct}%`,
                    background:
                      'repeating-linear-gradient(45deg, var(--purple) 0 7px, var(--blue) 7px 14px)',
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mb-8 max-w-2xl text-[0.95rem] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          Three CLI/library tools I've published and maintain on PyPI. Each card runs a real{' '}
          <code className="font-mono" style={{ color: 'var(--orange)' }}>pip install</code> demo —
          or open the terminal above and try <code className="font-mono" style={{ color: 'var(--orange)' }}>pip install toolproxy</code>{' '}
          directly.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              installed={installedIds.includes(pkg.id)}
              onInstall={() => handleInstall(pkg)}
            />
          ))}
        </div>
      </div>

      {toast && (
        <div
          className="pulse-ring fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 border-[2.5px] px-5 py-3"
          style={{ background: 'var(--ink)', color: 'var(--paper)', boxShadow: '4px 4px 0 var(--orange)' }}
        >
          <span className="label">{toast}</span>
        </div>
      )}
    </section>
  );
}
