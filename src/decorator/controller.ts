import { RequestHandler } from 'express'
import 'reflect-metadata';
import router from '../router';
import { Methods } from './request';

router.get('/test', (req, res) => {
    res.send('test api')
})

export const controller = (root: string): ClassDecorator => {
    return (target) => {
        for (const key in target.prototype) {
            const path = Reflect.getMetadata('path', target.prototype, key)
            const method: Methods = Reflect.getMetadata('method', target.prototype, key)
            const middlewares = Reflect.getMetadata('middlewares', target.prototype, key)
            const handler: RequestHandler = target.prototype[key]
            if (path && method) {
                const fullPath = root === '/' ? path: `${root}${path}`
                try {
                    console.log('method')
                    console.log(method)
                    console.log(fullPath)
                    console.log(middlewares)
                    if (middlewares && middlewares.length) {
                        router[method](fullPath, ...middlewares, handler)
                    } else {
                        router[method](fullPath, handler)
                    }
                } catch(err) {
                    console.log(err)
                }
                
            }
        }
    }
}