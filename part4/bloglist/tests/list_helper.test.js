const { expect, describe, test } = require('@jest/globals')
const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOnlyOneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]
const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const likes = listHelper.totalLikes(emptyList)
    expect(likes).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const likes = listHelper.totalLikes(listWithOnlyOneBlog)
    expect(likes).toBe(7)
  })

  test('when the list has many blogs is calculated correctly', () => {
    const likes = listHelper.totalLikes(listWithManyBlogs)
    expect(likes).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when the list is empty is null', () => {
    const favoriteBlog = listHelper.favoriteBlog(emptyList)
    expect(favoriteBlog).toEqual(null)
  })

  test('when the list has only one blog is that blog', () => {
    const favoriteBlog = listHelper.favoriteBlog(listWithOnlyOneBlog)
    expect(favoriteBlog).toEqual(
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7
      })
  })

  test('when the list has many blogs is correct', () => {
    const favoriteBlog = listHelper.favoriteBlog(listWithManyBlogs)
    expect(favoriteBlog).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
  })
})

describe('most blogs', () => {
  test('when the list is empty is null', () => {
    const mostBlogs = listHelper.mostBlogs(emptyList)
    expect(mostBlogs).toEqual(null)
  })

  test('when the list has only one blog is that blog', () => {
    const mostBlogs = listHelper.mostBlogs(listWithOnlyOneBlog)
    expect(mostBlogs).toEqual(
      {
        author: "Michael Chan",
        blogs: 1
      })
  })

  test('when the list has many blogs is correct', () => {
    const mostBlogs = listHelper.mostBlogs(listWithManyBlogs)
    expect(mostBlogs).toEqual(
      {
        author: "Robert C. Martin",
        blogs: 3
      })
  })
})

describe('most likes', () => {
  test('when the list is empty is null', () => {
    const mostBlogs = listHelper.mostLikes(emptyList)
    expect(mostBlogs).toEqual(null)
  })

  test('when the list has only one blog is that blog', () => {
    const mostBlogs = listHelper.mostLikes(listWithOnlyOneBlog)
    expect(mostBlogs).toEqual(
      {
        author: "Michael Chan",
        likes: 7
      })
  })

  test('when the list has many blogs is correct', () => {
    const mostBlogs = listHelper.mostLikes(listWithManyBlogs)
    expect(mostBlogs).toEqual(
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      })
  })
})