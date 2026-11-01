# Dhinakaran Thangaraj — Academic Pages portfolio

Professional portfolio at **https://dheena731.github.io**, built on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) Jekyll template.

## Content

- `_pages/about.md` — introduction and current focus
- `_pages/experience.md` — professional roles
- `_portfolio/` — selected projects
- `_pages/open-source.md` — public Python packages
- `_publications/` — publication metadata
- `_talks/` — speaking engagements
- `_pages/cv.md` — public résumé summary (links to LinkedIn; no private résumé PDF)
- `_config.yml` and `_data/navigation.yml` — site identity and navigation

## Local development

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

The GitHub Actions workflow builds and deploys Jekyll to GitHub Pages when merged to `main`.

This migration replaces the former React/Vite site on a review branch. The original site remains recoverable through Git history.

Template attribution: [Academic Pages](https://github.com/academicpages/academicpages.github.io), based on [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes); see LICENSE.
