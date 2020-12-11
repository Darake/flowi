describe("flowi ", function() {
  before(() => {
    cy.request("POST", "/api/testing/setup");
  });

  beforeEach(function() {
    cy.request("POST", "/api/testing/reset");
    cy.visit("/");
  });

  it("front page can be opened", function() {
    cy.contains("flowi");
  });

  describe("when signed up", function() {
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

        it("account name can be changed", function() {
          cy.contains("Nordea").click();
          cy.contains("Account name").type("Nordea Gold");
          cy.contains("Save").click();
          cy.contains("Nordea Gold");
        })
      });
    });
  });

  after(() => {
    cy.request("POST", "/api/testing/cleanup");
  });
});
