module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const menuSchema = new Schema({
        group: String,
        pid: {
            type: mongoose.Types.ObjectId,
            ref: 'Menu'
        },
        article:[
            {
                type:Schema.Types.ObjectId,
                ref:'Article'
            }
        ]
    })

    menuSchema.statics.findParent = async function(_id) {
        return await this.find({ _id }).populate('pid')
    }

    menuSchema.statics.findAll = async function() {
        return await this.find({})
    }
    
    return mongoose.model('Menu', menuSchema, 'menus')
}