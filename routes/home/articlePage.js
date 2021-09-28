const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
  const id = req.query.id
  const article = await Article.findOne({ _id: id }).populate('author')
  const comments = await Comment.find({ aid: id }).populate('uid')
  // return res.send(comments)
  const alias1 = JSON.parse(JSON.stringify(article))
  const alias2 = JSON.parse(JSON.stringify(comments))
  res.render('home/article.html', { article: alias1, comments: alias2 })
}