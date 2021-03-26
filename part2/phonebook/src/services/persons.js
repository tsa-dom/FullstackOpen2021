import axios from 'axios'
const dbUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(dbUrl)
  return request.then(response => response.data)
}

const addPerson = newPerson => {
  const request = axios.post(dbUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = person => {
  return axios.delete(`${dbUrl}/${person.id.toString()}`)
}

const changeInfo = person => {
  return axios.put(`${dbUrl}/${person.id.toString()}`, person)
}

export default { getAll, addPerson, deletePerson, changeInfo }