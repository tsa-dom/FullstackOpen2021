import { useQuery } from '@apollo/client'
import { useApolloClient, useSubscription } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS } from './queries'

const App = () => {
  const { fetchMore } = useQuery(ALL_AUTHORS, { fetchPolicy: 'cache-and-network' })
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-app-user-token')
    if (token) setToken(token)
  }, [setToken])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id) 

    const booksInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : booksInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWith(subscriptionData.data.bookAdded)
      fetchMore({variables: {cursor: 1}})
      window.alert(`New book "${subscriptionData.data.bookAdded.title}" added!`)
    }
  })

  const logout = () => {
    setToken(null)
    setPage('login')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <label>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </label>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      {token &&
        <div>
          <NewBook
            show={page === 'add'}
            updateCacheWith={updateCacheWith}
          />
          <Recommend
            show={page === 'recommend'}
          />
        </div>
      }

      {!token &&
        <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />
      }

    </div>
  )
}

export default App