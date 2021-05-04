import React from 'react'

const BookTable = ({ books }) => {
  return (
    <table>
      <thead>
        <tr></tr>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
      </thead>
      <tbody>
        {books.map(b => 
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default BookTable