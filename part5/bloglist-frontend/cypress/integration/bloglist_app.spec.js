describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser({ username: 'tester', password: 'secret' })
    cy.addUser({ username: 'jest', password: 'jester' })
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Log in to application')
      cy.get('.notification').should('contain', 'wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jest', password: 'jester' })
      cy.createBlog({ title: 'xxxx', author: 'yyyy', url: 'zzzz' })
      cy.createBlog({ title: 'rrrr', author: 'uuuu', url:'hhhh' })
      cy.logout()
      cy.login({ username: 'tester', password: 'secret' })
      cy.createBlog({ title: 'example', author: 'authorable', url: 'likeable' })
      cy.createBlog({ title: 'second', author: 'unauthorable', url: 'likeable' })
    })

    it('A blog can be created', function() {
      cy.get('#create').click()
      cy.get('#title').type('this is')
      cy.get('#author').type('my new')
      cy.get('#url').type('blog app')
      cy.get('#createNew').click()

      cy.contains('this is my new')
      cy.get('.notification').should('contain', 'a new blog this is by my new added')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog can be liked', function() {
      cy.get('#example').click()
      cy.get('.likeCount').contains('likes 0')
      cy.contains('example authorable').parent().find('#like').click()
      cy.get('.likeCount').contains('likes 1')
    })

    it('A blog can be deleted by logged user', function() {
      cy.contains('example authorable')
      cy.get('#example').click()
      cy.get('#remove').click()
      cy.should('not.contain', 'example authorable')
      cy.get('.notification').should('contain', 'blog removed')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog cannot be deleted if it is not created by logged user', function() {
      cy.contains('xxxx yyyy')
      cy.get('#xxxx').click()
      cy.should('not.contain', 'remove')
    })

    it('Blogs are ordered so the blog with the highest number of likes being first', function() {
      function repeat(element, count) {
        let i = 0
        for (i; i < count; i++) cy.contains(element).parent().find('#like').click()
      }
      cy.get('#example').click()
      cy.get('#second').click()
      cy.get('#xxxx').click()
      repeat('example', 10)
      repeat('second', 7)
      repeat('xxxx', 3)
      const order = ['example', 'second', 'xxxx', 'rrrr']
      let i = 0
      cy.get('.blogContent').each(content => {
        cy.get(content).should('contain', order[i])
        i++
      })
    })
  })
})