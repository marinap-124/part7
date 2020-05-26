import React from 'react'
import { useDispatch } from 'react-redux'
import { removeToken } from '../reducers/userReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(removeToken())
  }

  return (
    // <form name='logoutform' onSubmit={handleLogout}>
    <form name='logoutform' onSubmit={handleLogout}>
      {/* <button id='logout-button' type='submit'>logout</button> */}
      <button  type="submit" className="btn btn-link  btn-anchor">Logout</button>
    </form>
  )}

export default LogoutForm