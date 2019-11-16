const Service = require('egg').Service

module.exports =  class JudgeOtherService extends Service{
    async index(info){
        const {
            ctx: {
                model: {
                    UserInfo,
                    Article,
                    Judge
                }
            },
            app
        } = this

        info = JSON.parse(info)
        const {
            author,
            other,
            content,
            article
        } = info

        let curJudge = new Judge({
            author,
            other,
            article,
            content
        })

        let curJudgeId = curJudge._id

        let createJudge = curJudge.save()
        let updateAuthor = UserInfo.findOneAndUpdate({ id: author },
            {
                $push: {
                    myJudge: curJudgeId
                }
            })

        let updateAcceptor = UserInfo.findOneAndUpdate({ id: other },
            {
                $push: {
                    'info.judge': curJudgeId
                }
            })

        let updateArticle = Article.findByIdAndUpdate(article,{
            $push: {
                judge: curJudgeId
            }
        })

        return Promise.all([createJudge,updateAcceptor,updateAuthor,updateArticle]).catch(err => {
            app.ByLog.error({
                type: 'mongo',
                reason: `err:${err}`
            })
            console.error(err)
        })
    }
}