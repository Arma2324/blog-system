const Joi = require('joi')

const schema = Joi.object({
  username: Joi.string().min(4).max(5).required()
})

const { error, value } = schema.validate({ username: 'arm' })

console.log(error, value)