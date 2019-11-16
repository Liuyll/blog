import base_controller from '../../core/base_controller'

export default class extends base_controller {
    async index(){
        const {
            app: {
                model: {
                    Article
                }
            },
            ctx
        } = this
        
        const Id = ctx.params.id
        let content = await Article.findOne({
            _id: Id
        },{
            content: 1,
            _id: 0
        }).lean()

        if(content){
            console.log(content)
            this.success(content)
        }
    }
}