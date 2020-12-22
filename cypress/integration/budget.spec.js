describe('Budget', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.loginTestUser()
    cy.visit('/')
  })

  it('can see already created categories', () => {
    cy.getEl('content').should('contain', 'Food')
  })

  it('can create category', () => {
    cy.getEl('add-category-button').click()
    cy.getEl('category-name-field').type('Gas')
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('content').should('contain', 'Gas')
  })

  it('can edit category', () => {
    cy.contains('Food').click()
    cy.getEl('edit-category-tab').click()
    cy.getEl('edit-category-field').type('2')
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('content').should('contain', 'Food2')
  })

  it('can delete category', () => {
    cy.contains('Food').click()
    cy.getEl('edit-category-tab').click()
    cy.getEl('delete-category-button').click()
    cy.getEl('confirm-dialog-action').contains('DELETE').click()
    cy.getEl('content').should('not.contain', 'Food')
  })

  it('can add funds to category & it reduces available amount from source', () => {
    cy.contains('Food').click()
    cy.getEl('add-funds-source').eq(0).click()
    cy.getEl('source-option-account').click()
    cy.getEl('source-amount').type('20')
    cy.getEl('confirm-dialog-action').click()
    cy.contains('Food').parent().should('contain', '20EUR')

    cy.contains('Food').click()
    cy.getEl('add-funds-source').eq(0).click()
    cy.getEl('source-option-account').should('contain', '8881EUR')
  })

  it('can move fund between categories', () => {
    cy.contains('Food').click()
    cy.getEl('add-funds-source').eq(0).click()
    cy.getEl('source-option').contains('Bills').click()
    cy.getEl('source-amount').type('20')
    cy.getEl('confirm-dialog-action').click()
    cy.contains('Food').parent().should('contain', '20EUR')
    cy.contains('Bills').parent().should('contain', '80EUR')
  })

  it('can add funds from multiple sources', () => {
    cy.contains('Food').click()
    cy.getEl('add-additional-source-button').click()

    cy.getEl('add-funds-source').eq(0).click()
    cy.getEl('source-option-account').click()
    cy.getEl('source-amount').eq(0).type('20')

    cy.getEl('add-funds-source').eq(2).click()
    cy.getEl('source-option').contains('Bills').click()
    cy.getEl('source-amount').eq(1).type('10')

    cy.getEl('confirm-dialog-action').click()

    cy.contains('Food').parent().should('contain', '30EUR')
    cy.contains('Bills').parent().should('contain', '90EUR')
  })

  it('cant add more funds than is in categroy', () => {
    cy.contains('Food').click()
    cy.getEl('add-funds-source').eq(0).click()
    cy.getEl('source-option').contains('Bills').click()
    cy.getEl('source-amount').type('200')
    cy.getEl('confirm-dialog-action').click()
    cy.contains('Food').parent().should('contain', '100EUR')
    cy.contains('Bills').parent().should('contain', '0EUR')
  })
})