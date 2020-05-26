import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector(state => state.usersReduc)



  return (
    <div>
      <h2>Users</h2>

      <Table striped>
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">blogs</th>

          </tr>
        </thead>

        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>&nbsp;
              </td>
              <td> {user.blogs.length} </td>
            </tr>
          )}
        </tbody>
      </Table>

    </div>
  )}

export default Users