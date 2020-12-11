describe('Authentication', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe('Sign up validation', () => {
    beforeEach(() => {
      cy.get('[data-cy=sign-up-button]').click()
    })

    it('cant sign up without email', () => {
      cy.getEl('password-field').type('password')
      cy.getEl('currency-field').eq(0).click()
      cy.getEl('eur-option').click()
      cy.getEl('confirm-signup-button').click()
      cy.getEl('email-field').should('contain', 'Email address required')
    })

    it('cant sign up without password', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('currency-field').eq(0).click()
      cy.getEl('eur-option').click()
      cy.getEl('confirm-signup-button').click()
      cy.getEl('password-field').should('contain', 'Password required')
    })

    it('cant sign up without selecting currency', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('password-field').type('password')
      cy.getEl('confirm-signup-button').click()
      cy.getEl('currency-field').should('contain', 'Please choose a currency')
    })

    it('cant sign up with invalid email format', () => {
      cy.getEl('email-field').type('testemail.com')
      cy.getEl('password-field').type('password')
      cy.getEl('currency-field').eq(0).click()
      cy.getEl('eur-option').click()
      cy.getEl('confirm-signup-button').click()
      cy.getEl('email-field').should('contain', 'Invalid email format')
    })

    it('can sign up with valid info', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('password-field').type('password')
      cy.getEl('currency-field').eq(0).click()
      cy.getEl('eur-option').click()
      cy.getEl('confirm-signup-button').click()
      cy.getEl('initial-account-creation').should('contain', 'Account creation')
    })

    it('cant sign up with already taken email', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('password-field').type('password')
      cy.getEl('currency-field').eq(0).click()
      cy.getEl('eur-option').click()
      cy.getEl('confirm-signup-button').click()
      cy.getEl('auth-view').should('contain', 'The email address might already be taken.')
    })
  })

  describe('Log in validation', () => {
    it('cant login without email', () => {
      cy.getEl('password-field').type('password')
      cy.getEl('log-in-button').click()
      cy.getEl('email-field').should('contain', 'Email address required')
    })

    it('cant login without password', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('log-in-button').click()
      cy.getEl('password-field').should('contain', 'Password required')
    })

    it('cant login with invalid login credentials', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('password-field').type('wrongpassword')
      cy.getEl('log-in-button').click()
      cy.getEl('auth-view').should('contain', 'Incorrect email or password')
    })

    it('can login with right credentials', () => {
      cy.getEl('email-field').type('test@email.com')
      cy.getEl('password-field').type('password')
      cy.getEl('log-in-button').click()
      cy.getEl('initial-account-creation').should('contain', 'Account creation')
    })
  })
});
