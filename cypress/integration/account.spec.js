describe('Account', () => {
  beforeEach(() => {
    cy.loginTestUser()
    cy.visit('/')
  })

  it('can see already created accounts', () => {
    cy.getEl('side-bar').should('contain', 'Nordea')
  })

  it('cant create new account without a name', () => {
    cy.getEl('add-account-button').click()
    cy.getEl('account-balance-field').type('100')
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('account-creation-dialog').should('contain', 'Account name required')
  })

  it('cant create new account without a balance', () => {
    cy.getEl('add-account-button').click()
    cy.getEl('account-name-field').type('Danske')
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('account-creation-dialog').should('contain', 'Starting balance required')
  })

  it('cant type letters into balane', () => {
    cy.getEl('add-account-button').click()
    cy.getEl('account-name-field').type('Danske')
    cy.getEl('account-balance-field').type('letters')
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('account-creation-dialog').should('contain', 'Starting balance required')
  })

  it('can create a new account', () => {
    cy.getEl('add-account-button').click()
    cy.getEl('account-name-field').type('Danske')
    cy.getEl('account-balance-field').type('1337')
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('side-bar').should('contain', 'Danske')
  })

  it('can edit account name', () => {
    cy.contains('Nordea').click()
    cy.getEl('edit-account-button').click()
    cy.getEl('account-name-edit-field').type('Edited')
    cy.getEl('save-account-edit-button').click()
    cy.getEl('side-bar').should('contain', 'NordeaEdited')
  })

  it('cant save account name edit with empty name', () => {
    cy.contains('Nordea').click()
    cy.getEl('edit-account-button').click()
    cy.getEl('account-name-edit-field').get('input').clear()
    cy.getEl('save-account-edit-button').click()
    cy.getEl('side-bar').should('contain', 'Nordea')
  })

  it('can delete an account', () => {
    cy.contains('Nordea').click()
    cy.getEl('delete-account-button').click()
    cy.getEl('confirm-dialog-action').click()
    cy.getEl('side-bar').should('not.contain', 'Nordea')
  })
})