describe("flowi ", function() {
  beforeEach(() => {
    cy.request("POST", "/api/testing/reset");
    cy.visit("/");
  });

  it("front page can be opened", function() {
    cy.contains("Hello");
  });

  it("authentication works", function() {
    cy.contains("SIGN UP").click();
    cy.contains("email").type("tester@example.com");
    cy.contains("password").type("password");

    cy.contains("Log out").click();

    cy.contains("LOG IN").click();
    cy.contains("email").type("tester@example.com");
    cy.contains("password").type("password");
    cy.contains("LOG IN").click();

    cy.contains("Log out");
  });
});
