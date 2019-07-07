describe('flowi ', function() {
    it('front page can be opened', function() {
      cy.visit('/')
      cy.contains('Hello')
    })
  })