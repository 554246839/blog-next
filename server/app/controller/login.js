'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx, app } = this
    const data = ctx.request.body
    let user = await ctx.service.user.find(data)
    user = user[0]

    if (!user) {
      ctx.body = {
        code: 4,
        errmsg: '用户名或密码错误'
      }
      return
    }

    const uuid = ctx.getUUID()

    await app.redis.set(uuid, JSON.stringify(user))
    app.redis.expire(uuid, 60 * 60 * 24 * 7)

    ctx.cookies.set(ctx.cookieToken, uuid, {
      maxAge: 1000 * 3600 * 24 * 7,
      signed: true,
      encrypt: true
    })
    
    ctx.handleResult({
      access_token: uuid
    })
  }
  async auth() {
    const { ctx, app } = this
    const token = ctx.cookies.get(ctx.cookieToken, { encrypt: true })

    const res = await app.redis.get(token)

    if (res) {
      ctx.handleResult(res)
    } else {
      ctx.body = {
        code: 199,
        errmsg: ''
      }
    }
    
  }
  async logout() {
    const { ctx, app } = this
    const token = ctx.cookies.get(ctx.cookieToken, { encrypt: true })

    const res = await app.redis.del(token)

    if (res) {
      ctx.handleResult(res)
    } else {
      ctx.body = {
        code: 7,
        errmsg: '退出失败'
      }
    }
  }
}

module.exports = LoginController;