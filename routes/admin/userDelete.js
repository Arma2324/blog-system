const { User } = require('../../model/user')

module.exports = async (req, res) => {
  const id = req.query.id
  // delete user according to id
  await User.findOneAndDelete({ _id: id })
  // redirect to userlist page
  res.redirect('/admin/users')
}