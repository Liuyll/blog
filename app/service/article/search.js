const Service = require('egg').Service

module.exports = class ArticleSearch extends Service {
    async byCondition(condition,skip=0,limit=5){
        const { app: { model: {
            Article
        } } 
        } = this

        let result = await Article.find({
            $or: [
                { title: {
                    $regex: condition
                } },
                { signs: {
                    $in: condition
                } }
            ]
        },'-content')
            .skip(skip)
            .limit(limit)
            .lean()

        return result
    }
}