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
                type: Schema.Types.ObjectId,
                ref: 'Judge'
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
                    type: Schema.Types.ObjectId,
                    ref: 'Judge'
                }
            ]
        }
    })

    return mongoose.model('userInfo', UserInfoModel, 'userInfos')
}