const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog !== null && blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'invalid token or blog id' })
      .end()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).end()
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('comments', { content: 1 })
  response.json(blog.comments.map(comment => comment.toJSON()))
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const content = request.body.content
  const comment = new Comment({ content })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.json(savedComment)
})

module.exports = blogsRouter