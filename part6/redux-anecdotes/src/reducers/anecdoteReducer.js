import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const change = action.data
      return state.map(anecdote => anecdote.id !== change.id ? anecdote : change)
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    anecdote.votes += 1
    await anecdoteService.modifyAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer