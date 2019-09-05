'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
var listRouter = require('./router/list')
var articleRouter = require('./router/article')
var chatRouter = require('./router/io/chat')

module.exports = app => {
    const { router, controller } = app

    chatRouter(app)
    articleRouter(app)
    listRouter(app)
   
    router.get('/', 'home.index')
    router.post('/login', controller.login.index)
    router.get('/init','init.index.index')
}