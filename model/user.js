const mongoose = require('mongoose')
const Joi = require('joi')
const crypto = require('crypto')
const { Schema } = mongoose

// create collection rules
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  role: {  // admin or normal
    type: String,
    require: true
  },
  state: {   // 0: available,1: forbbiden
    type: Number,
    default: 0
  }
})

// create collection
const User = mongoose.model('User', userSchema)

// const secret = 'blogsystem'
// const safePassword = crypto.createHmac('sha256', secret).update('arma23').digest('hex')
                           
// test
// User.create({
//   username: 'arma',
//   email: 'arma@2324.com',
//   password: safePassword,
//   role: 'admin',
//   state: 0
// }).then(() => {
//   console.log('user created!')
// }, () => {
//   console.log('create user failed!')
// })

// validation rules


const validateUser = user => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error('Password must be character and number!(6~30charcters)')),
    role: Joi.string().valid('normal', 'admin').required(),
    state: Joi.number().valid(0, 1).required()
  })

  return schema.validate(user)
}

module.exports = {
  User,
  validateUser
}