const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return null
    default: return state
  }
}

let timeOutId

export const setNotification = (message, seconds) => {
  clearTimeout(timeOutId)
  return async dispatch => {
    timeOutId = setTimeout(() => dispatch({ type: 'HIDE' }), 1000 * seconds)
    dispatch({
      type: 'SHOW',
      data: message
    })
  }
}

export default notificationReducer