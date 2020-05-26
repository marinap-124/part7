import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
  notificationReduc: notificationReducer,
  blogReduc: blogReducer,
  userReduc: userReducer,
  usersReduc: usersReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
//console.log('STORE ', store.getState)

export default store