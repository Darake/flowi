describe("flowi ", function() {
  beforeEach(() => {
    cy.request("POST", "/api/reset");
    cy.visit("/");
  });

  it("front page can be opened", function() {
    cy.contains("flowi");
  });

  it("authentication works", function() {
    cy.contains("SIGN UP").click();
    cy.get('[placeholder="Email"]').type("tester@example.com");
    cy.get('[placeholder="Password"]').type("password");

    cy.wait(400);
    cy.contains("CONFIRM").click();

    cy.contains("LOG OUT").click();

    cy.get('[placeholder="Email"]').type("tester@example.com");
    cy.get('[placeholder="Password"]').type("password");
    cy.contains("CONFIRM").click();

    cy.contains("LOG OUT");
  });
});
