const DataLoader = require('dataloader')

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
        return result[0].judge
    }
}