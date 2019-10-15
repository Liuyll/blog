const Service = require('egg').Service

module.exports = class _ extends Service {
    async byType(type, isAll) {
        const { ctx } = this
        var queryCondition = isAll ? '$all' : '$in'
        
        try{
            return await ctx.model.Article.find({
                type: { [queryCondition]: [ type ] }
            }).select('-content').populate({
                path: 'author',
                select: 'account'
            })
        }catch(error){
            ctx.logger.error(`根据type查询文章出错,error:${error}`)
            console.error(error)
        }

    }

    async byId(id){
        const { ctx } = this
        
        try{
            return await ctx.model.Article.findOne({
                _id: id
            }).populate({
                path: 'author',
                select: 'account'
            })
        }catch(error){
            ctx.logger.error(`根据id查询文章出错,error:${error}`)
            console.error(error)
        }

    }
}