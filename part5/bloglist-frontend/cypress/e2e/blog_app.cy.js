describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teppo Kuusisto',
      username: 'teppo',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('teppo')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Teppo Kuusisto logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('timo')
      cy.get('#password').type('turvalline')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('wrong username or password')
      cy.get('html').should('not.contain', 'MTeppo Kuusisto logged in')
    })
  })
})