const Controller = require('egg').Controller

module.exports = class JudgeController extends Controller {
    async judge() {
        /**
         * 数据格式
         * {
         *      content:String,
         *      user:ref     
         * }
         */
        const { ctx } = this
        const data = ctx.params
        var res = await ctx.service.judge(data)
        if (res !== 'error') {
            return ctx.body = 'success'
        }
        ctx.body = 'failed'
    }
}