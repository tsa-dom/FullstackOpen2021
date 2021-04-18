const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10

  if (body.password === undefined) {
    next(new Error('Password validation failed: password is undefined'))
    return response.status(400).json({ error: 'password missing' })
  } else if (body.password.length < 3) {
    next(new Error('Password validation failed: password was shorter than minimum allowed (3)'))
    return response.status(400).json({ error: 'password was shorter than minimum allowed (3)' })
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter