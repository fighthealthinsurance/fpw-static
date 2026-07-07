// @vitest-environment jsdom
// @vitest-environment-options {"url": "http://localhost:3000/auth/provider-signup/?source=email"}
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../test-utils";
import RedirectStub, { buildRedirectUrl } from "@/components/RedirectStub";

describe("buildRedirectUrl", () => {
  it("appends the query string to the target", () => {
    expect(buildRedirectUrl("/schedule-demo/", "?source=email")).toBe(
      "/schedule-demo/?source=email",
    );
  });

  it("leaves the URL bare without query or default source", () => {
    expect(buildRedirectUrl("/schedule-demo/", "")).toBe("/schedule-demo/");
  });

  it("injects the default source when the query has none", () => {
    expect(buildRedirectUrl("/schedule-demo/", "", "404")).toBe(
      "/schedule-demo/?source=404",
    );
  });

  it("injects the default source alongside other params", () => {
    expect(buildRedirectUrl("/schedule-demo/", "?utm_campaign=x", "404")).toBe(
      "/schedule-demo/?utm_campaign=x&source=404",
    );
  });

  it("never overrides an existing source param", () => {
    expect(buildRedirectUrl("/schedule-demo/", "?source=email", "404")).toBe(
      "/schedule-demo/?source=email",
    );
  });
});

describe("RedirectStub", () => {
  it("redirects to the target with the query string preserved", () => {
    const onRedirect = vi.fn();
    render(
      <RedirectStub
        target="/schedule-demo/"
        label="Get Started"
        onRedirect={onRedirect}
      />,
    );

    expect(onRedirect).toHaveBeenCalledWith("/schedule-demo/?source=email");
  });

  it("appends the query string to external targets too", () => {
    const onRedirect = vi.fn();
    render(
      <RedirectStub
        target="https://fighthealthinsurance.com"
        label="Fight Health Insurance"
        onRedirect={onRedirect}
      />,
    );

    expect(onRedirect).toHaveBeenCalledWith(
      "https://fighthealthinsurance.com?source=email",
    );
  });

  it("keeps the existing source even with a defaultSource set", () => {
    const onRedirect = vi.fn();
    render(
      <RedirectStub
        target="/schedule-demo/"
        label="Get Started"
        defaultSource="404"
        onRedirect={onRedirect}
      />,
    );

    expect(onRedirect).toHaveBeenCalledWith("/schedule-demo/?source=email");
  });

  it("renders a visible fallback link to the target", () => {
    render(
      <RedirectStub
        target="/schedule-demo/"
        label="Get Started"
        onRedirect={vi.fn()}
      />,
    );

    const fallback = screen.getByRole("link", { name: "Get Started" });
    expect(fallback).toHaveAttribute("href", "/schedule-demo/");
    expect(screen.getByText(/redirecting/i)).toBeInTheDocument();
  });
});
