import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'ASSIGN_BLOGS':
      return action.data
    case 'MODIFY_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'ERROR':
      return state
    default: return state
  }
}

const assignBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ASSIGN_BLOGS',
      data: blogs
    })
  }
}

export const initBlogs = () => assignBlogs()

export const addBlog = blogObject => {
  return async dispatch => {
    const blog = await blogService.createBlog(blogObject)
    if (blog) {
      dispatch(assignBlogs())
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added`, 'success', 5))
    } else {
      dispatch({ type: 'ERROR' })
      dispatch(setNotification('Title and url are required', 'danger', 5))
    }
  }
}

export const modifyBlog = blog => {
  return async dispatch => {
    if (await blogService.modifyBlog(blog)) {
      dispatch({
        type: 'MODIFY_BLOG',
        data: blog
      })
    } else {
      dispatch({ type: 'ERROR' })
      dispatch(setNotification('Blog modification failed', 'danger', 5))
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    if (await blogService.deleteBlog(blog)) {
      dispatch({
        type: 'DELETE_BLOG',
        data: blog
      })
      dispatch(setNotification('Blog removed', 'success', 5))
    } else {
      dispatch({ type: 'ERROR' })
      dispatch(setNotification('Blog removal failed', 'danger', 5))
    }
  }
}

export const addComment = (id, commentObject) => {
  return async dispatch => {
    const blog = await blogService.createComment(id, commentObject)
    if (blog) dispatch(assignBlogs())
  }
}

export default blogReducer