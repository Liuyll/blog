import { Controller } from 'egg'

export default class judgeOtherController extends Controller{
    async index() {
        let { 
            ctx,
            ctx: { params: { id } , request: { body } },
        } = this   

        await this.ctx.service.judge.judgeOther.index(JSON.stringify(body),id).then((result) => {

            // promise数组的返回长度,具体见service
            const MUST_RETURN_RESULT_COUNT = 4
            if(Array.isArray(result) && result.length == MUST_RETURN_RESULT_COUNT){
                ctx.body = {
                    type: 'success'
                }
            }
            else ctx.body = {
                type: 'error'
            }
        })
        
    } 
}