const Controller = require('egg').Controller

module.exports = class ArticleController extends Controller {
    async byType() {
        const { ctx } = this
        const Joi = ctx.app.Joi

        try {
            var validator = Joi.object({
                type:Joi.string().required(),
                isAll:Joi.string().default(false)
            })
            var {
                type,
                isAll
            } = ctx.query
            
            ctx.validate(validator,ctx.query)
          
            ctx.body =  await ctx.service.article.getArticleByInfo.byType(type,isAll)
        } catch (error) {
            ctx.status = 500
            ctx.body = "error"
            console.error(`参数校验错误:${error}`)
        }
        
    }

    async byId(){
        
        const {ctx} = this
        const id = ctx.params.id

        try {
            ctx.body =  await ctx.service.article.getArticleByInfo.byId(id)
        }catch(error){
            console.log(error)
            ctx.logger.error('controller getArticleByInfo/byId错误 error'+error)
        }
    }

    async byList(){
        // console.log('get')
        const {ctx} = this
        const id = ctx.params.id

        try {
            ctx.body =  await ctx.service.article.getArticleByList.index(id)
        }catch(error){
            console.log(error)
            ctx.logger.error('controller getArticleByInfo/byList错误 error'+error)
        }
    }
}