const bunyan = require('bunyan')
const path = require('path')
const fs = require('fs')

const logPath = path.join(__dirname,'../logs/bunyan/server')
const logFilePath = path.join(logPath,'error.log')

;(function mkLogfile(){
    try{
        if(fs.existsSync(logPath)) return     
        if(!fs.existsSync(logFilePath)) fs.open(logFilePath,'w')
    }catch(error){
        fs.mkdirSync(logPath,{ recursive: true })
        // type = file时使用 rotating-file不使用
        // fs.open(logFilePath,'w')
        console.log('已建立日志文件夹')
    }
})()

let log2file = bunyan.createLogger({
    name: 'log2file',
    streams: [{
        type: 'rotating-file',
        path: logFilePath,
        period: '1d',
        count: 3
    }]
})

module.exports = log2file