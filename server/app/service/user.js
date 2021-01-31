/**
 * 用户相关
 */

const Service = require('egg').Service;

class UserService extends Service {
  async find(data) {
    const user = await this.ctx.model.User.find(data)
    return user
  }
  async create(data) {
    const res = await this.ctx.model.User.create(data)
    return res
  }
}

module.exports = UserService;
