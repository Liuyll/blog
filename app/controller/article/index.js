const Controller = require('egg').Controller

module.exports = class ArticleController extends Controller {
    async index() {
        const { ctx } = this
        var articleId = ctx.params.aid
        var article = await ctx.model.Article.findOne({ _id: articleId }).populate({ path: 'author', select: 'account' })
        return JSON.stringify(article)
    }

    async getAllArticle() {
        const { 
            ctx
        } = this

        const queries = ctx.queries
        const onePageCount = queries.count ? queries.count : 5

        try{
            const page = ctx.params.page
            if(!page){
                let result = ctx.service.article.getAllArticle.noPage()
                return ctx.body = {
                    article: result
                }
            }

            const count = (page - 1) * onePageCount
            const result = await ctx.model.Article.find({},'-content',{ skip: count,limit: 5 }).populate('author').lean()
            ctx.body = {
                article: result
            }

        }catch(error){
            ctx.logger.error(`[ 查找全部article时出错 ]error:${error}`)
            ctx.status = 500
            ctx.body = 'error'
        }
    }

    async getArticleTotal(){
        const {
            ctx
        } = this

        return await ctx.service.getArticleTotal.index()
    }

    async getAllArticleNoPage() {
        const { 
            ctx
        } = this

        let result = await ctx.service.article.getAllArticle.noPage()
        return ctx.body = {
            article: result
        }
    }

    async new() {
       
        const { ctx } = this
        var data = ctx.request.body
        var article = {}

        article.title = data.title
        article.content = data.content
        article.author = data.authorId
        article.type = data.type
        article.addition = {
            like: 0,
            unlike: 0
        }
        article.judge = []
        article.signs = []

        try{
            var currentArticle = new ctx.model.Article(article)
            var id = currentArticle._id

            currentArticle.save()

            // eslint-disable-next-line
            await ctx.model.Menu.findOneAndUpdate({
                _id: data.type
            },{
                $push: {
                    article: id
                }
            },{
                strict: false
            })
           
            ctx.body = {
                type: 'success'
            }

        }catch(e){
            ctx.response.status = 500
            ctx.body = {
                type: 'error'
            }
            ctx.logger.error(e)
            console.error(e)
        }
    }
}