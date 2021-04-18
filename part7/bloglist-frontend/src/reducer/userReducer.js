import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.data
    default: return state
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const loginUser = userObject => {
  return async dispatch => {
    const user = await loginService.login(userObject)
    if (user) {
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      dispatch(setUser(user))
    } else dispatch(setNotification('Wrong username or password', 'danger', 5))
  }
}

export default userReducer