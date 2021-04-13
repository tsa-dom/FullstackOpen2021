import axios from 'axios'
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async content => {
  try {
    const anecdote = { content, votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
  } catch (error) {
    return null
  }
}

const modifyAnecdote = async anecdote => {
  try {
    await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return true
  } catch (error) {
    return false
  }
}

export default { getAll, createAnecdote, modifyAnecdote }