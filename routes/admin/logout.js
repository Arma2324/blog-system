module.exports = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.redirect('/admin/login')
    // clear userInfo saved in locals
    req.app.locals.userInfo = null
  })
}