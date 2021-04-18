import React from 'react'
import { useSelector } from 'react-redux'
import { Nav, Button, Navbar, FormLabel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
  const user = useSelector(state => state.user)

  const padding = { padding: 5, marginRight: 20 }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload(false)
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <LinkContainer style={padding} to='/blogs'>
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer style={padding} to='/users'>
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          <Nav.Link style={padding} as='span'>{user.username} logged in</Nav.Link>
          <Button style={padding} onClick={handleLogout}>Log out</Button>
          <FormLabel></FormLabel>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu