import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'

const Notification = ({ text, color }) => {
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (text !== null) {
    return (
      <div style={style} className='notification'>
        {text}
      </div>
    )
  }
  return null;
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationColor, setColor ] = useState('green')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initData => setPersons(initData))
  }, [])

  const handleFilterChange = event => { setNewFilter(event.target.value)}
  
  const timeOut = () => setTimeout(() => setNotification(null), 4000)
  
  const addPerson = event => {
    event.preventDefault()
    const samePersons = persons.filter(person => person.name === newName.trim())
    if (samePersons.length === 0) {
      const personObject = {
        name: newName.trim(),
        number: newNumber.trim()
      }
      personService
        .addPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setColor('green')
          setNotification(`Added ${response.name}`)
          timeOut()
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number wiht a new one?`)) {
        const personObject = {
          name: samePersons[0].name,
          number: newNumber.trim(),
          id: samePersons[0].id
        }
        personService
          .changeInfo(personObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== personObject.id ? p : personObject))
            setColor('green')
            setNotification(`Modified ${personObject.name}`)
            timeOut()
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = event => {
    event.preventDefault()
    const person = persons.filter(p => p.id === Number(event.target.value))[0]
    if (window.confirm(`Delete ${person.name} ?`) === true) {
      personService
        .deletePerson(person)
        .then(() => {
          setNotification(`Deleted ${person.name}`)
          timeOut()
        })
        .catch(error => {
          setColor('red')
          setNotification(`Information of ${person.name} has already been removed from server`)
          timeOut()
        })
        .then(setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notification} color={notificationColor} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App