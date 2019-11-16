import { Controller } from 'egg'

class HomeController extends Controller {
    async index() {
        const { ctx } = this
        ctx.app.verifyCode('sdsd','sdds')
        ctx.body = 'hi, egg'
    }
}

module.exports = HomeController