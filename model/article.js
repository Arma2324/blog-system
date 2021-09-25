const { string } = require('joi')
const mongoose = require('mongoose')

const { Schema } = mongoose
// define collection rules
const articleSchema = new Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, 'Please enter article title!']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please enter autor!']
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = {
  Article
}