import base_service from '../../core/base_service'

export default class GetArticleTotalService extends base_service {
    async index(){
        const Article = this.getModel('Article')

        let counts = await Article.countDocuments()
        return counts
    }
}