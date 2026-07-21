# dheena731.github.io

Personal portfolio for **Dhinakaran Thangaraj** — AI/ML Developer working on
agentic GRC and compliance automation at SQ1 Cybersecurity Solutions.

**Live:** https://dheena731.github.io

## The idea

A retro-tech product page rather than a résumé page. Paper-cream canvas, chunky
borders, hard offset shadows, dot-grid and monospace labels — with a real
interaction layer underneath:

- **Dot-matrix display** — an LED sign in the hero cycling through what I do,
  rendered from a hand-built 5×7 bitmap font.
- **CRT mascot** — a little terminal character whose eyes track your pointer.
- **Circuit-trace timeline** — the career track fills like a PCB trace as you scroll.
- **Trading-card projects** — tilt toward the cursor, click to flip for detail.
- **Physics skill board** — every technology is a rigid body in a Matter.js
  world. Drag them, throw them, shake the box.
- **A terminal that actually runs** — `whoami`, `work`, `projects`, `neofetch`,
  `sudo hire me`, with history, aliases and tab completion.
- **Two themes** — PAPER (light) and CRT (dark), with film grain and scanlines.

Everything degrades gracefully: `prefers-reduced-motion` disables the physics and
animation, and the skill board falls back to a static wrapped list.

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · Matter.js

No UI library, no component kit — the whole design system is ~40 lines of CSS
custom properties in [`src/index.css`](src/index.css).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Content

All copy lives in [`src/data/profile.js`](src/data/profile.js) — experience,
projects, skills, education, publication. Edit that one file to update the site;
no component changes needed.

The résumé PDF is deliberately **not** in this repo — it carries a phone number
that shouldn't be scrapable. Every "Résumé" affordance points at LinkedIn via
`profile.resumeHref`. To publish a redacted copy later: drop it in `public/`,
un-ignore `public/*.pdf`, and set `resumeHref` to
`import.meta.env.BASE_URL + '<filename>.pdf'`.

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages.
