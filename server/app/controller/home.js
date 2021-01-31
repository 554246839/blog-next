'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });

    ctx.cookies.set('token', 'abcd-efgh', {
      encrypt: true,
      signed: true
    })
    
    ctx.session.visited = ctx.session.visited ? (ctx.session.visited + 1) : 1;

    ctx.body = {
      status: result.status,
      headers: result.headers,
      package: result.data,
      data: 'hi, egg'
    };
  }

  user() {
    const { ctx } = this;

    // const result = await ctx.service.runoob.find()

    ctx.body = 'result'
  }

  async testRedis() {
    const { ctx, app } = this;
    // set
    await app.redis.set('foo', 'bar');
    // get
    ctx.body = await app.redis.get('foo');

  }
}

module.exports = HomeController;
