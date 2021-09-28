const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
  const x = await Comment.create(req.body)
  res.redirect('/home/article?id=' + req.body.aid)
}