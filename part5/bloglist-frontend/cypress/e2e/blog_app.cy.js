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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('teppo')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('.inputTitle').type('test blog')
      cy.get('.inputAuthor').type('Simo Pajunen')
      cy.get('.inputUrl').type('https://blog.fi')
      cy.contains('Create').click()

      cy.contains('test blog, Simo Pajunen')
      cy.contains('show').click()
      cy.contains('test blog, Simo Pajunen')
      cy.contains('https://blog.fi')
      cy.contains('likes 0')
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        cy.addBlog({ title: 'testi', author: 'Matti', url: 'test.com' })
      })

      it('blog can be liked', function () {
        cy.contains('show').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('blog can be deleted by its creator', function () {
        cy.contains('testi, Matti')
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'testi, Matti')
      })

      it('blogs ordered by likes', function () {
        cy.addBlog({ title: 'The title with the most likes', author: 'Matti', url: 'test.com' })

        //show both blogs
        cy.contains('show').click()
        cy.contains('show').click()

        cy.get('.blog').eq(0).should('contain', 'testi')
        cy.get('.blog').eq(1).should('contain', 'The title with the most likes')

        cy.contains('The title with the most likes, Matti').parent().find('#likeButton').click().wait(500)
        cy.contains('The title with the most likes, Matti').parent().find('#likeButton').click().wait(500)

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'testi')

      })
    })
  })
})