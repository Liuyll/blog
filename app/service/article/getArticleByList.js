const Service = require('egg').Service

module.exports = class _ extends Service{
    async index(group){
        const {ctx} = this

        // return await ctx.model.Article.
        //     aggregate().
        //     lookup({
        //         from:'users',
        //         localField:'author',
        //         foreignField:'_id',
        //         as:'author'
        //     }).
        //     lookup({
        //         from:'menus',
        //         localField:'type',
        //         foreignField:'group',
        //         as:'group'
        //     }).match({
        //         type:group
        //     }).
        //     // unwind().
        //     project('-group -author.password -author.auth')
        
        let articles = await ctx.model.Menu.
            findOne({
                _id:group
            }).
            populate('article','-content').
            populate({
                path:'article',
                populate:'author'
            }).lean()

        return articles
    }

}