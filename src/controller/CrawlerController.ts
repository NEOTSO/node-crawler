import { Request, Response, NextFunction } from 'express'
import ToptoonAnalyzer from '../analyzer/ToptoonAnalyzer'

import Crawler from './Crawler'
import { controller, get, use } from '../decorator'

const auth = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = !!(req.session ? req.session.isLogin: false)
    if (isLogin) {
        next()
    } else {
        res.send('请重新登录')
    }
}

const test = (req: Request, res: Response, next: NextFunction) => {
    console.log('test middleware')
    next()
}

@controller('/')
export class CrawlerController {
    constructor() {
        console.log(CrawlerController)
    }

    @get('/getdata')
    // @use(auth)
    @use(test)
    getData(req: Request, res: Response) {
        console.log('getdata....')
        const url = "https://www.toptoon.net/comic/epList/80583"
        const analyzer = new ToptoonAnalyzer()
        new Crawler(url, analyzer)
        res.send('success666')
    }
}