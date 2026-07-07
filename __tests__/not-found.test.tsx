import { describe, expect, it } from "vitest";

import { render, screen } from "../test-utils";
import NotFoundPage from "@/pages/404";

describe("404 page", () => {
  it("routes patients to Fight Health Insurance", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("link", { name: /i'm a patient/i }),
    ).toHaveAttribute("href", "https://fighthealthinsurance.com");
  });

  it("routes professionals to the demo request form", () => {
    render(<NotFoundPage />);
    // next/link normalizes the trailing slash outside a real build; the
    // exported site renders /schedule-demo/ (asserted exactly in Cypress).
    expect(
      screen.getByRole("link", { name: /i'm a professional/i }),
    ).toHaveAttribute("href", expect.stringMatching(/^\/schedule-demo\/?$/));
  });

  it("offers the support email", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("link", { name: /support42@fightpaperwork\.com/i }),
    ).toHaveAttribute("href", "mailto:support42@fightpaperwork.com");
  });
});
