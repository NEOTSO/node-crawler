import { RequestHandler } from 'express'
import 'reflect-metadata';

export const use = (middleware: RequestHandler): MethodDecorator => {
    return (target, key) => {
        const middlewares = Reflect.getMetadata('middlewares', target, key) || []
        middlewares.push(middleware)
        Reflect.defineMetadata('middlewares', middlewares, target, key)
    }
}