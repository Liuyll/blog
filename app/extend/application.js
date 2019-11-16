const bunyan = require('../../config/bunyan')
const generateRandomCode = require('../methods/generateRandomCode')

module.exports = {
    get ByLog(){
        return bunyan
    },
    get _redis(){
        return this['redis'].get('work')
    },
    async setVerifyCode(account){
        const redis = this.redis.get('work')
        let verifyCode = generateRandomCode()
        try {
            await redis.set(`verifyCode+${account}`,verifyCode,'EX',6000)
            return verifyCode
        }catch(e){
            console.log(e)
        }
    },
    async verifyCode(account,code){
        const redis = this['redis'].get('work')
        let correctCode = await redis.get(`verifyCode+${account}`)
        console.log(correctCode,code,correctCode == code)
        return correctCode == code ? true : false
    },
    async needVerify(account){
        let code = await this._redis.get(`verifyCode+${account}`)
        return code ? true : false
    }
}