import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import { useToggle } from '../hooks'
import { Button } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
  const togler = useToggle(false)

  return (
    <div>
      <div style={togler.hideWhenVisible}>
        <BlogList blogs={blogs}/>
        <Button variant='primary' onClick={togler.toggle}>Create new blog</Button>
      </div>
      <div style={togler.showWhenVisible}>
        <BlogForm togler={togler}/>
      </div>
    </div>
  )
}

export default Blogs