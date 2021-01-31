/**
 * 登录路由
 */
module.exports = app => {
  const { router, controller } = app
  
  // 登录
  router.post('/api/login', controller.login.login)
  // 验证
  router.post('/api/login/auth', controller.login.auth)
  // 退出登录
  router.post('/api/logout', controller.login.logout)
};