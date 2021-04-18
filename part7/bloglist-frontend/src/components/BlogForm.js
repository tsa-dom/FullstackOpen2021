import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducer/blogReducer'
import { Form, Button, FormGroup } from 'react-bootstrap'

const BlogForm = ({ togler }) => {
  const dispatch = useDispatch()
  const title = useField('')
  const author = useField('')
  const url = useField('')
  const createBlog = (event) => {
    event.preventDefault()
    togler.toggle()
    dispatch(addBlog({
      title: title.field.value,
      author: author.field.value,
      url: url.field.value
    }))
    title.clear()
    author.clear()
    url.clear()
  }

  return (
    <Form onSubmit={createBlog}>
      <h2>Create blog</h2>
      <FormGroup>
        <Form.Label>Title</Form.Label>
        <Form.Control {...title.field} placeholder='Enter title'/>
      </FormGroup>
      <FormGroup>
        <Form.Label>Author</Form.Label>
        <Form.Control {...author.field} placeholder='Enter author'/>
      </FormGroup>
      <FormGroup>
        <Form.Label>Url</Form.Label>
        <Form.Control {...url.field} placeholder='Enter url'/>
      </FormGroup>
      <Button style={{ marginRight: 15 }} variant='primary' type='submit'>Create blog</Button>
      <Button variant='primary' onClick={togler.toggle}>cancel</Button>
    </Form>
  )
}

BlogForm.propTypes = {
  togler: PropTypes.object.isRequired
}

export default BlogForm