/**
 * 错误捕获
 */
module.exports = () => {
  return async function catchError(ctx, next) {
    try {
      await next()
    } catch (e) {
      console.log('checkError', e)
      ctx.body = {
        code: -1,
        errmsg: '执行错误',
        stack: e
      }
    }
  }
}