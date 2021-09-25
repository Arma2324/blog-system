const { crypt } = require('../../crypto/crypt')
const { User, validateUser } = require('../../model/user')

module.exports = async (req, res, next) => {
  const { error, value } = await validateUser(req.body)
  if (error) {
    // redirect to edit page with the error message
    // in redirect method has res.end()
    //return res.redirect(`/admin/user-edit?message=${error.message}`)
    // ----------------------------------------------------------------------------------------------
    // let app's errorhandler middleware handle the error
    // next function only take one parameter and it must be string type
    // but we wanna pass 2 parameters(path and message), pass an object is perfect for this situation
    // note that the parameter of next function should be string, use JSON.stringify method
    return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }))
  } else {
    const page = req.query.page
    const { email } = value
    // find user according to email
    const user = await User.findOne({ email })
    if (user) {
      //return res.redirect(`/admin/user-edit?message=Email "${email}" has been token, please use other email.`)
      // -------------------------------------------------------------------------------------------------------
      // let app's errorhandler middleware handle the error
      return next(JSON.stringify({ path: '/admin/user-edit', message: `"${email}"  has been used, please use other email.` }))
    }
    // email is available, encrypt the password and then create a user
    
    value.password = crypt(value.password)
    await User.create(value)
    // redirect to user list page
    res.redirect('/admin/users?page=' + page)
  }
}