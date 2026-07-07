import type { NextConfig } from "next";

function getEnv(name: string, _default: string = ""): string {
  const envValue = process.env[name];
  if (envValue === undefined || envValue === null || envValue === "") {
    console.log(`Using default for env variable ${name}: ${_default}`);
    return _default;
  }
  console.log(`Loading env variable ${name}: ${envValue}`);
  return envValue;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pure static export: the site must be servable from GitHub Pages, nginx,
  // or any dumb file host. No SSR, no API routes, no framework redirects.
  output: "export",
  // Directory-per-route (out/schedule-demo/index.html) behaves identically on
  // every static host; extensionless .html resolution does not.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    // Inlined into the client bundle at build time. Changing them requires a
    // rebuild — there is no runtime configuration in a static export.
    API_HOST: getEnv("API_HOST", "https://api.fightpaperwork.com"),
    SUPPORT_EMAIL: getEnv("SUPPORT_EMAIL", "support42@fightpaperwork.com"),
  },
};

export default nextConfig;
