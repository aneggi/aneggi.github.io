# Alessandro Aneggi — Devolio site

Personal site and research blog using the [Devolio](https://github.com/devaradise/devolio) Astro template. Content focuses
on power-aware DevOps, greener software, and real-time systems.

## Local development

1. Install Node.js 20+ (or export `PATH="$HOME/.local/node/bin:$PATH"` to use the portable Node installed by the setup).
2. Install deps: `npm install`
3. Run the dev server: `npm run dev`

## Content model

- Profile & site strings: `src/data/profile.json`
- Articles: `src/content/blog/*.md`
- Publications list: `src/content/publications/*.md`

## Build & preview

- Production build: `npm run build`
- Preview build output: `npm run preview`
- RSS feed: `/rss.xml` (blog posts)
