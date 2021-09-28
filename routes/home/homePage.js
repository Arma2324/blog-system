const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  let page = req.query.page
  page = page ? page : 1
  ;(page <= 0 || !!!(page - 0)) && (page = 1)
  // const articles = await pagination(Article).find().populate('author').page(1).size(3).dispaly(3).exec()
  const articles = await pagination(Article).find().populate('author').page(page).size(6).display(3).exec()
  // return res.send(articles)
  const alias = JSON.parse(JSON.stringify(articles))
  if (articles.page > articles.pages)
    return res.redirect('/home?page=' + articles.pages)
  res.render('home/home.html', { articles: alias })
}