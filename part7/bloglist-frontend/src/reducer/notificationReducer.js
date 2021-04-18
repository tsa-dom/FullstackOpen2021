const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return null
    default: return state
  }
}

let timeoutId

export const setNotification = (message, type, seconds) => {
  clearTimeout(timeoutId)
  return async dispatch => {
    timeoutId = setTimeout(() => dispatch({ type: 'HIDE' }) , 1000 * seconds)
    dispatch({
      type: 'SHOW',
      data: {
        message,
        type
      }
    })
  }
}

export default notificationReducer