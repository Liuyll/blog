export default (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const judgeSchema = new Schema({
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        other: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
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
            Number,
            default: 0
        },
        dislike: {
            Number,
            default: 0
        },
        time: {
            type: Date,
            default: new Date()
        }
    })

    return mongoose.model('Judge',judgeSchema,'judges')
}