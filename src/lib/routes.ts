// Canonical internal routes carry the trailing slash: the static export emits
// directory-per-route (out/schedule-demo/index.html), so the slash form is the
// URL every static host can serve without a redirect hop.
export const ROUTES = {
  home: "/",
  scheduleDemo: "/schedule-demo/",
  termsOfService: "/terms-of-service/",
  privacyPolicy: "/privacy-policy/",
  businessAssociateAgreement: "/business-associate-agreement/",
} as const;

// External consumer/patient product. Fight Paperwork is pro-only; patients and
// consumers are directed to Fight Health Insurance.
export const CONSUMER_SITE_URL = "https://fighthealthinsurance.com";

export const SUPPORT_EMAIL =
  process.env.SUPPORT_EMAIL || "support42@fightpaperwork.com";
