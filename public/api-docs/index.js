'use strict'
const express = require('express')
const app = express()
const path = require('path')

app.use('/swagger',express.static(path.join(__dirname,'public')))
app.get('/',function(req,resp){
  
    resp.send(`
        swaggerui has started \n 
        please url to swagger
    `)
})
app.listen(3000, () => {
    console.log('[接口文档] 3001端口已开启')
})
