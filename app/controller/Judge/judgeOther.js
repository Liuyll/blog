import { Controller } from 'egg'
import _ from 'lodash'
import { safe_parse } from '../../methods/utils'

export default class judgeOtherController extends Controller{
    async index() {
        let { 
            ctx,
            ctx:{ params:{ id } , request:{ body } },
        } = this   

        let result

        result = await ctx.service.Judge.judgeOther.index(JSON.stringify(body),id)
        if (_.get(safe_parse(result), 'type', false)) {
            return ctx.body = {
                type: 'failed'
            }
        }
        else {
            ctx.body = {
                type: 'success'
            }
        }  
    } 
}