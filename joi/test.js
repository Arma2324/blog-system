// const Joi = require('joi')

// const schema = Joi.object({
//   username: Joi.string().min(4).max(5).required()
// })

// async function run() {
//   const { error, value } = await schema.validate({ username: 'arm' })
//   console.log(error.message, value)
// }

// run()

const dateFormat = require('dateformat')
const now = Date.now()

console.log(dateFormat(now, 'yyyy-mm-dd'))