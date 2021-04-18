import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducer/blogReducer'
import { Form, Row, Button, Col, Table } from 'react-bootstrap'

const CommentList = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('')

  const createComment = event => {
    event.preventDefault()
    dispatch(addComment(blog.id, { content: comment.field.value }))
    comment.clear()
  }

  return (
    <div>
      <p></p>
      <h2>Comments</h2>
      <Form onSubmit={createComment}>
        <Row>
          <Col>
            <Form.Control {...comment.field}/>
          </Col>
          <Col>
            <Button type='submit'>Add comment</Button>
          </Col>
        </Row>
      </Form>
      <p></p>
      <Table>
        <tbody>
          {blog.comments.map(comment =>
            <tr key={comment.id}>
              <td>{comment.content}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default CommentList