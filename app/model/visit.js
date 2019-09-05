module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const visitSchema = new Schema({
        area:{
            type:String,
            required:true,
            index:true
        },

        count:Number,
        history:{
            type:Date
        }
    })

    return mongoose.model('visit',visitSchema,'visits')
}