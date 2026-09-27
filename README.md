# .zwd website

Official website and dashboard frontend for the `.zwd` Discord bot. It is a static React application for GitHub Pages with an optional authenticated API provided by the bot's Fastify server.

## Stack

- React 19 + TypeScript + Vite
- Motion for progressive/reduced-motion-aware animation
- Lucide icons
- Tailwind CSS build pipeline plus a custom design system
- Vitest and Testing Library
- HashRouter for GitHub Pages refresh-safe routes

## Local development

```bash
npm ci
npm run dev
```

The Vite URL is `http://localhost:5173/Hackey/`. Copy `.env.example` to `.env.local` only when connecting a backend.

## Quality checks

```bash
npm run check
```

This runs lint, TypeScript, tests, and the production build. The generated files are written to `dist/`.

## Modes

Without `VITE_API_URL`, the dashboard is explicitly labelled **Demo**. Demo saves only update local component state and always tell the user that Discord was not changed.

With `VITE_API_URL`, the dashboard uses the bot API for Discord OAuth, manageable guilds, validated guild settings and real saves. No Discord secret or bot token is ever compiled into this frontend.

```env
VITE_API_URL=https://api.example.com
VITE_BASE_PATH=/Hackey/
```

## Backend configuration

The API is mounted in the existing `.zwd` Fastify server. Configure these variables on the bot host, never in GitHub Pages:

```env
DASHBOARD_ENABLED=true
PUBLIC_BASE_URL=https://api.example.com
DASHBOARD_FRONTEND_URL=https://lollo123sketch.github.io/Hackey
DISCORD_CLIENT_ID=1470536268948439134
DISCORD_CLIENT_SECRET=replace-on-host
DISCORD_OAUTH_REDIRECT_URI=https://api.example.com/auth/discord/callback
SESSION_SECRET=replace-with-a-long-random-secret
```

The API uses encrypted HttpOnly cookies, OAuth state validation, exact-origin credentialed CORS, CSRF headers, input validation, mutation rate limits and server-side Discord permission checks. A user cannot access a guild only by changing its URL.

In the Discord Developer Portal, add the exact `DISCORD_OAUTH_REDIRECT_URI` under **OAuth2 → Redirects**. The OAuth scopes used by login are `identify` and `guilds`.

## GitHub Pages

`.github/workflows/pages.yml` installs dependencies, runs the complete quality check, uploads `website/dist`, and deploys on pushes to `main` that affect the website.

Repository settings:

1. Open **Settings → Pages**.
2. Choose **GitHub Actions** as the source.
3. Optionally add the repository variable `VITE_API_URL` and expose it in the workflow when the API has a public HTTPS URL.

The site uses hash routes (`/#/commands`, `/#/dashboard`) so refreshes work on static hosting. `public/404.html` provides a final fallback.

## Assets

`public/zwed-avatar.jpg` is the developer avatar supplied by zwed. Developer profiles are declared in `src/config/site.ts` so future developers can be added without changing page structure.

## Security boundaries

- Never place `DISCORD_CLIENT_SECRET`, `DISCORD_TOKEN`, `SESSION_SECRET`, or database credentials in `VITE_*` variables.
- GitHub Pages contains only public assets and compiled client code.
- Every write is authorized and validated in the backend, not in React.
- Live statistics are hidden until an actual status endpoint is connected; the site never invents usage numbers.
