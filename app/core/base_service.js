import { Service } from 'egg'

export default class base_service extends Service{
    getModel(modelName){
        const {
            ctx: {
                app: {
                    model
                }
            }
        } = this

        return model[modelName]
    }

    getModels(...modelNames){
        const {
            ctx: {
                app: {
                    model
                }
            }
        } = this
        return modelNames.reduce((models,modelName) => {
            models.push(model[modelName])
            return models
        },[])
    }
}