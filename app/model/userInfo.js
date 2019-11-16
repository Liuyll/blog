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
        },
        draft: {
            // 编辑已有文章的草稿
            editDraft: [{
                type: Schema.Types.ObjectId,
                ref: 'Article'
            }],
            // 新文章的草稿
            newDraft: String
        }
    })

    return mongoose.model('userInfo', UserInfoModel, 'userInfos')
}