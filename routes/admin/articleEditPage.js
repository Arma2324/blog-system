const { Article } = require('../../model/article')

module.exports = async (req, res) => {
  // mark this page as article management
  req.app.locals.currentLink = 'article'

  const { id, page, message } = req.query

  if (id) {  // edit article
    const article = await Article.findOne({ _id: id })
    res.render('admin/articleEdit.html', {
      article,
      id,
      page,
      message,
      link: `/admin/article-modify?id=${id}&page=${page}`
    })
  } else {   // add new article
    res.render('admin/articleEdit.html', {
      page,
      message,
      link: '/admin/article-add?page=' + page
    })
  }
}