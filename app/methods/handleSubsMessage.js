const userModel = require('../model/user')

async function handleClientCount(message,io){
    
    const data = JSON.parse(message)
    const { room, count } = data

    if(room == '/') return io.emit('updateClientCount',count)
    io.to(room).emit('updateClientCount', count)
}

async function handleClientInfo(message,io){

    const data = JSON.parse(message)
    const { room, clients} = data
    
    let clientInfo = []
    for(let client of clients){
        clientInfo.push(await userModel.findById(client))
    }

    io.to(room).emit('updateClients',clientInfo)
}

module.exports = {
    handleClientCount,
    handleClientInfo
}