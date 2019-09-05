module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const UserInfoModel = new Schema({
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        myJudge: [
            {
                article: {
                    type: Schema.Types.ObjectId,
                    ref: 'Article'
                },
                content: String,
                like: {
                    like: {
                        type: Number,
                        default: 0
                    },
                    unlike: {
                        type: Number,
                        default: 0
                    }
                }
            }
        ],
        myArticle: {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        },
        attention: {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        },
        info: {
            judge: [
                {
                    content: String,
                    read: Boolean,
                    who: {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    time: Date
                }
            ]
        }
    })

    return mongoose.model('userInfo', UserInfoModel, 'userInfos')
}