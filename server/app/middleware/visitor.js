/**
 * 每天访问人数统计
 * visitors: [
 *  {
 *    ip: ip,
 *    time: '',
 *    url: ''
 *  }
 * ]
 */
module.exports = () => {
  return async function visitor(ctx, next) {
    await next()

    const url = ctx.request.url
    const ip = ctx.getIpAddress()
    const date = ctx.dateFormat('YYYY-MM-DD')
    const data = await ctx.service.visitor.find({ date })

    if (!data) {
      ctx.service.visitor.create([{
        date,
        visitors: {
          ip,
          time: ctx.dateFormat('YYYY-MM-DD hh:mm:ss'),
          url
        }
      }])
    } else {
      if (!data.visitors.some(item => item.ip === ip)) {
        ctx.service.visitor.update(data, {
          ip,
          time: ctx.dateFormat('YYYY-MM-DD hh:mm:ss'),
          url
        })
      }
    }

  }
}