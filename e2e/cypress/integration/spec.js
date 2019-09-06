describe("flowi ", function() {
  beforeEach(function() {
    cy.request("POST", "/api/reset");
    cy.visit("/");
  });

  it("front page can be opened", function() {
    cy.contains("flowi");
  });

  describe("when account created", function() {
    beforeEach(function() {
      cy.contains("SIGN UP").click();
      cy.get('[placeholder="Email"]').type("tester2@example.com");
      cy.get('[placeholder="Password"]').type("password");
      cy.contains("CONFIRM").click();
      cy.contains("LOG OUT").click();
    });

    describe("and logged in", function() {
      beforeEach(function() {
        cy.get('[placeholder="Email"]').type("tester2@example.com");
        cy.get('[placeholder="Password"]').type("password");
        cy.contains("LOG IN").click();
      });

      describe("and an account has been created", function() {
        beforeEach(function() {
          cy.contains("Account name").type("Nordea");
          cy.contains("Current balance").type("500");
          cy.contains("CREATE").click();
          cy.contains("Nordea");
        });

        it("new account creation and deletion works", function() {
          cy.contains("Add Account").click();
          cy.contains("Account name").type("Danske");
          cy.contains("Current balance").type("9001");
          cy.contains("CREATE").click();

          cy.contains("Danske").click();
          cy.contains("Delete account").click();
          cy.contains("CONFIRM").click();

          expect("Danske").to.not.exist();
        });
      });
    });
  });
});
