import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'SAVE_BLOG':
    return [...state, action.data]

  case 'UPDATE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )

  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)

  case 'INIT_BLOGS':
    return action.data

  case 'CREATE_COMMENT':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )

  default:
    return state
  }
}

export const saveBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'SAVE_BLOG',
      data: newBlog,
    })
  }
}

export const updateLikes = blog => {

  return async dispatch => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }


    const updatedBlog = await blogService.update(blog.id, changedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = id => {

  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const createComment = (id, comment ) => {
  return async dispatch => {
    const updatedBlog = await blogService.createComment(id, comment)
    dispatch({
      type: 'CREATE_COMMENT',
      data: updatedBlog,
    })
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer