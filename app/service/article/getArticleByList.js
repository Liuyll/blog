const Service = require('egg').Service

module.exports = class _ extends Service{
    async index(group){
        const { ctx } = this
        
        let articles = await ctx.model.Menu
            .findOne({
                _id: group
            })
            .populate({
                path: 'article',
                populate: {
                    path: 'author',
                    select: 'account'
                }
            })
            .lean()
        return articles
    }

}