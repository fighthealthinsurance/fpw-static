// Legacy pro-app URLs must keep working on a dumb static host: the exported
// stub pages redirect client-side, preserving ?source= attribution.
const professionalPaths = [
  "/auth/professional-signup/",
  "/auth/professional-signup/account-details/",
  "/auth/professional-signup/professional-information/",
  "/auth/professional-signup/contact-information/",
  "/auth/provider-signup/",
];

describe("legacy redirects", () => {
  professionalPaths.forEach((path) => {
    it(`redirects ${path} to the demo form, query preserved`, () => {
      cy.visit(`${path}?source=email`);
      cy.location("pathname").should("eq", "/schedule-demo/");
      cy.location("search").should("eq", "?source=email");
    });
  });

  it("sends patient-signup to Fight Health Insurance", () => {
    // Don't follow the cross-origin redirect; verify the exported artifact:
    // the noscript meta refresh and the visible fallback link.
    cy.request("/auth/patient-signup/")
      .its("body")
      .then((html: string) => {
        expect(html).to.include("url=https://fighthealthinsurance.com");
        expect(html).to.include('href="https://fighthealthinsurance.com"');
      });
  });

  it("shows the routing 404 page for retired pro URLs", () => {
    cy.visit("/plans-pricing/", { failOnStatusCode: false });
    cy.contains("This page has moved").should("be.visible");
    cy.contains("a", "I'm a Patient").should(
      "have.attr",
      "href",
      "https://fighthealthinsurance.com",
    );
    cy.contains("a", "I'm a Professional").should(
      "have.attr",
      "href",
      "/schedule-demo/",
    );
  });
});
