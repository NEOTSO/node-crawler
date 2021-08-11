import { RequestHandler } from 'express'
import 'reflect-metadata';
import router from '../router';
import { Methods } from './request';

console.log('xxxx')
console.log(router)

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
                    router[method](fullPath, ...middlewares, handler)
                } catch(err) {
                    console.log(err)
                }
                
            }
        }
    }
}