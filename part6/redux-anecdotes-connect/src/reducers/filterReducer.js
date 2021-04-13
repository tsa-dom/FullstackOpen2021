const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'MODIFY':
      return action.content.trim().toLowerCase()
    default: return state
  }
}

export const modify = content => {
  return {
    type: 'MODIFY',
    content: content
  }
}


export default filterReducer