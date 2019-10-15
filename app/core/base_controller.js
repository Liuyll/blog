import { Controller } from 'egg'

export default class base_controller extends Controller{
    failed(reason){
        const { ctx } = this

        ctx.body = {
            type: 'failed',
            message: reason
        }    
    }

    success(payload){
        const { ctx } = this
        ctx.body = {
            type: 'success',
            payload
        }
    }

    error(){
        const { ctx } = this
        ctx.throw(500)
    }
}