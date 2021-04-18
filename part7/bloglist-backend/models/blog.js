const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  likes: Number
})

mongoose.plugin(validator)

blogSchema.set('toJSON', {
  transform: (document, blog) => {
    blog.id = blog._id.toString()
    delete blog._id
    delete blog.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)