/* eslint-disable */
var colors = require('colors')

module.exports = (option,app) => {
    return async function(ctx,next){
        const {url , method , protocol} = ctx
        console.log(`有一个请求到达 : path=${url} method=${method} protocol=${protocol}`.blue)
        console.log(`用户权限为:${await ctx.auth}`.red)
        await next()
        console.log(`end url=${url} 请求结束`.blue)
    }
}