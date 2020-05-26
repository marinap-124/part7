import React, { useEffect } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs = useSelector(state => state.blogReduc.sort((a, b) => b.likes-a.likes))

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}

      <Table striped>
        <thead>
          <tr>
            <th scope="col">title</th>
            <th scope="col">author</th>

          </tr>
        </thead>

        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>&nbsp;
              </td>
              <td> {blog.author} </td>
            </tr>
          )}
        </tbody>
      </Table>

    </div>
  )}

export default Blogs