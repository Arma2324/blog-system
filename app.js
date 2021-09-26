// require express framwork
const express = require('express')
// create serve
const app = express()
// require node native module to handle path
const path = require('path')
const session = require('express-session')

// handle date format
const dateFormat = require('dateformat')
const template = require('art-template')

// connect MongoDB
require('./model/connect.js')

//test
// require('./model/user.js')

// configurate template engine
app.engine('html', require('express-art-template'))

// import dateFormat into template
template.defaults.imports.dateFormat = dateFormat

app.use(session({ secret: 'blogsystem' }))

// serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// intercept request to /admin make sure user already login
app.use('/admin', require('./middleware/loginGuard'))

// require route modules
const home = require('./routes/home.js')
const admin = require('./routes/admin.js')
// match path for route modules
app.use('/home', home)
app.use('/admin', admin)

// configurate errorhandler midlleware
app.use((err, req, res, next) => {
  // err is string type
  const errObj = JSON.parse(err)
  let params = []
  for (let prop in errObj) {
    if (prop !== 'path') {
      params.push(prop + '=' + errObj[prop])
    }
  }
  res.redirect(`${errObj.path}?${params.join('&')}`)
})

// server listen at port 80
app.listen(80, () => {
  console.log('app listening at http://localhost:80')
})