import base_controller from '../../core/base_controller'

export default class SearchArticle extends base_controller {
    async index(){
        const { ctx } = this
        const {
            search,
            page
        } = ctx.request.body

        const count = (page - 1)*5
        if(!search) return ctx.body = await ctx.service.article.getAllArticle.index(count)
        const result = await ctx.service.article.search.byCondition(search,count)

        ctx.body = result
    }
  
}