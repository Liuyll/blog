const Controller = require('egg').Controller

module.exports = class List extends Controller {

    async index() {
        const { ctx } = this
        var lists = await ctx.service.list.getLists()
        ctx.body = lists
    }

    async new() {
        const {ctx} = this
        var params = ctx.request.body

        var result = await ctx.service.list.addList(params)
        var lists
        if(result) lists = await ctx.service.list.getLists()
        ctx.body = lists
    }
}