import base_service from '../../core/base_service'

module.exports = class _ extends base_service {
    async index(skip=0,limit=5){
        const {
            app: {
                model: {
                    Article
                }
            }
        } = this

        return await Article
            .find()
            .skip(skip)
            .limit(limit)
            .lean()
    } 
    
    async noPage(){
        const ArticleModel = this.getModel('Article')

        return await ArticleModel.find().lean()
    }
}