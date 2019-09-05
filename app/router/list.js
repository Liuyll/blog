module.exports = (app) => {
    const { router, controller } = app
    router.get('/list', controller.list.index)
    router.post('/list',controller.list.new)
}