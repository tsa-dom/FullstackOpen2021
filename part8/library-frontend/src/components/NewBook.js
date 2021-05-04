import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries'
import { useField } from '../hooks'
import Notification from './Notification'

const InputLine = ({ name, element }) => {
  return (
    <div>
      {name}
      <input {...element.field}/>
    </div>
  )
}

const NewBook = ({ show, updateCacheWith }) => {
  const [error, setError] = useState('')
  const title = useField('')
  const author = useField('')
  const published = useField('number')
  const genre = useField('')
  const [genres, setGenres] = useState([])

  const errorTimeout = () => {
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      errorTimeout()
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    if (published.field.value <= 0 || 3000 <= published.field.value) {
      setError('Published year is too large or small')
      errorTimeout()
      return
    }

    createBook({ variables: {
      title: title.field.value,
      author: author.field.value,
      published: Number(published.field.value),
      genres 
    }})

    title.clear()
    author.clear()
    published.clear()
    setGenres([])
    genre.clear()
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.field.value))
    genre.clear()
  }

  return (
    <div>
      <h2>add book</h2>
      <Notification message={error}/>
      <form onSubmit={submit}>
        <InputLine name='title' element={title} />
        <InputLine name='author' element={author} />
        <InputLine name='published' element={published} />
        <div>
          <input {...genre.field} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook