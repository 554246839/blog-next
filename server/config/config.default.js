/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609649288018_9504';

  config.session = {
    renew: true
  }
  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        if(ctx.request.url.indexOf('/api') != -1){
          return true
        } else {
          return false
        }
      }
    },
    domainWhiteList: [ 'http://127.0.0.1:8090' ]
  }
  config.cors = {
    origin: '*', // 访问白名单,根据你自己的需要进行设置
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public')
  }

  // 文件上传
  config.multipart = {
    mode: 'file'
  }

  config.onerror = {
    all(err, ctx) {
      console.log('error => all')
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error'
      ctx.status = 500
    },
    json(err, ctx) {
      console.log('error => json')
      // json hander
      ctx.body = { message: 'error' }
      ctx.status = 500
    }
  }

  // add your middleware config here
  config.middleware = [
    'visitor',
    'error',
    'notfoundHandler',
    'adminAuth'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    cluster: {
      listen: {
        port: 8888
      }
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/blog',
        options: {
          server: {
            poolSize: 40
          },
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      }
    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: 'kd123456',
        db: 0
      }
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
