export default (app) => {
    const { router,controller } = app

    router.post('/article/judge',controller.judge.judgeOther.index)
}