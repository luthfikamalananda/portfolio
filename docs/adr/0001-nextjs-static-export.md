# Next.js, but always as a static export

The portfolio must be hostable on GitHub Pages, Netlify and a plain VPS interchangeably, so we use Next.js (App Router) with `output: 'export'` and treat the build as a folder of static files. We picked Next.js over Vite for per-URL locales (`/` and `/id`), per-locale metadata/Open Graph, and an upgrade path to `next start` on the VPS if server features are ever needed.

## Consequences

- No API routes, middleware, server actions, ISR or on-demand image optimisation (`images.unoptimized: true`). Adding any of these breaks GitHub Pages and Netlify static deploys; do it only by superseding this ADR.
- The site may live under a sub-path on GitHub Pages, so `basePath` comes from an environment variable and every internal asset/link must respect it.
- Locale switching is route-based and cannot rely on a server redirect; `/` is always English.
