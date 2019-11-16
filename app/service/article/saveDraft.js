import base_service from '../../core/base_service'

export default class SaveDraftService extends base_service {
    async index(content){
        const {
            ctx
        } = this
        let [UserInfoModel,ArticleModel] = this.getModels('UserInfo','Article')

        console.log(ctx.id)

        try{
            await UserInfoModel.findOneAndUpdate({
                _id: ctx.id
            },{
                $set: {
                    "draft.newDraft": content
                }
            })
            return true
        }catch(err){
            ctx.logger.error(`url:${ctx.url},error:${err},stack:${err.stack}`)
        }

    }
}