  
import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, MODIFY_AUTHOR, ALL_BOOKS } from '../queries'
import Select from 'react-select'
import AuthorTable from './AuthorTable'
import Notification from './Notification'

const Authors = ({ show }) => {
  const [error, setError] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const [modifyAuthor] = useMutation(MODIFY_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS}, { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  if (!show) return null
  if (result.loading) return <div></div>
  
  const authors = result.data.allAuthors
  const options = authors.map(a => {
    return { label: a.name, value: a.name }
  })

  const submit = (event) => {
    event.preventDefault()
    modifyAuthor({ variables: { name, born: Number(born) } })
    setBorn('')
  }

  return (
    <div>
      <Notification message={error}/>
      <h2>authors</h2>
      <AuthorTable authors={authors} />
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <Select
            options={options}
            defaultValue={{ label: name }}
            isSearchable
            onChange={({ value }) => setName(value)}
          />
          <div>born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
              type='number'
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors