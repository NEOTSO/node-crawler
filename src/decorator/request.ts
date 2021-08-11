import 'reflect-metadata';

export enum Methods {
    get = 'get',
    post = 'post'
}

const requestDecorator = (method: Methods) => {
    return (path: string): MethodDecorator => {
        return (target, key) => {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key); 
        }
    }
}

export const get = requestDecorator(Methods.get)
export const post = requestDecorator(Methods.post)