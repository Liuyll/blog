const Service = require('egg').Service

module.exports = class HomeService extends Service {
    constructor(ctx) {
        super(ctx)
    }
    async FindTest() {
        console.log(this.ctx.model)
    }
}