import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState([null, ''])
  const blogFormRef = useRef()

  blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, color) => {
    setNotification([message, color])
    setTimeout(() => {
      setNotification([null, ''])
    }, 5000)
  }

  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      showNotification('wrong username or password', 'red')
    }
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.createBlog(blogObject)
    if (blog) {
      blogService.getAll().then(blogs => setBlogs(blogs))
      showNotification(`a new blog ${blog.title} by ${blog.author} added`, 'green')
    } else {
      showNotification('title and url are required', 'red')
    }
  }

  const modifyBlog = async (blogObject) => {
    blogObject.likes += 1
    const blog = await blogService.modifyBlog(blogObject)
    if (blog) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    } else showNotification('blog modification failed', 'red')
  }

  const deleteBlog = async (blogObject) => {
    let blog = false
    if (window.confirm(`Remove blog ${blogObject.title} ${blogObject.author}`)) {
      blog = await blogService.deleteBlog(blogObject)
    }

    if (blog) {
      blogService.getAll().then(blogs => setBlogs(blogs))
      showNotification('blog removed', 'green')
    } else showNotification('blog removal failed', 'red')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const createBlogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )


  return (
    <div>
      {user === null && <div>
        <h2>Log in to application</h2>
        <Notification message={notification[0]} color={notification[1]} />
        <LoginForm loginUser={loginUser} />
      </div>}
      {user !== null && <div>
        <h2>blogs</h2>
        <Notification message={notification[0]} color={notification[1]} />
        <p>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        {createBlogForm()}
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            modifyBlog={modifyBlog}
            deleteBlog={deleteBlog}
          />
        )}
      </div>}
    </div>
  )
}

export default App