import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  const getLink = id => '/blogs/' + id

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td style={{ width: 400 }}>
                <Link to={getLink(blog.id)}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>)}
          <tr></tr>
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList