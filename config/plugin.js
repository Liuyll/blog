'use strict'

/** @type Egg.EggPlugin */
// module.exports = {
//     // had enabled by egg
//     // static: {
//     //   enable: true,
//     // }
//     mongoose: {

// };
exports.graphql = {
    enable: true,
    package: 'egg-graphql'
}

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose'
}

exports.redis = {
    enable: true,
    package: 'egg-redis'
}

exports.joi = {
    enable: true,
    package: 'egg-joi'
}

exports.io = {
    enable: true,
    package: 'egg-socket.io'
}

exports.cors = {
    enable: true,
    package: 'egg-cors',
}

// exports.swagger2 = {
//     enable:true,
//     package:'egg-swagger2'
// }