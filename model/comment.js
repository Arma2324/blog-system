const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
  Comment
}