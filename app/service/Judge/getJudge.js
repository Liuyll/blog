import { Service } from 'egg'

export default class getJudgeService extends Service {
    async byArticleId(id){
        const { ctx,app } = this
        return await ctx.model.Article.find({
            _id: id
        },{
            judge: 1,
            _id: 0
        })
            .populate({
                path: 'judge'
            })
            .lean()
    }
}