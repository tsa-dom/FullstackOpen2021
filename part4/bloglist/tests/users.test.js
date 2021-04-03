const { test, expect, beforeEach, describe } = require('@jest/globals')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('a new user wil not be created', () => {
  test('if password is too shor', async () => {
    const newUser = {
      username: 'user',
      name: 'name',
      password: 'sh'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const users = await helper.usersInDB()
    expect(users).toHaveLength(helper.initialUsers.length)

    const usernames = users.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)

    expect(response.body.error).toContain('password was shorter than minimum allowed (3)')
  })
  
  test('if password is not defined', async () => {
    const newUser = {
      username: 'user',
      name: 'name'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('password missing')
  })

  test('if username is not unique', async () => {
    const newUser = {
      username: 'xxxxx',
      name: 'new user',
      password: 'secret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('expected `username` to be unique. Value:')
  })

  test('if username is too short', async () => {
    const newUser = {
      username: 'un',
      name: 'short',
      password: 'short password'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('is shorter than the minimum allowed length (3)')
  })
})

describe('new user is created', () => {
  test('if valid username and password are entered', async () => {
    const newUser = {
      username: 'valid',
      name: 'valid',
      password: 'valid'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDB()
    expect(users).toHaveLength(helper.initialUsers.length + 1)
    const usernames = users.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})