const jwt = require('jsonwebtoken')
const config = require('../../application_config.js')

module.exports = {
    get auth() {
        var identify
        var secure = this.get('authorization')
   
        if (!secure) return 'none'
        else {
            try {
                identify = jwt.verify(secure, 'screat')
                this.id = identify.id
                return identify ? identify.auth : 'none'
            } catch (error) {
                console.log(`auth error : ${error}`) // eslint-disable-line
                return 'none'
            }
        }
    },
    get infos() {
        let identify
        let accountId
        let accountInfo

        let secure = this.get('authorization') 
        if (!secure) return {}
        else {
            try {
                accountInfo = jwt.verify(secure, 'screat')
                identify = accountInfo ? accountInfo.auth : 'none'
                accountId = accountInfo.id
            } catch (error) {
                this.logger.error(`[权限认证 解析jwt时出现错误] error:${error}`)
                identify = 'none'
            }
            return {
                identify,
                accountId
            }
        }
    },
    get config(){
        return config
    },
    get accountId(){
        return this.id 
    }
}