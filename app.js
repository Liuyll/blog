require('babel-register')
require('babel-polyfill')

const initSocket = require('./app/methods/initSocket')
const handleClientCount = require('./app/methods/handleSubsMessage').handleClientCount
const handleClientInfo = require('./app/methods/handleSubsMessage').handleClientInfo

const channelMap = {
    'chat/clients': handleClientCount,
    'chat/clientsInfo': handleClientInfo
}

module.exports = class AppBoot {
    constructor(app) {
        this.app = app
    }

    async didReady() {
        let io = this.app.io.of('/')
        let subs = await this.app.redis.get('subs')

        //init necessary 
        await initSocket(this.app.redis)

        subs.subscribe('chat/clients', 'chat/clientsInfo')

        subs.on('message', function (channel, message) {
            // console.log(message)
            
            channelMap[channel](message,io)
        })

    }
}