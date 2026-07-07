const fillForm = (email = "pro-lead@example.com") => {
  cy.get('input[placeholder="Enter your full name"]').type("Test Professional");
  cy.get('input[placeholder="your.name@company.com"]').type(email);
  cy.get('input[placeholder="Enter your company name"]').type("Acme Health");
  cy.get('input[placeholder="Enter your job title"]').type("Billing Manager");
};

describe("schedule demo page", () => {
  it("blocks submission with an invalid email", () => {
    cy.intercept("POST", "**/ziggy/rest/demo_request/").as("demoRequest");
    cy.visit("/schedule-demo/");
    fillForm("not-an-email");
    cy.contains("button", "Get Started").click();

    cy.contains("Please enter a valid email").should("be.visible");
    cy.get("@demoRequest.all").should("have.length", 0);
  });

  it("submits the payload with ?source= attribution and shows the thank-you panel", () => {
    cy.intercept("POST", "**/ziggy/rest/demo_request/", {
      statusCode: 201,
      body: { status: "ok" },
    }).as("demoRequest");

    cy.visit("/schedule-demo/?source=news");
    fillForm();
    cy.contains("button", "Get Started").click();

    cy.wait("@demoRequest").its("request.body").should("deep.equal", {
      email: "pro-lead@example.com",
      name: "Test Professional",
      company: "Acme Health",
      role: "Billing Manager",
      source: "news",
      phone: "",
    });
    cy.contains("Thank you, Test!").should("be.visible");
    cy.contains("our team will reach out").should("be.visible");
  });

  it("prefers the selected source over the query param", () => {
    cy.intercept("POST", "**/ziggy/rest/demo_request/", {
      statusCode: 201,
      body: { status: "ok" },
    }).as("demoRequest");

    cy.visit("/schedule-demo/?source=news");
    fillForm();
    cy.get('input[placeholder="Select an option"]').click();
    cy.get('[role="option"]').contains("Colleague Referral").click();
    cy.contains("button", "Get Started").click();

    cy.wait("@demoRequest")
      .its("request.body.source")
      .should("eq", "colleague");
  });

  it("shows the support fallback and keeps the form for retry on failure", () => {
    cy.intercept("POST", "**/ziggy/rest/demo_request/", {
      statusCode: 500,
      body: { error: "boom" },
    }).as("demoRequest");

    cy.visit("/schedule-demo/");
    fillForm();
    cy.contains("button", "Get Started").click();

    cy.wait("@demoRequest");
    cy.contains("Something went wrong").should("be.visible");
    cy.contains("support42@fightpaperwork.com").should("be.visible");
    // The form stays up with the typed values for a retry.
    cy.get('input[placeholder="your.name@company.com"]').should(
      "have.value",
      "pro-lead@example.com",
    );
    cy.contains("button", "Get Started").should("be.visible");
  });
});
