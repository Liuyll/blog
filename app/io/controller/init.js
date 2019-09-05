const Controller = require('egg').Controller

module.exports = class SocketInit extends Controller{
    async index(){
        const {ctx ,app} = this

        // const logger = ctx.logger
        const redis = app.redis.get('work')
        // eslint-disable-next-line
        const nsp = app.io.of("/")
        const config = ctx.config
        
        //ctx.args[0] 获取client socket send发送的参数
        const msg = ctx.args[0] && JSON.parse(ctx.args[0]) || {}
        const socket = ctx.socket
        const room = msg.room

        // console.log(app.io.controller.updateClientCount.index)
        // await app.io.controller.updateClientCount.index()

        const chatroom = await redis.get(`${config.chatRoom}/${room}`)
        if(!chatroom){
            console.log(`${config.chatRoom}/${room}`)
            socket.send(JSON.stringify({
                type:'tick',
                message:'no this room'
            }))
        }
        else {
            console.log(`用户${socket.id} 加入直播间${room}`)
            socket.join(room)
        }

        
        socket.send('server receive')
    }

    async getClients(socket,rooms){
        const {ctx ,app} = this

        const logger = ctx.logger
        const redis = app.redis.get('work')
        const nsp = app.io.of("/")
        
        nsp.adapter.clients([rooms],async (err,clients) => {
            if(err){
                logger.error(`[查找room:${rooms}时出错] error:${err} `)
            }
            let mapClients 
            for(const client of clients){
                let map = await redis.hget('clients',client)
                mapClients.push(map)
            }
            socket.emit('getRoomClients',JSON.stringify(ctx.helper.parseMsg(
                'updateClients',
                mapClients
            )))
        })
    }
}