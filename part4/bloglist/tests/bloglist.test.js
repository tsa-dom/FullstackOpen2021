const { test, expect, beforeEach, describe, beforeAll } = require('@jest/globals')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeAll(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send({
      username: 'tester',
      password: 'pass'
    })
  api
    .post('/api/login')
    .send({
      username: 'tester',
      password: 'pass'
    })
    .end((error, response) => {
      token = response.body.token
    })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when some blogs are initialized', () => {
  test('then blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('then there are three blogs', async () => {
    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(3)
  })
  
  test('then the identifier of blogs is named as "id"', async () => {
    const blogs = await helper.blogsInDB()
    blogs.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('adding a new blog', () => {
  test('in json format, then count of blogs is increased by one', async () => {
      const newBlog = {
        title: 'new',
        auhtor: 'me',
        url: 'no url',
        likes: 22
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogs = await helper.blogsInDB()
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
      const titles = blogs.map(blog => blog.title)
      expect(titles).toContain('new')
  })
    
  test('without "likes" atribute, then it is initialized as 0', async () => {
      const newBlog = {
        title: 'without likes',
        author: 'me2',
        url: 'no url again'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogs = await helper.blogsInDB()
      const likes = blogs.map(blog => blog.likes)
      expect(likes).toContain(0)
  })
})

describe('blog addition fails', () => {
  test('if "title" is not defined', async () => {
      const newBlog = {
        author: 'no title',
        url: 'no url',
        likes: 11
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    
      const blogs = await helper.blogsInDB()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
    
  test('if "url" is not defined', async () => {
      const newBlog = {
        title: 'title here',
        author: 'no url',
        likes: 27
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    
      const blogs = await helper.blogsInDB()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
  test('if user is not authorized', async () => {
    const newBlog = {
      title: 'unauthorized',
      author: 'nan',
      url: 'nan',
      likes: 27
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  
    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('a blog can be modified', () => {
  test('if authorized user modifies it', async () => {
      const blogToModified = (await api.get('/api/blogs')).body[0]
      const blog = {
        title: 'mod',
        author: 'mod',
        url: 'mod',
        likes: 500
      }
      await api
        .put(`/api/blogs/${blogToModified.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(204)
      
      const blogsAfterModify = await helper.blogsInDB()
      expect(blogsAfterModify).toHaveLength(helper.initialBlogs.length)
      
      const ids = blogsAfterModify.map(blog => blog.id)
      const author = blogsAfterModify.map(blog => blog.auhtor)
      expect(ids).toContain(blogToModified.id)
      expect(author).toContain(blogToModified.auhtor)
  })
})

describe('a blog can be removed', () => {
  test('if user is authorized', async () => {
    const blog = {
      title: 'delete',
      author: 'this',
      url: 'please',
      likes: 313
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
    const blogsBeforeRemove = await helper.blogsInDB()
    expect(blogsBeforeRemove).toHaveLength(helper.initialBlogs.length + 1)

    const blogToDelete = (await helper.blogsInDB())[helper.initialBlogs.length]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    
    const blogsAfterRemove = await helper.blogsInDB()
    expect(blogsAfterRemove).toHaveLength(helper.initialBlogs.length)
    
    const ids = blogsAfterRemove.map(blog => blog.id)
    expect(ids).not.toContain(blogToDelete.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})