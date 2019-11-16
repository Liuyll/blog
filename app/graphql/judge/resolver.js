module.exports = {
    Query: {
        async byArticleId(root,{ id },ctx){
            let result = await ctx.connector.judge.getJudgeByArticleId(id)
            return result
        }
    },
    Mutation: {
        async judgeOther(root,{ infos },ctx){
            let result = await ctx.connector.judge.judgeOther(infos)
            return result
        }
    }
}