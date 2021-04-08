Cypress.Commands.add('addUser', ({ username, password }) => {
  cy.request({
    url: 'http://localhost:3003/api/users',
    method: 'POST',
    body: { username, password }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    url: 'http://localhost:3003/api/login',
    method: 'POST',
    body: { username, password }
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedBlogListUser')
  cy.visit('http://localhost:3000')
})