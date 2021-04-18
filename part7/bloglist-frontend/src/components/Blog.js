import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { modifyBlog, deleteBlog } from '../reducer/blogReducer'
import { setNotification } from '../reducer/notificationReducer'
import { Table, Button } from 'react-bootstrap'
import CommentList from './CommentList'

const Blog = ({ blog }) => {
  if (!blog) return null
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [likes, setLikes] = useState(blog.likes)
  const history = useHistory()

  const like = (event) => {
    event.preventDefault()
    setLikes(likes + 1)
    blog.likes = likes + 1
    dispatch(modifyBlog(blog))
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    } else dispatch(setNotification('Blog removal failed', 'danger', 5))
  }

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <Table striped>
        <tbody>
          <tr>
            <td style={{ width: 400 }}>Url</td>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <td>Likes</td>
            <td>
              {blog.likes}
            </td>
          </tr>
          <tr>
            <td>Added by</td>
            <td>{blog.user.username}</td>
          </tr>
        </tbody>
      </Table>
      <Button style={{ marginRight: 15 }} onClick={like}>Like</Button>
      {user.username === blog.user.username &&
        <Button onClick={remove}>Remove blog</Button>}
      <CommentList blog={ blog }/>
    </div>
  )
}

export default Blog