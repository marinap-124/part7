
const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data

  case 'HIDE_NOTIFICATION':
    return action.data


  default:
    return state
  }
}

let timeoutID
export const setNotification = (notification, style) => {

  return async dispatch => {

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification: notification, style: style }
    })

    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {dispatch({
      type: 'HIDE_NOTIFICATION',
      data: { notification: null, style: null }
    })}, 5000)

  }
}


export default notificationReducer