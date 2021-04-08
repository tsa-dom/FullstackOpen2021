require('dotenv').config()

let MONGODB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL


let PORT = process.env.PORT

module.exports = {
  MONGODB_URL,
  PORT
}