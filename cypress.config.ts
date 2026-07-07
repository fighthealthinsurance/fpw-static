import { defineConfig } from "cypress";

// E2E runs against the static export (npm run build && npm run serve-out),
// exactly what GitHub Pages / nginx serve in production. No backend is
// involved: every API call is stubbed with cy.intercept.
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    // Keep tests hermetic: analytics never leave the Cypress proxy.
    blockHosts: [
      "*.googletagmanager.com",
      "*.google-analytics.com",
      "*.google.com",
      "*.doubleclick.net",
    ],
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
