const express = require('express')
const admin = express.Router()

admin.get('/login', require('./admin/loginPage'))

admin.post('/login', require('./admin/login'))

admin.get('/users', require('./admin/userPage'))

admin.get('/logout', require('./admin/logout'))

admin.get('/user-edit', require('./admin/editPage'))

admin.post('/user-edit', require('./admin/userEdit'))

admin.post('/user-modify', require('./admin/userModify'))

admin.get('/user-delete', require('./admin/userDelete'))

admin.get('/article-list', require('./admin/articleList'))

admin.get('/article-edit', require('./admin/articleEditPage'))

admin.post('/article-add', require('./admin/articleAdd'))

admin.post('/article-modify', require('./admin/articleModify'))

admin.get('/article-delete', require('./admin/articleDelete'))

module.exports = admin