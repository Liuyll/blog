import base_controller from '../../core/base_controller'
import { setTimeout } from 'timers'

export default class GetArticlesInfoController extends base_controller {
    async index(){
        const {
            ctx,
            ctx: {
                params: {
                    page
                },
                queries: {
                    count=10
                }
            }
        } = this


        let total = await ctx.service.article.getArticleTotal.index()
        let articles = await ctx.service.article.getArticlesInfo.index({ page,count })

        await ctx.helper.delay(() => {
            ctx.body = {
                total,
                articles
            }
        },1000)
        // ctx.body = {
        //     total,
        //     articles
        // }
    }
}