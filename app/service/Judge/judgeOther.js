import { Service } from 'egg'

export default class JudgeOtherService extends Service{
    async index(info,id){
        const {
            ctx:{
                model:{
                    UserInfo
                }
            }
        } = this

        info = JSON.parse(info)
        const {
            id:sendId
        } = info

        await UserInfo.findByIdAndUpdate(sendId,{
            $push:{
                muJudge: info
            }
        })

        await UserInfo.findByIdAndUpdate(id,{
            $push:{
                'info.judge':''
            }
        })
    }
}