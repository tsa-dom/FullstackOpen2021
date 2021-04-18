import React from 'react'
import Notification from '../components/Notification'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { loginUser } from '../reducer/userReducer'
import { Form, Col, Row, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  const login = (event) => {
    event.preventDefault()
    dispatch(loginUser({
      username: username.field.value,
      password: password.field.value
    }))
    username.clear()
    password.clear()
  }

  return (
    <Form onSubmit={login}>
      <Form.Group as={Row}>
        <h1 style={{ paddingBottom: 10, paddingTop: 10 }}>Log in to application</h1>
      </Form.Group>
      <Notification />
      <Form.Group as={Row}>
        <Form.Label column sm={1}>Username:</Form.Label>
        <Col xs={4}>
          <Form.Control {...username.field} placeholder='username'/>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1}>Password:</Form.Label>
        <Col xs={4}>
          <Form.Control {...password.field} placeholder='password'/>
        </Col>
      </Form.Group>
      <Button type='submit'>Log in</Button>
    </Form>
  )
}

export default LoginForm