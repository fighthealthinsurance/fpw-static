import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { build, escapeHtml } from "./build.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const redirects = JSON.parse(
  readFileSync(join(ROOT, "redirects.json"), "utf8"),
);

build();

test("every redirect entry produces a stub with the right target", () => {
  for (const [path, { target, label }] of Object.entries(redirects)) {
    const file = join(DIST, "." + path, "index.html");
    assert.ok(existsSync(file), `missing stub for ${path}`);
    const html = readFileSync(file, "utf8");
    assert.ok(
      html.includes(`content="0;url=${target}"`),
      `${path}: meta refresh target`,
    );
    assert.ok(
      html.includes(
        `location.replace(${JSON.stringify(target)} + location.search)`,
      ),
      `${path}: JS redirect preserving the query string`,
    );
    assert.ok(html.includes(`href="${target}"`), `${path}: fallback link`);
    assert.ok(html.includes(escapeHtml(label)), `${path}: fallback label`);
    assert.ok(html.includes('name="robots" content="noindex"'), `${path}: noindex`);
  }
});

test("every redirect target is Fight Health Insurance over https", () => {
  for (const [path, { target }] of Object.entries(redirects)) {
    assert.match(
      target,
      /^https:\/\/www\.fighthealthinsurance\.com(\/|$)/,
      `${path} -> ${target}`,
    );
  }
});

test("redirect paths are clean absolute paths without trailing slashes", () => {
  for (const path of Object.keys(redirects)) {
    assert.match(path, /^\/[a-z0-9/_-]+$/i, `bad path: ${path}`);
    assert.ok(!path.endsWith("/"), `${path}: drop the trailing slash`);
  }
});

test("the landing page links patients to FHI", () => {
  const html = readFileSync(join(DIST, "index.html"), "utf8");
  assert.ok(html.includes('href="https://www.fighthealthinsurance.com/"'));
  // A fallback link to the full professional site remains for anyone who'd
  // rather not use the inline form.
  assert.ok(
    html.includes('href="https://www.fighthealthinsurance.com/pro_version"'),
  );
});

test("the professional interest form does a classic POST to the FHI intake", () => {
  const html = readFileSync(join(DIST, "index.html"), "utf8");
  // Classic form submission (no JS/fetch) straight to the FHI view. Match the
  // attributes case-insensitively and tolerate single/double quotes so the
  // test asserts behavior, not a specific markup style.
  assert.match(
    html,
    /method\s*=\s*["']post["']/i,
    "form uses a classic POST submission",
  );
  assert.match(
    html,
    /action\s*=\s*["']https:\/\/www\.fighthealthinsurance\.com\/pro_version_signup["']/i,
    "form posts to the FHI interested-professional intake",
  );
  // Field names must match the Django form (InterestedProfessional fields).
  for (const field of [
    'name="name"',
    'name="email"',
    'name="job_title_or_provider_type"',
    'name="business_name"',
    'name="phone_number"',
    'name="most_common_denial"',
    'name="comments"',
    'name="website"', // honeypot
  ]) {
    assert.ok(html.includes(field), `form is missing ${field}`);
  }
});

test("the 404 catch-all forwards to the professional page, query preserved", () => {
  const html = readFileSync(join(DIST, "404.html"), "utf8");
  assert.ok(
    html.includes("https://www.fighthealthinsurance.com/pro_version"),
  );
  assert.ok(html.includes("location.search"));
});

test("GitHub Pages plumbing files land in dist", () => {
  for (const f of [
    "CNAME",
    ".nojekyll",
    "robots.txt",
    "sitemap.xml",
    "favicon.ico",
    "site.webmanifest",
  ]) {
    assert.ok(existsSync(join(DIST, f)), `missing ${f}`);
  }
  assert.equal(
    readFileSync(join(DIST, "CNAME"), "utf8").trim(),
    "www.fightpaperwork.com",
  );
});
