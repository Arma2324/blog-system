const express = require('express')
const home = express.Router()

home.get('/', (req, res) => {
  //res.end('welcom to bolg home page')
  res.render('test.html')
})

module.exports = home