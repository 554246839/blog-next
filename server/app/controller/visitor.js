'use strict';

const Controller = require('egg').Controller;

class VisitorController extends Controller {
  async getVisitors() {
    const { ctx } = this;
    const query = ctx.request.query
    const result = await ctx.service.visitor.findAll(query)

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = VisitorController;
