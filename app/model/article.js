module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const articleSchema = new Schema({
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        type: String,
        signs: Array, //标签
        title: String,
        content: String,
        judge: [{
            other: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            content: String,
            time: String,

        }],
        addition: {
            like: Number,
            unlike: Number
        },
        time:{
            type:String,
            default:Date.now()
        },
        cover:{
            type:String,
            default:'1.jpg'
        }
    })

    // articleSchema.pre('save',function(next){

    // })
    return mongoose.model('Article', articleSchema, 'articles')

}