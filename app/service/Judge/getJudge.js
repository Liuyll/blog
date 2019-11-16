import { Service } from 'egg'

export default class getJudgeService extends Service {
    async byArticleId(id){
        const { ctx } = this
        return await ctx.model.Article.findOne({
            _id: id
        },{
            judge: 1,
            _id: 0
        })
            .populate({
                path: 'judge',
                populate: {
                    path: 'author other',
                    select: 'account account'
                }
            })
            .lean()
    }
}