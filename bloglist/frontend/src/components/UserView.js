import React from 'react'
// import { useDispatch } from 'react-redux'
// import { removeToken } from '../reducers/userReducer'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  //const dispatch = useDispatch()
  const users = useSelector(state => state.usersReduc)
  console.log('USERS', users)
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  console.log('USER', user)

  if (!user) {
    return null
  }

  return (
    <div>
      <div>
        <h3>{user.name} </h3>
        <h4>added blogs</h4>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}> {blog.title} </li>
          )}
        </ul>
      </div>
    </div>
  )}

export default UserView