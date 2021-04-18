import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducer/blogReducer'
import { initUsers } from './reducer/usersReducer'
import { setUser } from './reducer/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useResource } from './hooks'

const App = () => {
  const dispatch = useDispatch()
  const service = useResource()
  blogService.initService(service)
  userService.initService(service)
  loginService.initService(service)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) dispatch(setUser(JSON.parse(loggedUserJSON)))
  }, [dispatch])

  const loggedUser = useSelector(state => state.user)

  const users = useSelector(state => state.users.sort((a, b) => b.blogs.length - a.blogs.length))
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  return (
    <div className='container'>
      {loggedUser === null && <div>
        <LoginForm />
      </div>}
      {loggedUser !== null && <div>
        <Menu />
        <h1>Blog app</h1>
        <Notification />
        <p></p>
        <Switch>
          <Route path='/users/:id'>
            <User user={user}/>
          </Route>
          <Route path='/users'>
            <UserList users={users}/>
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blog}/>
          </Route>
          <Route path='/'>
            <Blogs blogs={blogs}/>
          </Route>
        </Switch>
      </div>}
    </div>
  )
}

export default App