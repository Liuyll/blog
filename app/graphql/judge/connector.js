const DataLoader = require('dataloader')
const bunyan = require('../../../config/bunyan')

module.exports = class JudgeConnector {
    constructor(ctx){
        this.ctx = ctx
        this.model = ctx.app.model
        this.loader = new DataLoader(this.getJudgeByArticleId.bind(this))
    }

    fetch(id){
        const judges = this.model.Article.find({
            _id: id
        },{
            judge: 1
        })
            .map(res => res.map(v => v.toJSON().judge))
        return judges
    }

    async getJudgeByArticleId(id){
        let result = await this.ctx.service.judge.getJudge.byArticleId(id)
        try{
            result = result.judge
            result.forEach((comment) => {
                comment.otherId = comment.other._id
                comment.authorId = comment.author._id
                comment.other = comment.other.account
                comment.author = comment.author.account  
            })

            return result
        }catch(err){
            this.ctx.logger.error(`PATH:graphql getJudgeByArticleIde error:${err}`)
            bunyan.error(JSON.stringify({
                type: 'graphql error',
                reason: `graphql:${err}`
            }))
        }
    }

    async judgeOther(infos){
        let result = await this.ctx.service.judge.judgeOther.index(infos)
        return result
    }
}