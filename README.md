# fpw-static

The Fight Paperwork marketing mini-site (www.fightpaperwork.com). Fight
Paperwork is connector-only now, so this site has exactly two jobs:

1. **Send patients to Fight Health Insurance** — every patient CTA links to
   <https://fighthealthinsurance.com>.
2. **Capture interested professionals** — the form on
   [`/schedule-demo/`](https://www.fightpaperwork.com/schedule-demo/) POSTs to
   the Fight Health Insurance backend
   (`POST {API_HOST}/ziggy/rest/demo_request/`), which emails the team and the
   connector partner.

There is no product, no auth, and no self-serve signup here. This repo
replaces the Vercel-hosted `fhi-nextjs-pro` app with a fully static site that
can be served from GitHub Pages, nginx, or any dumb file host.

## Development

```bash
nvm use          # Node 22 (.nvmrc)
npm ci
npm run dev      # dev server at http://localhost:3000
```

To exercise the real static export (what production serves):

```bash
npm run build       # exports to out/
npm run serve-out   # serves out/ with GitHub Pages semantics at :3000
```

Full local check:

```bash
npm run lint && npm run check-format && npm run tsc && npm run test && npm run e2e
```

## Architecture

- **Next.js 15 (Pages Router) with `output: "export"`** — `next build` emits a
  pure static site into `out/` (directory-per-route, `trailingSlash: true`).
  There is no server, no API routes, and no framework redirects.
- **Mantine 7** UI, Poppins font, brand orange `#FF9A52` — visual continuity
  with the pro site.
- **`src/lib/api.ts` is the only network code**: two unauthenticated JSON
  POSTs (`demo_request`, `mailinglist_subscribe`). URLs are always absolute
  (`API_HOST`), with no cookies/CSRF — the endpoints are public and the
  simple requests keep CORS easy.
- **Analytics**: GTM `GTM-5J62XDHT` + GA `G-71BKXCJ1SB` via
  `@next/third-parties`, with the same `trackEvent` event names the pro site
  used (`page_view_schedule_demo`, `initial_demo_form_submitted`,
  `demo_request_submitted_{success,warning,error}`, `page_view_404`).

### Build-time environment variables

Values are inlined into the bundle at build time (`next.config.ts`); changing
them requires a rebuild. Deploy workflows read optional repository variables
of the same names.

| Variable        | Default                          | Purpose                          |
| --------------- | -------------------------------- | -------------------------------- |
| `API_HOST`      | `https://api.fightpaperwork.com` | Backend receiving the two POSTs  |
| `SUPPORT_EMAIL` | `support42@fightpaperwork.com`   | Fallback contact shown on errors |

### Legacy URLs

| Old URL                        | Now                                  |
| ------------------------------ | ------------------------------------ |
| `/auth/professional-signup/**` | `/schedule-demo/` (query preserved)  |
| `/auth/provider-signup`        | `/schedule-demo/` (query preserved)  |
| `/auth/patient-signup`         | `https://fighthealthinsurance.com`   |
| everything else retired        | custom 404 page routes patients/pros |

On GitHub Pages the redirects are exported stub pages (client-side
`location.replace`, noscript meta refresh fallback). The nginx image serves
real 301s for the same paths (`nginx.conf`).

## Testing

- **Vitest** (`npm run test`): the API module (absolute URLs — guards against
  the pro-site bug where requests went to the page origin), form validation
  and payload mapping, `?source=` attribution precedence, redirect stubs, 404
  routing.
- **Cypress** (`npm run e2e`): runs against the built static export served
  locally.
  - **CI must never post to the real API** — a real `demo_request` emails the
    team and the connector partner. Two safety layers: e2e builds use
    `API_HOST=https://api-stub.fightpaperwork.invalid` (RFC 2606 — cannot
    resolve), and `cypress/support/e2e.ts` registers a guard intercept that
    fails any test reaching `api.fightpaperwork.com`. All API traffic in
    specs is stubbed with `cy.intercept`.

## CI & deployment

- **`ci.yaml`** (PRs + pushes to `main`): lint, prettier check, `tsc`, vitest,
  static export (uploaded as an artifact), Cypress e2e, and a Docker build
  check.
- **`deploy.yaml`** (pushes to `main` + manual dispatch): re-runs the cheap
  gates, builds once, then in parallel:
  - deploys `out/` to **GitHub Pages**, and
  - publishes **`ghcr.io/fighthealthinsurance/fpw-static`** (`latest` +
    `sha-*`, linux/amd64 + linux/arm64) using the repo `GITHUB_TOKEN`.

### One-time GitHub Pages setup

1. Repo **Settings → Pages**: set **Source** to "GitHub Actions" (the deploy
   workflow also attempts enablement automatically).
2. Set **Custom domain** to `www.fightpaperwork.com`; enable **Enforce HTTPS**
   once the certificate is issued. (`public/CNAME` keeps the domain pinned in
   the artifact.)
3. GitHub Pages on a free-plan org requires the repository to be **public**.

Note: the `https://fighthealthinsurance.github.io/fpw-static/` preview URL
renders unstyled by design (assets are absolute-path; no `basePath` is set).
Judge the site via `npm run serve-out` locally, or the real domain after
cutover.

### DNS cutover from Vercel

1. Deploy to Pages first (push to `main`) and complete the setup above.
2. At the DNS provider: point `www` `CNAME` → `fighthealthinsurance.github.io`
   (replacing the Vercel target). For the apex `fightpaperwork.com`, use the
   GitHub Pages A records `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153` (and AAAA `2606:50c0:8000::153` …
   `:8003::153`) so GitHub redirects apex → www.
3. **Leave `api.fightpaperwork.com` untouched** — the Django backend stays
   where it is.
4. Wait for the Pages certificate to issue and verify
   `https://www.fightpaperwork.com`, then remove the domain from the Vercel
   project (removing it earlier causes an outage).
5. CORS: the backend already allows the `https://www.fightpaperwork.com`
   origin (the pro site posted from it). If you need to test the form from the
   `github.io` origin before cutover, temporarily allowlist it on the backend.
6. After cutover, watch GA DebugView and submit one test request via
   `/schedule-demo/?source=cutover-test`.

Rollback = revert the commit on `main` (or `workflow_dispatch` an older ref).

## Self-hosting (Docker)

```bash
docker run --rm -p 8080:80 ghcr.io/fighthealthinsurance/fpw-static:latest
```

- Health check endpoint: `/healthz`.
- nginx serves real 301s for the legacy paths, immutable caching for
  `/_next/static/`, `no-cache` for HTML, and baseline security headers
  (`security-headers.conf`).
- The site is baked at image build time. To point at a different backend,
  rebuild: `docker build --build-arg API_HOST=https://staging.example.com .`
