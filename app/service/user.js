const Service = require('egg').Service

module.exports = class UserService extends Service {
    async verifyAccount({ account, password }) {
        const { ctx } = this
        var user = await ctx.model.User.findOne({
            account,
            password
        })


        if (user) return user._id
        return false
    }
}