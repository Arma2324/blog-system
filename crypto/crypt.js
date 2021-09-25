const crypto = require('crypto')

const secret = 'blogsystem'

const crypt = (password) => {
  return crypto.createHmac('sha256', secret)
               .update(password)
               .digest('hex')
}

const checkPassword = async (password, crypted) => {
  const newPassword = await crypt(password)
  return newPassword === crypted
}

module.exports = {
  crypt,
  checkPassword
}