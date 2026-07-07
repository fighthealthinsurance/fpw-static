// @vitest-environment jsdom
// @vitest-environment-options {"url": "http://localhost:3000/auth/provider-signup/?source=email"}
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../test-utils";
import RedirectStub from "@/components/RedirectStub";

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
