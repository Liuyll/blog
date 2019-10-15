module.exports = (app) => {
    const { router, controller } = app
    
    router.get('/article/type', controller.article.getArticleByInfo.byType)
    router.get('/article/list',controller.article.index.getAllArticle)
    router.get('/article/list/:id',controller.article.getArticleByInfo.byList)
    router.get('/article/:id', controller.article.getArticleByInfo.byId)
    // router.get('/article/:aid', controller.article.index)
    router.post('/article', controller.article.index.new)
}