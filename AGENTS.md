# Fieldnotes Prototype Playground — Agent Rules

Read this file before doing any work in this repository.

## Product intent

This is a private, personal collection of small apps, games, simulations, and tools. The owner often asks for prototypes from a phone. Make new work fast to add, visually coherent in the gallery, self-contained, and hard to break. A prototype can have its own visual identity while using the site's shared theme and UI building blocks.

## Stack and project map

- Next.js App Router with TypeScript; Tailwind CSS v4; shadcn/ui; Lucide icons.
- `app/page.tsx` is the private gallery. `app/layout.tsx` and `components/providers.tsx` set up the site and `next-themes`.
- Each experiment lives in `app/prototypes/<slug>/` and has `page.tsx`, `metadata.json`, and `HOW_IT_WORKS.md`.
- `app/prototypes/[slug]/page.tsx` is the private route. `app/p/[slug]/page.tsx` is the public route and must resolve only explicitly public entries.
- `lib/prototypes.ts` discovers folders, validates metadata, sorts by `updatedAt`, and provides the catalog data. `lib/prototype-pages.tsx` is the explicit route-to-component map; update it for each prototype.
- `components/ui/` contains the complete shadcn/ui component catalog, installed up front. Reuse these components before inventing a local control; do not spend a prototype task setting up UI primitives.
- `public/thumbnails/<slug>-light.png` and `public/thumbnails/<slug>-dark.png` are static gallery previews. Use CSS theme selectors to switch images; do not use JavaScript for thumbnail theme selection.
- `scripts/capture-thumbnails.mjs` builds and starts the production app, captures thumbnails with Playwright Chromium (or a local Chrome executable), and supports `--slug`, repeated `--slug`, comma-separated `--slugs`, and `--missing`.
- `proxy.ts` protects production routes; `/login` and `/api/auth` are the only normal private-site exceptions. `/p/[slug]` is intentionally public at the network boundary, so its route handler must enforce metadata visibility itself.

## Creating a prototype

1. Create `app/prototypes/<lowercase-hyphenated-slug>/page.tsx`, `metadata.json`, and `HOW_IT_WORKS.md`. Keep its state and behavior inside that route/component. Do not create prototypes from the app itself; there is no create button or create API.
2. Add a component import to `lib/prototype-pages.tsx`. `lib/prototypes.ts` discovers and reads the JSON metadata; do not duplicate catalog copy in the gallery.
3. Metadata must include `title`, `description`, `tags`, `createdAt` (`YYYY-MM-DD`), ISO `updatedAt`, `hidden`, and `public`. Default `hidden` and `public` to `false`. `category` and `slug` are additional required registry fields in this repository. Bump `updatedAt` on every edit to that prototype, including code, assets, or docs.
4. Keep every prototype's `HOW_IT_WORKS.md` current on every edit and use the required documentation sections below. Use the site's Tailwind theme and shadcn/ui components. Keep controls keyboard-operable, labeled, focused visibly, responsive, and respectful of reduced motion. Prefer local assets and browser APIs; no external scripts, credentials, or network dependency unless requested.
5. Keep prototypes independent: no imports from another prototype folder, no shared mutable state, and no global CSS selectors. Shared site components are fine. Scope custom styles to the route or a prototype-specific class.
6. Capture both light and dark static thumbnails after implementation: `npm run thumbnails -- --slug <slug>`. Use `--slugs one,two` or multiple `--slug` flags for a selection, and `--missing` to capture only missing theme files. A new prototype or any visual change requires fresh thumbnails in the same change. A global style change requires fresh thumbnails for every prototype. Inspect every captured image; stale or broken thumbnails must not ship. Missing files are allowed: the gallery shows a “No preview yet” tile and the build remains usable.
7. Update any API route only when the prototype truly needs server behavior. Keep it under `app/api/<prototype-name>/`; assume it is private and gated by the production proxy.
8. Open a pull request for prototype work. Include what the prototype does, how to try it, and the thumbnail state. Never publish/deploy or mark a prototype public unless the owner explicitly asks.

