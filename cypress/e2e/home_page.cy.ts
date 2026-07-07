describe("home page", () => {
  it("links patients to Fight Health Insurance", () => {
    cy.visit("/");
    // Assert the attribute; never actually navigate cross-origin.
    cy.contains("a", "I'm a Patient").should(
      "have.attr",
      "href",
      "https://fighthealthinsurance.com",
    );
    cy.contains("a", "For Patients").should(
      "have.attr",
      "href",
      "https://fighthealthinsurance.com",
    );
  });

  it("routes professionals to the demo request form", () => {
    cy.visit("/");
    cy.contains("a", "I'm a Professional").click();
    cy.location("pathname").should("eq", "/schedule-demo/");
  });

  it("subscribes to the mailing list with the entered details", () => {
    cy.intercept("POST", "**/ziggy/rest/mailinglist_subscribe/", {
      statusCode: 201,
      body: { status: "subscribed" },
    }).as("subscribe");

    cy.visit("/");
    cy.contains("Subscribe for Updates!").scrollIntoView();
    cy.get("form").within(() => {
      cy.get("input").eq(0).type("Test User");
      cy.get('input[type="email"]').type("testuser@example.com");
      cy.contains("button", "Subscribe").click();
    });

    cy.wait("@subscribe").its("request.body").should("deep.equal", {
      email: "testuser@example.com",
      name: "Test User",
    });
    cy.contains("Thank you for subscribing!").should("be.visible");
  });

  it("shows an error and keeps the form when subscribing fails", () => {
    cy.intercept("POST", "**/ziggy/rest/mailinglist_subscribe/", {
      statusCode: 500,
      body: { error: "boom" },
    }).as("subscribe");

    cy.visit("/");
    cy.get("form").within(() => {
      cy.get("input").eq(0).type("Test User");
      cy.get('input[type="email"]').type("testuser@example.com");
      cy.contains("button", "Subscribe").click();
    });

    cy.wait("@subscribe");
    cy.contains("Subscription failed").should("be.visible");
    cy.get('input[type="email"]').should("have.value", "testuser@example.com");
  });
});
