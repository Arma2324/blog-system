const { User } = require('../../model/user')

module.exports = async (req, res) => {
  let page = req.query.page ? req.query.page : 1
  const pageSize = 10
  const totalUser = await User.countDocuments()
  let totalPage = Math.ceil(totalUser / pageSize)
  const start = (page - 1) * pageSize
  const users = await User.find({}).limit(pageSize).skip(start)
  
  res.render('admin/user.html', { users, totalPage, page })
  
}