## Privacy and public sharing

- The whole site is private by default in production. `SITE_PASSWORD` and a high-entropy `AUTH_SECRET` are required. Never add an insecure production bypass or commit secrets. Missing production secrets fail closed.
- Every prototype's metadata must contain an explicit `public` boolean, defaulting to `false`. Do not infer public status from a route, branch, or request.
- Only the `/p/<slug>` route can be unauthenticated. It renders the exact same prototype component as the private route. Unknown and private slugs return a generic 404, never a login redirect and never content or metadata that reveals the private slug.
- Only change `public` to `true` after the owner names that specific prototype. For each public prototype, add a real dynamic Open Graph image file and a video route that serves an actual shareable MP4; verify both resolve before opening the PR. Do not point public OG metadata at private content.
- Keep cookies HttpOnly, Secure in production, SameSite=Strict, and scoped to `/`. Protect auth state with `AUTH_SECRET`.

## Non-negotiable prototype rules

### Metadata and documentation

- Every prototype has `metadata.json` with `title`, `description`, `tags` (string array), `createdAt` (`YYYY-MM-DD`), `updatedAt` (ISO timestamp), `hidden` (boolean), and `public` (boolean). This registry also requires its matching `slug` and `category` fields.
- Set `hidden: false` and `public: false` for new work. Hidden prototypes stay out of the gallery; hiding does not change public/private route authorization.
- Bump `updatedAt` on every prototype edit, including documentation and assets, so gallery ordering is accurate.
- Every prototype has a current `HOW_IT_WORKS.md` with these exact sections: **What It Does** (1–2 sentences), **Architecture** (ASCII data-flow diagram), **Frontend / API** (state, shortcuts, responsive behavior, request/response), **AI Usage** (or “None”), **Key Dependencies**, **Component Tree**, **Error Handling**, and **File Structure**.

### Structure and separation

- A prototype lives entirely in its own `app/prototypes/<slug>/` folder and never imports another prototype's files.
- Keep `page.tsx` thin, around 60 lines or fewer. Split meaningful components into descriptive files; put shared types in `types.ts`, sample data and constants in `data.ts`, and pure logic in focused files such as `search.ts` or `utils.ts`.
- Avoid giant files and giant JSX lines. Keep React components focused on rendering and interaction; move reusable pure logic out so it can be reasoned about independently.
- Inspect a shadcn component's installed source before relying on props or behavior. The installed component implementation is authoritative.

### Design and scope

