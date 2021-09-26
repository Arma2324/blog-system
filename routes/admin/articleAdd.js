const formidable = require('formidable')
const path = require('path')
const { Article, validateArticle } = require('../../model/article')

module.exports = (req, res, next) => {
  // create form-resolve instance object
  const form = new formidable.IncomingForm()
  // configurate where the upload file to save
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
  // keep upload file's extensions
  form.keepExtensions = true   // false in default
  // resolve form data
  form.parse(req, async (err, fields, files) => {
    // err: error object, when parse form success it will be null
    // fields: object, contains normal form data
    // files: object, contains data concerning file
    const article = {
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('public')[1],
      content: fields.content
    }
    const { error, value } = await validateArticle(article)
    if (error) {
      return next(JSON.stringify({ path: '/admin/article-edit', message: error.message}))
    } else {
      await Article.create(value)
      res.redirect('/admin/article-list?page=' + req.query.page)
    }
  })
}