const service = require('egg').service

module.exports = class connectionService extends service{
    async updateClientCount(room){
        const { app } = this
        const pubs = await app.redis.get('pubs')
        await pubs.incr('clientCount')
        let updateInfo = JSON.stringify({
            room:room,
            count:pubs.get('clientCount')
        })
        pubs.publish('chat/clients',updateInfo)
    }
}