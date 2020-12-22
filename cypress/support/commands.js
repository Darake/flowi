// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const TEST_USER = { email: 'admin@example.com', password: 'admin1' }

Cypress.Commands.add('setupTesting', () => cy.request("POST", "/api/testing/setup"));
Cypress.Commands.add('cleanupTesting', () => cy.request("POST", "/api/testing/cleanup"));
Cypress.Commands.add('resetDatabase', () => cy.request("POST", "/api/testing/reset"));

Cypress.Commands.add('loginTestUser', () => {
  cy.request("POST", "/api/login", { email: TEST_USER.email, password: TEST_USER.password })
    .then(resp => window.localStorage.setItem('loggedFlowiUser', JSON.stringify(resp.body)))
})

Cypress.Commands.add('getEl', (dataCy) => cy.get(`[data-cy=${dataCy}]`))