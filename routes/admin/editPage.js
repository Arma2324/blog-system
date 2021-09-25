const { User } = require('../../model/user')

module.exports = async (req, res) => {
  // mark this page as user management
  req.app.locals.currentLink = 'user'
  const { message, id, page } = req.query
  if (id) {
    const user = await User.findOne({ _id: id})
    res.render('admin/userEdit.html', {
      message,
      id,
      user,
      page,
      link: `/admin/user-modify?id=${id}&page=${page}`
    })
  } else {
    res.render('admin/userEdit.html', {
      message,
      page,
      link: '/admin/user-edit?page=' + page
    })
  }
}