const mongoose = require('mongoose')
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

module.exports = {
  User
}