import { useEffect } from "react";

import RedirectStub from "@/components/RedirectStub";
import { trackEvent } from "@/lib/analytics";
import { ROUTES } from "@/lib/routes";

// Catch-all for every URL from the retired pro app (dashboards, pricing,
// blog, appeal flows, ...). GitHub Pages serves this page as 404.html for
// any path that matches no file, and it forwards straight to the demo
// signup form — untagged traffic is attributed with source=404. Known
// legacy paths keep their own, more specific stubs (real exported files
// always win over 404.html), e.g. /auth/patient-signup goes to Fight
// Health Insurance instead.
export default function NotFoundPage() {
  useEffect(() => {
    // Best-effort: usually racing the redirect; the durable signal is the
    // source=404 attribution on the demo form.
    trackEvent("page_view_404", {
      path: window.location.pathname,
    });
  }, []);

  return (
    <RedirectStub
      target={ROUTES.scheduleDemo}
      label="Get Started"
      defaultSource="404"
    />
  );
}
