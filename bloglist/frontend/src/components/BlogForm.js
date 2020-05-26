import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { saveBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const createBlog = (blogObject) => {
    dispatch(saveBlog(blogObject))
      .then(() => dispatch(setNotification(`Added '${blogObject.title}' `, 'message')))
      .catch(error => {
        dispatch(setNotification(`Error adding blog '${blogObject.title}' '${error}' `, 'error'))
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        Title: <input className="form-control" id='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br/>
        Author: <input className="form-control" id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br/>
        Url: <input className="form-control" id='url'
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br/>
        <button className='btn btn-primary' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm