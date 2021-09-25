const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')

module.exports = (req, res) => {
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
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split('public')[1],
      content: fields.content
    })
    res.redirect('/admin/article-list')
  })
}