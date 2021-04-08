const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Bloglist',
    author: 'VSC',
    url: 'http://localhost:3003/api/blogs',
    likes: 13
  },
  {
    title: 'TKT',
    author: 'Many',
    url: 'tekoaly',
    likes: 31
  },
  {
    title: 'Title',
    author: 'M3',
    url: 'no url',
    likes: 11
  }
]

const initialUsers = [
  {
    username: 'xxxxx',
    name: '----',
    password: 'salainen'
  },
  {
    username: 'qwertyu',
    name: 'asdfgh',
    password: 'zxcvbn'
  },
]

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, initialUsers, usersInDB, blogsInDB }