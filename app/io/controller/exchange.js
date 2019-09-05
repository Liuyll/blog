/* eslint-disable */
const Controller = require('egg').Controller
const fs = require('fs')

module.exports = class exchange extends Controller{
    async index(){
        const {
            ctx ,
            app
        } = this
       
        const cb = ctx.args[1] || new Function()
        const payload = ctx.args[0] || {}
        const {
            payload:{
                type,
                message,
                data
            }
        } = JSON.parse(payload)

        

        try{
        const redis = app.redis.get('work')
        const socket = ctx.socket
        const nsp = app.io.of('/')
        const clientId = socket.id
        const id = await redis.hget('clients',clientId)
        
        if(type == 'pic'){
            console.log('get pic')
            fs.open('/data/blog/static/1.jpg','a+',(err,fd)=>{
                if(err) console.log(err)
                else {
                    fs.writeFileSync(fd,data)
                }
            })
        }
        // console.log(ctx.args[1].toLocaleString())
        // socket.to('chat').emit('hello',`user:${id} send a message:${message}`)
        app.io.of('/').to('test1').emit('info',JSON.stringify(ctx.helper.parseMsg(
            'send',
            {
                presenter:{
                    id,
                    socketId:clientId
                },
                message:message
            }
        )))
        
        cb(null,JSON.stringify({
            presenter:clientId,
            message:message,
            date:Date.now()
        }))
    }catch(error){
        cb(error)
        ctx.logger.error(`[chat client发送信息时出错] error:${error}`)
    }
        
    }
}