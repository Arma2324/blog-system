module.exports = (req, res) => {
  // mark this page as article management
  req.app.locals.currentLink = 'article'
  res.render('admin/articleList.html')
}