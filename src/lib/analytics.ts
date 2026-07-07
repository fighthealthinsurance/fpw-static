declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: Record<string, string | number | boolean>,
    ) => void;
  }
}

/**
 * Track an event in Google Analytics. No-ops outside the browser or when
 * gtag has not loaded (e.g. blocked by an ad blocker).
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>,
): void => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
};
