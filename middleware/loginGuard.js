module.exports = (req, res, next) => {
  if (req.url !== '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    // normal user doesn't allow to visit admin pages
    if (req.session.role == 'normal' && req.url !== '/logout') {  
      return res.redirect('/home')
    }
    next()
  }
}
