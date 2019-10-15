'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
var listRouter = require('./router/list')
var articleRouter = require('./router/articles/article')
var chatRouter = require('./router/io/chat')
var judgeRouter = require('./router/articles/judge').default

module.exports = app => {
    const { router, controller } = app

    chatRouter(app)
    articleRouter(app)
    listRouter(app)
    judgeRouter(app)

    router.get('/', 'home.index')
    router.post('/login', controller.login.index)
    router.get('/init','init.index.index')
}