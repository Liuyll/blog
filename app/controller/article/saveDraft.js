import base_controller from '../../core/base_controller'

export default class SaveDraft extends base_controller {
    async index(){
        const {
            ctx
        } = this

        let result = await ctx.service.article.saveDraft.index(ctx.request.body.content)
        if(result){
            this.success()
        }
        else {
            this.fail()
        }
    }
}