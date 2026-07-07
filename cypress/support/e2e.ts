// Global guard: CI must NEVER reach the real backend. A real demo_request
// submission emails the team and the connector partner. E2E bundles are
// built with API_HOST=https://api-stub.fightpaperwork.invalid (which cannot
// resolve), and this intercept fails any test that still tries to talk to
// the production API. Test-specific intercepts are registered later and
// therefore take precedence (Cypress matches intercepts newest-first).
beforeEach(() => {
  cy.intercept({ url: "https://api.fightpaperwork.com/**" }, () => {
    throw new Error(
      "Blocked a request to the real API from e2e tests. " +
        "Stub it with cy.intercept instead.",
    );
  });
});
