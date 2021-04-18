import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ASSIGN_USERS':
      return action.data
    default: return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'ASSIGN_USERS',
      data: users
    })
  }
}

export default usersReducer