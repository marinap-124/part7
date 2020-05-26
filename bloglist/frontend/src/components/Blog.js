import React, { useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRouteMatch } from 'react-router-dom'
import { retrieveToken } from '../reducers/userReducer'
import CommentForm from './CommentForm'


const Blog = () => {
  const blogs = useSelector(state => state.blogReduc)
  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')

  useEffect(() => {
    dispatch(retrieveToken())
  },[dispatch])

  const user = useSelector(state => state.userReduc)

  const  blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  const updateBlog = (blog) => {
    dispatch(updateLikes(blog))
      .then(() => dispatch(setNotification(`Updated '${blog.title}' `, 'message')))
      .catch(error => {
        dispatch(setNotification(`Error updating blog '${blog.title}' '${error}' `, 'error'))
      })
  }

  const deletingBlog = blog => {
    dispatch(deleteBlog(blog.id))
      .then(() => {
        dispatch(setNotification(`Deleted '${blog.title}' `, 'message'))
      })
      .catch(error => {
        dispatch(setNotification(`Error deleting blog '${blog.title}' '${error}' `, 'error'))
      })
  }


  return (
    <div >
      <h3>{blog.title}&nbsp;{blog.author }</h3>

      <br/>
      <div>
        <a href={blog.url }>{blog.url }</a> <br/>
        <span id='likes'>{blog.likes } likes</span>

        <button id='likes-button'  type="text" onClick={() => updateBlog(blog)}>
          like
        </button>
        <br/>
        added by {user.name}
        <br/>
        {(blog.user && user && user.username===blog.user.username)&&
          <button onClick={() => {if (window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {deletingBlog(blog) }}}>
            remove
          </button>
        }
      </div>

      <div>
        <h5>comments</h5>
        <CommentForm id={blog.id}/>
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </div>

    </div>
  )}

export default Blog
