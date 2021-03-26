import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <p>{person.name} {person.number} {' '}
      <button key={person.name} onClick={deletePerson} value={person.id}>delete</button>
    </p>
  )
}

const Persons = ({ newFilter, persons, deletePerson }) => {
  const nameFilter = person => person.name.trim().toLowerCase().includes(newFilter.trim().toLowerCase())

  return (
    <div>
      {persons.filter(person => nameFilter(person)).map(person =>
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      )}
    </div>
  )
}

export default Persons