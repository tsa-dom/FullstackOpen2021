import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newBlog => {
  try {
    const response = await axios.post(baseUrl, newBlog, getConfig())
    return response.data
  } catch (error) {
    return null
  }
}

const modifyBlog = async blogToModified => {
  try {
    await axios.put(`${baseUrl}/${blogToModified.id}`, blogToModified, getConfig())
    return true
  } catch (error) {
    return false
  }
}

const deleteBlog = async blogToDelete => {
  try {
    await axios.delete(`${baseUrl}/${blogToDelete.id}`, getConfig())
    return true
  } catch (error) {
    return false
  }
}

export default { getAll, setToken, createBlog, modifyBlog, deleteBlog }