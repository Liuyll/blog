import { Service } from 'egg'

export default class CreateUserService extends Service{
    async index(account,passwd){
        const {
            ctx: {
                model: User
            },
            app: {
                ByLog
            }
        } = this

        try{
            let newUser = new User({
                account,
                password: passwd
            })
            newUser.save()
        }catch(error){
            ByLog.error({
                path: '/user',
                method: 'POST',
                type: 'mongo'
            },`创建用户出错,error:${error}`)
        }
    }
}
