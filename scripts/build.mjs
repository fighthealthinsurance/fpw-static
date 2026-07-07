// Build the deployable site into dist/: copy site/ verbatim, then generate a
// tiny client-side redirect stub for every entry in redirects.json. Zero
// dependencies — plain Node.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SITE = join(ROOT, "site");
const DIST = join(ROOT, "dist");

export const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// The script runs first and preserves the query string (?source= etc.); the
// meta refresh is the no-JS fallback.
const stubHtml = (target, label) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Fight Paperwork — redirecting</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${escapeHtml(target)}" />
    <meta http-equiv="refresh" content="0;url=${escapeHtml(target)}" />
    <script>location.replace(${JSON.stringify(target)} + location.search);</script>
  </head>
  <body>
    <p>This page has moved. Continue to <a href="${escapeHtml(target)}">${escapeHtml(label)}</a>.</p>
  </body>
</html>
`;

export function build() {
  const redirects = JSON.parse(
    readFileSync(join(ROOT, "redirects.json"), "utf8"),
  );
  rmSync(DIST, { recursive: true, force: true });
  cpSync(SITE, DIST, { recursive: true });
  for (const [path, { target, label }] of Object.entries(redirects)) {
    const dir = join(DIST, "." + path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), stubHtml(target, label));
  }
  return Object.keys(redirects).length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = build();
  console.log(`Built dist/ with ${count} redirect stubs.`);
}
