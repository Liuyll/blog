import base_service from '../../core/base_service'

export default class GetArticlesInfoService extends base_service {
    async index({ page,count }){
        const ArticleModel = this.getModel('Article')
        
        let result = await ArticleModel
            .find({},{ content: 0 })
            .skip((page - 1) * count)
            .limit(count)
            .populate({
                path: 'author',
                select: 'account'
            })
            .populate({
                path: 'type',
                model: 'Menu',
                select: 'group -_id'
            })

        return result
    }
}