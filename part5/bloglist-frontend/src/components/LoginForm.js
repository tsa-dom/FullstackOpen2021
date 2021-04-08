import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = (event) => {
    event.preventDefault()
    loginUser({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          username <input
            id='username'
            type='text'
            name='Username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password <input
            id='password'
            type='password'
            name='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm