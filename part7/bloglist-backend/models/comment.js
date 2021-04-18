const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  content: String
})

mongoose.plugin(validator)

commentSchema.set('toJSON', {
  transform: (document, comment) => {
    comment.id = comment._id.toString()
    delete comment._id
    delete comment.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)