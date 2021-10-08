import axios from 'axios'

const client = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default client