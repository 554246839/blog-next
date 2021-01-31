/**
 * 权限相关
 */

const Service = require('egg').Service;

class AuthService extends Service {
  async find() {
    console.log(this.ctx.model.Runoob)
    const runoob = await this.ctx.model.Runoob.find();
    return runoob;
  }
}

module.exports = AuthService;
