import React from 'react'
import { saveToken } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(saveToken(username, password))
      .catch(() => {
        dispatch(setNotification('Wrong username or password', 'error'))
      })
  }
  return (
    <div>
      <h2>Login</h2>
      <Form  onSubmit={handleLogin}>
        <Form.Group>
          <div>
            <Form.Label>username</Form.Label>
            <Form.Control
              id='username'
              type="text"
              name="Username"
            />
          </div>
          <div>
            <Form.Label>password</Form.Label>
            <Form.Control
              id='password'
              type="password"
              name="Password"
            />
          </div>
          <Button variant="primary" id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )}

export default LoginForm