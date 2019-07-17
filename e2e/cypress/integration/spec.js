describe("flowi ", function() {
  beforeEach(() => {
    cy.request("POST", "/api/testing/reset");
    cy.visit("/");
  });

  it("front page can be opened", function() {
    cy.contains("Hello");
  });

  it("login functionality works", function() {
    cy.contains("Register").click();
    cy.get("[data-cy=username]").type("tester");
    cy.get("[data-cy=password").type("password");
    cy.get("[data-cy=email").type("tester@example.com");

    cy.contains("Logout").click();

    cy.contains("Login").click();
    cy.get("[data-cy=username]").type("tester");
    cy.get("[data-cy=password]").type("password");
    cy.contains("Login").click();

    cy.contains("Logout");
  });
});
