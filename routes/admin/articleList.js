const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // mark this page as article management
  req.app.locals.currentLink = 'article'

  let page = req.query.page
  page = page ? page : 1
  // in case user enter invalid page number in the url
  //page > totalPage && (page = totalPage)
  ;(page <= 0 || !!!(page - 0)) && (page = 1)
  // page: determine current page
  // size: sum of articles per page
  // display: determine display how many pagination
  // exec: sent search request to db
  const articles = await pagination(Article).find().populate('author').page(page).size(4).display(3).exec()
  const alias = JSON.parse(JSON.stringify(articles))
  if (articles.page > articles.pages) {
    res.redirect('/admin/article-list?page=' + articles.pages)
  } else {
    // res.send(articles)
    res.render('admin/articleList.html', { articles: alias })
  }
}