const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  username: { 
    type: String, 
    unique: true, 
    minlength: 3, 
    trim: true, 
    required: true 
  },
  name: String,
  passwordHash: String
})

userSchema.plugin(validator)

userSchema.set('toJSON', {
  transform: (document, user) => {
  user.id = user._id.toString()
  delete user.passwordHash
  delete user._id
  delete user.__v
}

})

module.exports = mongoose.model('User', userSchema)