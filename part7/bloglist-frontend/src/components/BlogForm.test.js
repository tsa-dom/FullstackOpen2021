import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let component
  let createBlog
  let title
  let author
  let url
  let form

  beforeEach(() => {
    createBlog = jest.fn()
    component = render(
      <BlogForm createBlog={createBlog} />
    )
    title = component.container.querySelector('#title')
    author = component.container.querySelector('#author')
    url = component.container.querySelector('#url')
    form = component.container.querySelector('form')
  })

  test('calls its callback function "createBlog" with correct content', () => {
    fireEvent.change(title, { target: { value: 'why' } })
    fireEvent.change(author, { target: { value: 'this is' } })
    fireEvent.change(url, { target: { value: 'so hard' } })

    expect(createBlog.mock.calls).toHaveLength(0)
    fireEvent.submit(form)
    const calls = createBlog.mock.calls
    expect(calls[0][0].title).toBe('why')
    expect(calls[0][0].author).toBe('this is')
    expect(calls[0][0].url).toBe('so hard')
    expect(calls).toHaveLength(1)
  })
})