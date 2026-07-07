import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../test-utils";
import NotFoundPage from "@/pages/404";

// Swap the real stub (which navigates on mount) for a prop probe; the
// redirect behavior itself is covered in redirect-stub.test.tsx and e2e.
vi.mock("@/components/RedirectStub", () => ({
  default: ({
    target,
    label,
    defaultSource,
  }: {
    target: string;
    label: string;
    defaultSource?: string;
  }) => (
    <a
      data-testid="redirect-stub"
      href={target}
      data-default-source={defaultSource}
    >
      {label}
    </a>
  ),
}));

describe("404 page", () => {
  it("funnels every retired URL to the demo signup form", () => {
    render(<NotFoundPage />);
    const stub = screen.getByTestId("redirect-stub");
    expect(stub).toHaveAttribute("href", "/schedule-demo/");
    expect(stub).toHaveTextContent("Get Started");
  });

  it("tags untagged traffic with source=404 for attribution", () => {
    render(<NotFoundPage />);
    expect(screen.getByTestId("redirect-stub")).toHaveAttribute(
      "data-default-source",
      "404",
    );
  });
});
