import { Controller } from 'egg'

export default class judgeOtherController extends Controller{
    async index() {
        let { 
            ctx,
            ctx: { params: { id } , request: { body } },
        } = this   

        await this.ctx.service.judge.judgeOther.index(JSON.stringify(body),id).then((result) => {
            if(Array.isArray(result) && result.length == 4){
                ctx.body = {
                    type: 'success'
                }
            }
        })
        
    } 
}