const { User, validateUser } = require('../../model/user')
const { checkPassword } = require('../../crypto/crypt')

module.exports = async (req, res, next) => {
  const { id, page } = req.query
  const { error, value } = await validateUser(req.body)
  if (error) {
    return next(
      JSON.stringify({
        path: '/admin/user-edit',
        message: error.message,
        id,
      })
    )
  } else {
    const { username, email, password, role, state } = value
    const user = await User.findOne({ _id: id })
    const passwordMatch = await checkPassword(password, user.password)
    if (passwordMatch) {// update user
      await User.updateOne(
        { _id: id },
        {
          username,
          email,
          role,
          state,
        }
      )
      // redirect to userlist page
      res.redirect('/admin/users?page=' + page)
    } else {   // show error message
      // let errorhandler middleware handle it
      next(
        JSON.stringify({
          path: '/admin/user-edit',
          message: "Password doesn't match, fail to modify!",
          id,
        })
      )
    }
  }
}
