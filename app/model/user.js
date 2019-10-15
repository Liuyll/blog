const _ = require('lodash')

const crypto = require('crypto')
const hash = crypto.createHash('sha256') //默认调用hash.digest
import bunyan from '../../config/bunyan'

module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const UsersSchema = new Schema({
        account: { type: String },
        password: { type: String },
        auth: {
            type: String,
            default: 'none'
        }
    })

    UsersSchema.pre('save',function save(next){
        if(_.nil(this.password)){
            this.password = hash.update(this.password)
            next()
        }
    })

    UsersSchema.pre('find',function find(next){

        try{
            if(this.auth !== 'admin'){
                this.password = hash.update(this.password)
            }
        }catch(err){
            bunyan.error({
                type: 'mongo',
                reason: `拦截器劫持出错`,
                error: `err:${err}`
            })
        }finally{
            next()
        }
    })

    return mongoose.model('User', UsersSchema, 'users')
}