import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useField } from '../hooks'
import { LOGIN } from '../queries'
import Notification from './Notification'

const Login = ({ show, setToken }) => {
  const [error, setError] = useState('')
  const username = useField('')
  const password = useField('password')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-app-user-token', token)
    }
  }, [result.data, setToken])

  if (!show) return null

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username: username.field.value, password: password.field.value } })
    username.clear()
    password.clear()
  }

  return (
    <div>
      <h2>login</h2>
      <Notification message={error} />
      <form onSubmit={submit}>
        <div>
          name
          <input {...username.field} />
        </div>
        <div>
          password
          <input {...password.field} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login