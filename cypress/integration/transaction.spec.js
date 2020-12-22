describe('Transactions', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.loginTestUser()
    cy.visit('/transactions')
  })

  it('can see all transaction', () => {
    cy.getEl('content').should('contain', 'Nordea -> Pohjola')
    cy.getEl('content').should('contain', 'Nordea -> Food')
  })

  it('can see account specific transactions', () => {
    cy.getEl('side-bar').contains('Pohjola').click()
    cy.getEl('content').should('contain', 'Nordea -> Pohjola')
    cy.getEl('content').should('not.contain', 'Nordea -> Food')
  })

  describe('Outflow', () => {
    beforeEach(() => {
      cy.getEl('add-transaction-button').click()
    })

    it('can add new outflow transaction', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('transaction-category').first().click()
      cy.getEl('menu-item').contains('Bills').click()
      cy.getEl('confirm-dialog-action').click()

      cy.getEl('content').should('contain', 'Nordea -> Bills')
      cy.getEl('side-bar').contains('Nordea').parent().should('contain', '8981EUR')
      cy.getEl('nav-link-budget').click()
      cy.getEl('content').contains('Bills').parent().should('contain', '80EUR')
    })

    it('cant add outflow transaction without selecting account', () => {
      cy.getEl('transaction-amount').type('20')
      cy.getEl('transaction-category').first().click()
      cy.getEl('menu-item').contains('Bills').click()
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Please choose an account')
    })

    it('cant add outflow transaction without entering amount', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-category').first().click()
      cy.getEl('menu-item').contains('Bills').click()
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Please enter the transaction amount')
    })

    it('cant add outflow transaction without selecting category', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Please choose a target category')
    })

    it('cant add outflow transaction if not budgeted enough to category', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('transaction-category').first().click()
      cy.getEl('menu-item').contains('Food').click()
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Please add more funds to selected category')
    })

    it('can add additional funds to category in transaction dialog', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('transaction-category').first().click()
      cy.getEl('menu-item').contains('Food').click()

      cy.getEl('add-funds-source').first().click()
      cy.getEl('source-option-account').click()
      cy.getEl('source-amount').type('20')

      cy.getEl('confirm-dialog-action').click()

      cy.getEl('content').should('contain', 'Nordea -> Food')
    })
  })

  describe('Inflow', () => {
    beforeEach(() => {
      cy.getEl('add-transaction-button').click()
      cy.getEl('transaction-dialog').contains('Inflow').click()
    })

    it('can add new inflow transaction', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('confirm-dialog-action').click()

      cy.getEl('side-bar').contains('Nordea').parent().should('contain', '9021EUR')
      cy.getEl('content').contains('Inflow').parent().should('contain', 'Nordea')
    })

    it('cant add inflow transaction without selecting account', () => {
      cy.getEl('transaction-amount').type('20')
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Please choose an account')
    })

    it('cant add outflow transaction without entering amount', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Please enter the transaction amount')
    })
  })

  describe('Transfer', () => {
    beforeEach(() => {
      cy.getEl('add-transaction-button').click()
      cy.getEl('transaction-dialog').contains('Transfer').click()
    })

    it('can add new transfer transaction', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('transaction-target-account').first().click()
      cy.getEl('menu-item').contains('Pohjola').click()
      cy.getEl('confirm-dialog-action').click()

      cy.getEl('content').should('contain', 'Nordea -> Pohjola')
      cy.getEl('side-bar').contains('Nordea').parent().should('contain', '8981EUR')
      cy.getEl('side-bar').contains('Pohjola').parent().should('contain', '1357EUR')
    })

    it('cant add transfer transaction without selecting source account', () => {
      cy.getEl('transaction-amount').type('20')
      cy.getEl('transaction-target-account').first().click()
      cy.getEl('menu-item').contains('Pohjola').click()
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Choose a source account')
    })

    it('cant add transfer transaction without entering amount', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-target-account').first().click()
      cy.getEl('menu-item').contains('Pohjola').click()
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Enter transfer amount')
    })

    it('cant add transfer transaction without selecting target account', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('20')
      cy.getEl('confirm-dialog-action').click()
      cy.getEl('transaction-dialog').should('contain', 'Choose a target account')
    })

    it('only transfer available funds', () => {
      cy.getEl('transaction-account').first().click()
      cy.getEl('menu-item').contains('Nordea').click()
      cy.getEl('transaction-amount').type('10000')
      cy.getEl('transaction-target-account').first().click()
      cy.getEl('menu-item').contains('Pohjola').click()
      cy.getEl('confirm-dialog-action').click()

      cy.getEl('side-bar').contains('Nordea').parent().should('contain', '0EUR')
      cy.getEl('side-bar').contains('Pohjola').parent().should('contain', '10338EUR')
    })
  })
})
