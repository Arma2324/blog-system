const express = require('express')
const home = express.Router()

home.get('/', require('./home/homePage'))

home.get('/article', require('./home/articlePage'))

home.post('/comment', require('./home/comment'))

module.exports = home