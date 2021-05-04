import { gql } from '@apollo/client'

export const CURRENT_USER = gql `
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const BOOK_DETAILS = gql `
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
    id
  }
`

export const ALL_BOOKS = gql `
  query all($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql `
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const CREATE_BOOK = gql `
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const MODIFY_AUTHOR = gql `
  mutation modifyAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name,
      born
    }
  }
`

export const LOGIN = gql `
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const BOOK_ADDED = gql `
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`