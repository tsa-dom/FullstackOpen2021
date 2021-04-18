import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

let component
let mockModifyBlog

beforeEach(() => {
  const user = {
    username: 'Tester',
    token: 'token'
  }
  const blog = {
    title: 'this',
    author: 'have to be',
    url: 'tested now',
    likes: 313,
    user: user
  }
  mockModifyBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  component = render(
    <Blog
      blog={blog}
      user={user}
      modifyBlog={mockModifyBlog}
      deleteBlog={mockDeleteBlog}
    />
  )
})

describe('<Blog />', () => {
  let labelHide
  let labelView

  beforeEach(() => {
    labelHide = component.container.querySelector('.hide')
    labelView = component.container.querySelector('.view')
  })

  test('renders correct text contents', () => {
    expect(component.container).toHaveTextContent(
      'this have to beviewhide tested now likes 313like Tester remove'
    )
  })

  test('renders only elements title and author on default', () => {
    expect(labelHide).not.toHaveStyle('display: none')
    expect(labelHide).toHaveTextContent('view')
    expect(labelView).toHaveStyle('display: none')
  })

  test('renders elements title, author, url and likes if button is pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(labelHide).toHaveStyle('display: none')
    expect(labelView).toHaveTextContent('hide tested now likes 313like Tester remove')
    expect(labelView).not.toHaveStyle('display: none')
  })
})

describe('if like button is pressed', () => {

  test('twice, then modifyBlog eventhandler is called twice', () => {
    const view = component.getByText('view')
    fireEvent.click(view)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockModifyBlog.mock.calls).toHaveLength(2)
  })
})