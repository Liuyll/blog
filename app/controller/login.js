const Controller = require('egg').Controller

module.exports = class Login extends Controller {
    async index() {
        const {
            ctx
        } = this

        if (ctx.header && ctx.header.Authorization) {
            try {
                var verify = await ctx.service.auth.verify(ctx.header.Authorization)
                ctx.body = JSON.stringify({
                    type: 'success'
                })

            } catch (error) {
                ctx.body = JSON.stringify({
                    type: 'fail',
                    detail: 'login'
                })
            }
        } else {
            // eslint-disable-next-line
            var verify = await ctx.service.user.verifyAccount(ctx.request.body)
            
            if (verify) {
                var jwt = await this.service.auth.SignJwt(verify)
                ctx.set('Authorization', jwt)
                return ctx.body = JSON.stringify({
                    type: 'success',
                    accountId:verify
                })
            } else ctx.body = JSON.stringify({
                type: 'fail',
                detail: 'login'
            })
        }
    }
}