# Fieldnotes — Prototype Playground

A private collection of small experiments built with Next.js App Router, TypeScript, and Tailwind CSS. The full shadcn/ui component catalog is installed in `components/ui/`. The gallery reads each prototype's metadata and displays static, theme-aware thumbnails; opening a prototype navigates to its own route.

## Run locally

Install dependencies with `npm install`, then start the development server with `npm run dev`. Open `http://localhost:3000`.

## Production privacy

Production requests are password gated. Set `SITE_PASSWORD` and `AUTH_SECRET` in the production environment; see `.env.example`. The `/p/[slug]` route is available without logging in only for a prototype whose own `metadata.json` explicitly sets `"public": true`.

## Add a prototype

Read [AGENTS.md](./AGENTS.md) first. Add a folder under `app/prototypes/` with `page.tsx`, `metadata.json`, and `HOW_IT_WORKS.md`. Capture both theme thumbnails with `npm run thumbnails -- --slug <slug>`. Prototype additions are delivered through a pull request.
