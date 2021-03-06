import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = {}, action) => {

  switch (action.type) {
  case 'SET_TOKEN':
    return action.user

  case 'RETRIEVE_TOKEN':
    return action.user

  case 'REMOVE_TOKEN':
    return null

  default:
    return state
  }
}

export const saveToken = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_TOKEN',
      user: user
    })
  }
}

export const retrieveToken = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }

    dispatch({
      type: 'RETRIEVE_TOKEN',
      user: user
    })
  }
}


export const removeToken = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')

    blogService.setToken(null)

    dispatch({
      type: 'REMOVE_TOKEN',
    })
  }
}

export default userReducer