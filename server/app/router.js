'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  router.get('/api/', controller.home.index)
  // router.get('/api/user', controller.home.user) // mongodb
  // router.get('/api/testRedis', controller.home.testRedis) // redis
  
  require('./router/admin')(app)
  require('./router/web')(app)
  require('./router/login')(app)
}
