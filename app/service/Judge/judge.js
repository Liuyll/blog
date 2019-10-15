const Service = require('egg').Service

module.exports = class JudgeService extends Service {
    async Index(data) {
        try {
            const { ctx } = this
            var data = JSON.parse(data)
            await ctx.model.Article.updateOne({
                _id: data.ArticleId
            }, {
                $push: {
                    judge: {
                        other: data.OtherId,
                        content: data.content,
                        time: data.time
                    }
                }
            })

            this.informUser(data.OtherId)
        } catch (error) {
            //
        }

    }

    async informUser(userid, articleId, contentData) {
        try {
            const { ctx } = this
            await ctx.model.UserInfo.update({
                id: userid
            }, {
                $push: {
                    myJudge: {
                        article: articleId,
                        content: contentData
                    }
                }
            })


        } catch (error) {
            console.error(error)
            return 'error'
        }
    }
}