import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'
import Select from 'react-select'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (result.data && genre === null) setBooks(result.data.allBooks)
    else if (result.data) {
      setBooks(result.data.allBooks.filter(book =>
        book.genres.some(g => g === genre)
      ))
    }
  }, [result, genre])
  
  if (!show || !books) return null

  const genres = new Set()
  result.data.allBooks.forEach(book => book.genres.forEach(genre => genres.add(genre)))
  const options = Array.from(genres).map(genre => {
    return { label: genre, value: genre }
  }).concat({ label: 'All genres', value: 'allGenres' })

  const filterBooks = event => {
    if (event.value === 'allGenres') {
      setGenre(null)
      setBooks(result.data.allBooks)
    } else {
      setGenre(event.value)
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <label style={{ fontWeight: 'bold' }}>{genre}</label></p>
      <BookTable books={books} />
      <Select
        options={options}
        defaultValue={{ label: genre }}
        isSearchable
        onChange={filterBooks}
      />
    </div>
  )
}

export default Books