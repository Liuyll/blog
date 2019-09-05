module.exports = (app) => {
    // eslint-disable-next-line
    const {router, controller, io} = app
    io.of('/').route('chat',io.controller.init.index) //io.of 限定了nsp route是监听的emit消息
    io.of('/').route('submit',io.controller.exchange.index)
    io.of('/').route('updateClientCount',io.controller.updateClientCount.index)
}