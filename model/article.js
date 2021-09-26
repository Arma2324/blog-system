const Joi = require('joi')
const mongoose = require('mongoose')

const { Schema } = mongoose
// define collection rules
const articleSchema = new Schema({
  title: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: [true, 'Please enter article title!']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please enter author!']
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
    type: String,
    require: true
  }
})

const Article = mongoose.model('Article', articleSchema)

const validateArticle = (article) => {
  const shema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    author: Joi.required(),
    content: Joi.string().required(),
    publishDate: Joi.any(),
    cover: Joi.string().required()
  })

  return shema.validate(article)
}
module.exports = {
  Article,
  validateArticle
}