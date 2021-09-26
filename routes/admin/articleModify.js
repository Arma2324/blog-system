const formidable = require('formidable')
const path = require('path')
const { Article, validateArticle } = require('../../model/article')

module.exports = async (req, res, next) => {
  const { id, page } = req.query
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    const article = {
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('public')[1],
      content: fields.content
    }
    const { error, value } = await validateArticle(article)
    if (error) {
      return next(JSON.stringify({ path: '/admin/article-edit', message: error.message, id}))
    } else {
      await Article.updateOne({ _id: id }, value)
      res.redirect('/admin/article-list?page=' + page)
    }
  })
}