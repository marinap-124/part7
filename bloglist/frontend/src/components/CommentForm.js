import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const handleCreating = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if(comment){
      dispatch(createComment(id, { content:comment }))
      event.target.comment.value = ''
    }
  }

  return (
    <form name='commentform' onSubmit={handleCreating}>
      <input id='comment' type="text" name="comment"/>
      <button id='creating-button' type='submit'>create comment</button>
    </form>
  )}

export default CommentForm