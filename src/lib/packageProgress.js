const STORAGE_KEY = 'dt-pkg-xp';
const EVENT = 'dt-pkg-installed';

export const XP_PER_INSTALL = 10;
export const XP_REPEAT = 2;

export const LEVELS = [
  { at: 0, name: 'pip novice' },
  { at: 10, name: 'dependency wrangler' },
  { at: 20, name: 'venv veteran' },
  { at: 30, name: 'package maintainer' },
];

export function levelFor(xp) {
  let lvl = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.at) lvl = l;
  const idx = LEVELS.indexOf(lvl);
  return { ...lvl, idx, next: LEVELS[idx + 1] };
}

export function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { installed: saved.installed || [], xp: saved.xp || 0 };
  } catch {
    return { installed: [], xp: 0 };
  }
}

/** Records an install, persists it, and notifies any mounted Packages panel. */
export function recordInstall(pkgId) {
  const { installed, xp } = readProgress();
  const already = installed.includes(pkgId);
  const gained = already ? XP_REPEAT : XP_PER_INSTALL;
  const nextInstalled = already ? installed : [...installed, pkgId];
  const nextXp = xp + gained;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ installed: nextInstalled, xp: nextXp }));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { installed: nextInstalled, xp: nextXp } }));

  return { installed: nextInstalled, xp: nextXp, gained, leveledUp: levelFor(nextXp).idx > levelFor(xp).idx };
}

export function onProgressChange(handler) {
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
