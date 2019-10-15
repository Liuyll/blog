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
        dir: path.join(appInfo.baseDir,'/app/public')
    }
    // add your middleware config here
    config.middleware = ['graphql','printconnect']

    // add your user config here

    config.mongoose = {
        client: {
            // url: "mongodb://127.0.0.1:30002,127.0.0.1:30001/blog?replicaSet=blog",
            url: "mongodb://127.0.0.1:27017/blog",
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

    config.graphql = {
        rrouter: '/graphql',
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
        // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
        graphiql: true,
        //是否设置默认的Query和Mutation, 默认关闭
        defaultEmptySchema: false,
        // graphQL 路由前的拦截器
        onPreGraphQL: function* (ctx) {},
        // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
        onPreGraphiQL: function* (ctx) {},
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

    return {
        ...config,
        ...userConfig,
    }
}