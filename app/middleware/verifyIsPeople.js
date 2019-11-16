module.exports = (option,app) => {
    return async function VerifyIsPeople(ctx,next){
        const redis = app.redis.get('work')

        let loginCount
        if(ctx.url == '/login'){
            let account = ctx.request.body && ctx.request.body.account
            if(account){
                // 如果需要验证码,先验证
                let needVerify = await app.needVerify(account)
                if(needVerify){
                    let waitVerifyCode = ctx.headers['x-limit']
                    if(await app.verifyCode(account,waitVerifyCode)){
                        return await next()
                    }
                    else {
                        const verifyCode = await app.setVerifyCode(account)
                        ctx.set('x-limit',verifyCode)

                        return ctx.body = {
                            type: 'false',
                            message: 'verifyCode error',
                        }
                    }
                }

                loginCount = await redis.incr(`loginCount${account}`)
                await redis.expire(`loginCount${account}`,60 * 20)
                if(loginCount > 3){
                    const verifyCode = await app.setVerifyCode(account)
                    ctx.set('x-limit',verifyCode)
                }
                await next()
            }
            else {
                ctx.body = {
                    type: 'false'
                }
            }    
        }
        else {
            await next()
        }
    }
}