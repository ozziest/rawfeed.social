# rawfeed.social

Quick scaffold with:

- Fastify server (TypeScript)
- EJS templates via `@fastify/view`
- Tailwind CSS (with content purge watching `views/**/*.ejs`)
- HTMX example (button that swaps a partial)

Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Tailwind watch (rebuilds when views change): `npm run tailwind:watch`
- Build Tailwind once: `npm run tailwind:build`
- Build TypeScript: `npm run build`
- Start (production): `npm run build` then `npm start`

Notes

- Tailwind's `content` in `tailwind.config.cjs` includes `./views/**/*.ejs`, so classes used in EJS views are preserved during purge.
- Example HTMX endpoint: `GET /counter` returns a partial that is swapped into the page.
