import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS, CURRENT_USER } from '../queries'
import BookTable from './BookTable'

const Recommend = ({ show }) => {
  const result = useQuery(CURRENT_USER)
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, { fetchPolicy: 'cache-and-network' })
  
  useEffect(() => {
    try {
      getBooks({ variables: { genre: result.data.me.favoriteGenre } })
    } catch (error) {}
  }, [result, getBooks])

  if (!show || loading || !result.data.me) return null
  
  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <label style={{ fontWeight: 'bold' }}>{result.data.me.favoriteGenre}</label></div>
      <BookTable books={data.allBooks} />
    </div>
  )
}

export default Recommend