const jwt = require('jsonwebtoken')
const Service = require('egg').Service

module.exports = class Auth extends Service {
    async SignJwt(_id) {
        console.log(_id)
        return await jwt.sign({
            id:_id, 
            auth:'admin',
            exp: new Date() / 1000 + 60*60*24 // one day
        }, 'screat')
    }

    async decodeJwt(token) {
        try {
            return await jwt.verify(token, 'screat')
        } catch (e) {
            console.log(e)
            return 'error'
        }
    }
}