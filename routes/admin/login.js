const { User } = require('../../model/user')
const { checkPassword } = require('../../crypto/crypt')

module.exports = async (req, res) => {
  let { email, password } = req.body
  // back-end validate
  if (email.trim().length === 0 || password.trim().length === 0) {
    return res.status(400).render('admin/error.html', { msg: 'Email or password is wrong!'})
  }
  // find user according to email
  let user = await User.findOne({ email })
  // user exists
  if (user) {
    const passwordMatch = await checkPassword(password, user.password)
    if (passwordMatch) {
      req.session.username = user.username
      req.session.role = user.role
      req.app.locals.userInfo = user
      if (user.role == 'admin')
        return res.redirect('/admin/users')  // redirect to user page
      else   // normal user
        return res.redirect('/home')  
    } else {   // password is wrong
      return res.status(400).render('admin/error.html', { msg: 'Email or password is wrong!'})
    }
  } else { // no match user
    return res.status(400).render('admin/error.html', { msg: 'Email or password is wrong!'})
  }
}