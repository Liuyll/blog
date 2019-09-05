const _ = require('lodash')

const crypto = require('crypto')
const hash = crypto.createHash('sha256') //默认调用hash.digest

module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const UsersSchema = new Schema({
        account: { type: String },
        password: { type: String },
        auth:{
            type:String,
            default:'none'
        }
    })

    UsersSchema.pre('save',function save(next){
        if(_.nil(this.password)){
            this.password = hash.update(next)
        }
    })

    // UsersSchema.pre('find',function find(next){
    //     if()
    // })

    return mongoose.model('User', UsersSchema, 'users')
}