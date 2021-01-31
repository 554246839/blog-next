/**
 * 管理端接口权限校验
 */
module.exports = () => {
  return async function adminAuth(ctx, next) {
    const url = ctx.request.url

    if(url.startsWith('/api/admin/')) {
      const token = ctx.cookies.get(ctx.cookieToken, { encrypt: true })

      // 权限校验
      if (token) {
        const result = await ctx.app.redis.get(token)
        if (result) {
          await next()
          return
        }
      }
      ctx.body = {
        code: 99,
        errmsg: '没有登录，请重新登录'
      }
    } else {
      await next()
    }
  }
}