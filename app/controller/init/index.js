const Controller = require('egg').Controller

module.exports = class _ extends Controller{
    async index(){
        var {
            ctx:{
                infos:{
                    identify,
                    accountId
                }
            },
            ctx
        } = this

        if(identify != 'none'){
            return ctx.body = {
                state:'login',
                id:accountId
            }
        }

        ctx.body = {
            state:'unlogin'
        }

    }
}