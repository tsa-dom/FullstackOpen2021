const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})

mongoose.plugin(validator)

module.exports = mongoose.model('User', schema)