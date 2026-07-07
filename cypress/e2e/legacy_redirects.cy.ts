// Legacy pro-app URLs must keep working on a dumb static host: the exported
// stub pages redirect client-side, preserving ?source= attribution, and the
// 404 page is a catch-all funnel to the demo signup form.
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

  it("funnels any retired URL to the demo form with source=404", () => {
    cy.visit("/plans-pricing/", { failOnStatusCode: false });
    cy.location("pathname").should("eq", "/schedule-demo/");
    cy.location("search").should("eq", "?source=404");
    cy.contains("Get Started").should("be.visible");
  });

  it("keeps existing attribution when a retired URL is tagged", () => {
    cy.visit("/blog/some-old-post/?source=email", { failOnStatusCode: false });
    cy.location("pathname").should("eq", "/schedule-demo/");
    cy.location("search").should("eq", "?source=email");
  });
});
