const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'invalid token' })
  }
  logger.error(error.message)
  next()
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    request.token = auth.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken || !token) {
    request.user = null
  }
  request.user = await User.findById(decodedToken.id)

  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }