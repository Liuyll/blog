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

        //该字段作为edit的draft
        editDraft: String,
        judge: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Judge'
            }
        ],
        addition: {
            like: Number,
            unlike: Number
        },
        time: {
            type: String,
            default: Date.now()
        },
        cover: {
            type: String,
            default: '1.jpg'
        },
        like: {
            type: Number,
            default: 0
        },
        collect: {
            type: Number,
            default: 0
        },
        browseCount: {
            type: Number,
            default: 0
        }
    },{
        timestamps: true
    })

    // articleSchema.pre('save',function(next){

    // })
    return mongoose.model('Article', articleSchema, 'articles')

}