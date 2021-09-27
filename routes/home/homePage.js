const { Article } = require('../../model/article')

module.exports = async (req, res) => {
  const articles = await Article.find().populate('author')
  const alias = JSON.parse(JSON.stringify(articles))
  // res.send(articles[8].author.username)
  res.render('home/home.html', { articles: alias })
}