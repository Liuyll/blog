module.exports = (app) => {
    const { router, controller } = app
    
    router.get('/article/type/:page', controller.article.getArticleByInfo.byType)
    router.get('/article/list/:page',controller.article.index.getAllArticle)
    router.get('/article/list',controller.article.index.getAllArticleNoPage)
    router.get('/article/list/:id/:page',controller.article.getArticleByInfo.byList)
    router.get('/article/:id', controller.article.getArticleByInfo.byId)
    router.get('/article/content/:id',controller.article.getArticleContent.index)
    router.get('/article/total',controller.article.index.getArticleTotal)
    router.get('/article/infos/:page',controller.article.getArticlesInfo.index)

    // router.get('/article/:aid', controller.article.index)
    router.post('/article/search', controller.article.search.index)
    router.post('/article', controller.article.index.new)
    router.post('/article/saveDraft',controller.article.saveDraft.index)
    
}