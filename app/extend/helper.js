/* eslint-disable */

module.exports = {
    parseMsg(action,payload={},metadata={},addition={}){
        const meta = {
            date:Date.now(),
            ...metadata
        }
        return {
            action,
            payload,
            meta,
            addition
        }
    },

    async delay(func,time){
        await new Promise((resolve) => {
            setTimeout(() => {
                func()
                resolve()      
            },time)
        })
    }
}