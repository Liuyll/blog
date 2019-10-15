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
        try{
            ctx.body = await ctx.model.Article.find().populate('author').lean()
        }catch(error){
            ctx.logger.error(`[ 查找全部article时出错 ]error:${error}`)
            ctx.status = 500
            ctx.body = 'error'
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
            console.log(id)
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