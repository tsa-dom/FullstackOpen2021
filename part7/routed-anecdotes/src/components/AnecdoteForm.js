import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: content.field.value,
      author: author.field.value,
      info: info.field.value,
      votes: 0
    })
    history.push('/')
  }
  const clearField = (event) => {
    event.preventDefault()
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.field} />
        </div>
        <div>
          author
          <input {...author.field} />
        </div>
        <div>
          url for more info
          <input {...info.field} />
        </div>
        <button>create</button>
        <button onClick={clearField}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew