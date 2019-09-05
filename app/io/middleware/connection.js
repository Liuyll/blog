// eslint-disable-next-line
module.exports = (app) => {
    return async (ctx, next) => {
        let auth 
        let id
        
        const redis = app.redis.get('work')
        // const pubs = app.redis.get('pubs')

        if(ctx.socket.handshake.query && (auth = ctx.socket.handshake.query.auth)){
            let identify = await ctx.service.auth.decodeJwt(auth)
            if(identify !== 'error'){
                console.log(`Welcome ${identify.auth} come in!`)
                id = identify.id
                await redis.hset('clients',id,ctx.socket.client)
                await next()
                await redis.del('clients',id)
                console.log(`用户:${ctx.socket.id}离开直播间`)

                await app.redis.get('pubs').decr('clientCount')
                app.redis.get('pubs').publish('chat/clients',JSON.stringify({
                    room:'/',
                    count:await app.redis.get('pubs').get('clientCount')
                }))
            }
            else {
                console.log('[io中间件拦截了 reason:not auth]')
                ctx.socket.disconnect(true)
            }   
        }

    }
}