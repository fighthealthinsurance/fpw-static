import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../test-utils";
import AccountDetailsRedirect from "@/pages/auth/professional-signup/account-details";
import ContactInformationRedirect from "@/pages/auth/professional-signup/contact-information";
import PatientSignupRedirect from "@/pages/auth/patient-signup";
import ProfessionalInformationRedirect from "@/pages/auth/professional-signup/professional-information";
import ProfessionalSignupRedirect from "@/pages/auth/professional-signup";
import ProviderSignupRedirect from "@/pages/auth/provider-signup";

// Swap the real stub (which navigates on mount) for a prop probe so each
// legacy page's wiring can be asserted without jsdom navigation.
vi.mock("@/components/RedirectStub", () => ({
  default: ({ target, label }: { target: string; label: string }) => (
    <a data-testid="redirect-stub" href={target}>
      {label}
    </a>
  ),
}));

const professionalPages = [
  ["professional-signup index", ProfessionalSignupRedirect],
  ["professional-signup account-details", AccountDetailsRedirect],
  [
    "professional-signup professional-information",
    ProfessionalInformationRedirect,
  ],
  ["professional-signup contact-information", ContactInformationRedirect],
  ["provider-signup", ProviderSignupRedirect],
] as const;

describe("legacy redirect pages", () => {
  it.each(professionalPages)(
    "%s redirects professionals to the demo request form",
    (_name, Page) => {
      render(<Page />);
      expect(screen.getByTestId("redirect-stub")).toHaveAttribute(
        "href",
        "/schedule-demo/",
      );
    },
  );

  it("patient-signup redirects patients to Fight Health Insurance", () => {
    render(<PatientSignupRedirect />);
    expect(screen.getByTestId("redirect-stub")).toHaveAttribute(
      "href",
      "https://fighthealthinsurance.com",
    );
  });
});
