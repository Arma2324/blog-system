const { User } = require('../../model/user')

module.exports = async (req, res) => {
  // mark this page as user management
  req.app.locals.currentLink = 'user'
  const pageSize = 10
  const totalUser = await User.countDocuments()
  let totalPage = Math.ceil(totalUser / pageSize)
  let page = req.query.page
  page > totalPage && (page = totalPage)
  ;(page <= 0 || !!!(page - 0)) && (page = 1)
  const start = (page - 1) * pageSize
  const users = await User.find({}).limit(pageSize).skip(start)
  
  res.render('admin/users.html', { users, totalPage, page })
  
}