const { User } = require('../../model/user')
const crypto = require('crypto')

module.exports = async (req, res) => {
  let { email, password } = req.body
  // back-end validate
  if (email.trim().length === 0 || password.trim().length === 0) {
    return res.status(400).render('admin/error.html', { msg: 'Email or password is wrong!'})
  }
  // find user according to email
  let user = await User.findOne({ email })
  // encrypt password
  const safePassword = crypto.createHmac('sha256', 'blogsystem').update(password).digest('hex')
  // user exists
  if (user) {
    if (user.password === safePassword) {  // password match
      req.session.username = user.username
      req.app.locals.userInfo = user
      res.redirect('/admin/user')  // redirect to user page
    } else {   // password is wrong
      return res.status(400).render('admin/error.html', { msg: 'Email or password is wrong!'})
    }
  } else { // no match user
    return res.status(400).render('admin/error.html', { msg: 'Email or password is wrong!'})
  }
}