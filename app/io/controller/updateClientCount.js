const Controller= require('egg').Controller

module.exports = class _ extends Controller{
    async index(){
        const { app,ctx } = this
        const {
            room
        } = JSON.parse(ctx.args[0])

        try{
            const pubs = await app.redis.get('pubs')
            
            await pubs.incr('clientCount')
            let updateInfo = JSON.stringify({
                room:room,
                count:await pubs.get('clientCount')
            })
            pubs.publish('chat/clients',updateInfo)
        }catch(error){
            //
        }
    }
}

