export default (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const judgeSchema = new Schema({
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        other: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        },
        content: {
            type: String,
            required: true
        },
        like: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        }
    },{
        timestamps: true
    })

    return mongoose.model('Judge',judgeSchema,'judges')
}