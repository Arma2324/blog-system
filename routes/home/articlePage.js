const {Article} = require('../../model/article')

module.exports = async (req, res) => {
  const id = req.query.id
  const article = await Article.findOne({ _id: id }).populate('author')
  const alias = JSON.parse(JSON.stringify(article))
  // res.send(article)
  res.render('home/article.html', { article: alias })
}