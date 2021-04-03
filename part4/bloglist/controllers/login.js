const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const password = user !== null
    ? await bcrypt.compare(body.password, user.passwordHash)
    : false

  if (!user || !password) {
    return response.status(401).json({ error: 'wrong username or password' })
  }

  const tokenCredential = {
    id: user._id,
    username: user.username
  }
  
  const token = jwt.sign(tokenCredential, process.env.SECRET)

  response
    .status(200)
    .send({ username: user.username, name: user.name, token })

})

module.exports = loginRouter