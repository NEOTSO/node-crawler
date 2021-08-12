import { Request, Response } from 'express'
import { controller, post } from '../decorator'

@controller('/')
export class UserController {
    static isLogin = (req: Request) => {
        return !!(req.session ? req.session.isLogin: false)
    }

    @post('/login')
    login(req: Request, res: Response) {
        console.log('####')
        console.log(req.body)
        const isLogin = UserController.isLogin(req)
        if (isLogin) {
            res.send('已经登陆过')
        } else {
            res.send('登陆测试')
        }
    }
}