- Always use shared shadcn components and semantic design tokens such as `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `text-muted-foreground`, `bg-primary`, and `border-border`.
- Never hardcode UI colors with black/white utility classes, hex values, RGB values, or inline color styles. Put shared palette values in the design tokens and consume those tokens from prototypes.
- Start with one centered column (`max-w-2xl mx-auto`). Add sidebars, split panels, tabs, dashboards, or charts only when the owner asks or the interaction requires them.
- Build only the requested behavior. Keep copy minimal, use plain badges, and omit decorative icons. An icon must clarify an action or represent the subject itself.
- Anything with tunable parameters belongs in one control panel rather than scattered inputs. Define controls as a schema and reuse the shared control-panel library for state, persistence, Reset, and Randomize. Every panel must offer both **Reset** and **Randomize / Surprise me**.
- Place control panels beside the subject on desktop so they do not cover it. On mobile, use a bottom sheet.

### Mobile and accessibility

- Design and check at 375px wide. All tap targets are at least 44×44px. Use icon-only button faces on mobile and reveal their text labels from `sm:` upward; every icon-only action still has an accessible name.
- Never rely on hover alone. Give hover affordances an equivalent visible focus or touch state. Wrap code blocks and avoid horizontal scrolling.
- On mobile, dialogs that browse a sequence need visible previous/next controls or swipe navigation; keyboard shortcuts alone are insufficient.
- Honor reduced motion and ensure keyboard focus remains visible.

### Theme and motion

- Design dark-first and make light mode work through the same semantic tokens. Never hardcode a `dark` class on a prototype page; the global theme provider owns the theme class.
- Use `useTheme()` or `resolvedTheme` only when behavior must change by theme (for example, canvas/WebGL rendering), never just to set colors.
- Animate rows or sections that users add or remove so they expand and collapse smoothly without layout jumps. Use smooth deceleration with no bounce. Check computed styles to confirm the animation utility is present and active.

### AI and data

- If a prototype calls an AI model, call it only from a server API route. Never expose credentials to the client. Document model ID, why it was chosen, call shape, key parameters, system-prompt summary, and user-prompt shape in **AI Usage**.
- Constrain model-generated layouts in the system prompt (for example, max columns and no wide tables). Parse JSON defensively by extracting and validating the first `{...}` block. Wrap API handlers in `try/catch` and return meaningful status codes.
- Wrap every `localStorage` read and write in `try/catch`. Read persisted values after mount, never during server render, and namespace every key by prototype slug.

## Gallery and thumbnails

- Gallery cards must use static images; never boot prototype pages in iframes or hidden embeds to create previews.
- Render both thumbnail theme variants in markup and switch their visibility with CSS classes/media selectors so the correct image appears with the theme on first paint.
- Use static image elements for previews. Because private thumbnail files sit behind the password gate, bypass Next's server-side image optimizer (`unoptimized` with `next/image` or a plain `<img>`) so the browser's authenticated request reaches the protected file directly. Missing light or dark artwork gets a designed “No preview yet” tile in that mode; it must not break the route or build.
- Keep the catalog sortable by most recently updated. Metadata is the sole source of title, description, category, visibility, and update date.

## Changes and verification

- Inspect existing work and preserve unrelated changes. Do not replace the stack or reorganize routes casually.
- Keep dependencies limited to the existing toolchain. Use the already-installed shadcn/ui components rather than waiting to add libraries during a prototype task.
- Do not merge a pull request or promote a preview to production unless the owner asks. Push the feature branch and open a pull request when repository access is configured, following the workflow rules below.
- When verification is requested, run the production build and capture the affected thumbnail(s) in both themes. Describe exactly what passed and what could not be checked.

## Workflow rules

- Start repository work on a `codex/` feature branch. When the repository has a configured remote and authenticated GitHub access, commit the finished change, push the branch, and open a pull request. The PR must trigger the configured build check and preview deployment; do not merge it unless the owner asks.
- Before finishing, run `npm run lint`, `npm run type-check`, and `npm run build`. Fix failures before opening the PR.
- After the PR preview is ready, post its actual URL in the final response so the owner can open it from a phone. Never invent or substitute a local URL for a hosted preview. If remote access or preview deployment is unavailable, finish the local branch and state exactly what access is missing.
- If a failure is found and fixed, append the reusable lesson to the “Lessons from fixes” section below.

## Lessons from fixes

- Keep the checkout path free of `#` characters. Next.js build and capture tooling failed from the original workspace path containing `#`; the project now lives in `/Users/ecariss/Documents/ChatGPT/prototype-playground`, with the old location kept as a symlink.
- Verify touch-target dimensions from the browser’s computed bounding box. A `data-size` variant on the shared Select trigger overrode a plain height utility, leaving a nominally 44px control at 36px until the matching data-variant utility was added.
- Check `document.documentElement.scrollWidth` at 375px. Decorative artwork positioned past the viewport caused horizontal scrolling on the gallery until its mobile offset was corrected.
- Prefer reducers for timer state transitions and `useSyncExternalStore` for browser-owned state such as time and media queries. Direct state synchronization in effects tripped the React hooks lint rule; defer browser storage hydration until after mount and keep effects for subscriptions and cleanup.

- Before sharing a Vercel preview, confirm the Vercel GitHub App has access to the repo and add Preview-only `SITE_PASSWORD` and `AUTH_SECRET`; missing auth configuration returns 503. Keep the values out of Git.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
