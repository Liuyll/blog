/* eslint valid-jsdoc: "off" */
const path = require('path')

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {}

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_key'

    config.static = {
        prefix: '/public/',
        dir:path.join(appInfo.baseDir,'/app/public')
    }
    // add your middleware config here
    config.middleware = ['printconnect']

    // add your user config here

    config.mongoose = {
        client: {
            url: "mongodb://127.0.0.1/blog",
            options: {}
        }
    }

    config.redis = {
        clients: {
            subs: {
                host: '127.0.0.1',
                port: 6379,
                db: 0,
                password: ''
            },
            pubs: {
                host: '127.0.0.1',
                port: 6379,
                db: 0,
                password: ''
            },
            work: {
                host: '127.0.0.1',
                port: 6379,
                db: 2,
                password: ''
            }
        }
    }


    config.joi = {
        option: {},
        throw: true,
        throwHandle: (error) => { return error }, // error message format when throw is true
        errorHandle: (error) => { return error }, // error message format when throw is false
        resultHandle: (result) => { return result } // fromat result
    }
    const userConfig = {
        // myAppName: 'egg',
    }

    //关闭csrf
    config.security = {
        csrf: {
            enable: false,
        },
    }

    config.io = {
        init: {},
        namespace: {
            '/': {
                connectionMiddleware: ['connection']
            },
            'chat': {}
        },
        redis: {
            host: '127.0.0.1',
            port: 6379,
        }
    }

    // config.swagger2 = {
    //     enable: false, // 禁用swagger , 默认为true
    //     base: {
    //         schemes: [
    //             'http',
    //         ],
    //         host: '127.0.0.1:7001',
    //         basePath: '/',
    //         consumes: [
    //             'application/json',
    //         ],
    //         produces: [
    //             'application/json',
    //         ],

    //         info: {
    //             description: 'This is a test swagger-ui html',
    //             version: '1.0.0',
    //             title: 'TEST',
    //             contact: {
    //                 email: 'caandoll@aliyun.com',
    //             },
    //             license: {
    //                 name: 'Apache 2.0',
    //                 url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    //             },
    //         },
    //         tags: [
    //             {
    //                 name: 'admin',
    //                 description: 'Admin desc',
    //             },
    //             {
    //                 name: 'role',
    //                 description: 'Role desc',
    //             },
    //         ],
    //         definitions: {
    //             // model definitions
    //         },
    //         securityDefinitions: {
    //             // security definitions
    //         }
    //     },
    // }

    return {
        ...config,
        ...userConfig,
    }
}