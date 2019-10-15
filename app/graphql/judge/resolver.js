module.exports = {
    Query: {
        async byArticleId(root,{ id },ctx){
            let result = await ctx.connector.judge.getJudgeByArticleId(id)
            return result
        }
    }
}