const Service = require('egg').Service

module.exports = class _ extends Service{
    async index(group,skip=0,limit=5){
        const { ctx } = this
        
        let articles = await ctx.model.Menu
            .findOne({
                _id: group
            })
            .populate({
                path: 'article',
                options: {
                    skip: skip,
                    limit: limit
                },
                populate: {
                    path: 'author',
                    select: 'account',
                    
                }
            })
            .lean()
        return articles
    }

}