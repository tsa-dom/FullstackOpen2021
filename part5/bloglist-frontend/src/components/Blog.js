import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, modifyBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenView = { display: visible ? 'none' : '' }
  const showWhenView = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const modify = (event) => {
    event.preventDefault()
    setLikes(likes + 1)
    blog.likes = likes
    modifyBlog(blog)
  }

  const remove = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <span className='blogContent'>{blog.title} {blog.author}</span>
      <label style={hideWhenView} className='hide'>
        <button id={blog.title} onClick={toggleVisibility}>view</button>
      </label>
      <label style={showWhenView} className='view'>
        <button id={blog.title} onClick={toggleVisibility}>hide</button>
        <div> {blog.url} </div>
        <div className='likeCount'>
          likes {blog.likes}
          <button id='like' onClick={modify}>like</button>
        </div>
        <div> {blog.user.username} </div>
        {user.username === blog.user.username &&
          <button id='remove' onClick={remove}>remove
          </button>}
      </label>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  modifyBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog