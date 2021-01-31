/**
 * 访客相关
 */

const Service = require('egg').Service;

class VisitorService extends Service {
  async findAll(query) {
    const pageSize = +query.pageSize
    const pageNo = +query.pageNo
    const list = await this.ctx.model.Visitor.find()
      .skip(pageNo * pageSize - pageSize)
      .limit(+pageSize)

    let total = await this.ctx.model.Visitor.find().countDocuments()
    return {
      list,
      total,
      pageSize,
      pageNo: pageNo
    }
  }
  async find(data) {
    const res = await this.ctx.model.Visitor.findOne(data)
    return res
  }
  async create(data) {
    const res = await this.ctx.model.Visitor.create(data)
    return res
  }
  async update(origin, data) {
    origin.visitors.push(data)
    const updateRes = await this.ctx.model.Visitor.updateOne(
      { _id: origin._id },
      origin
    )
    return updateRes
  }
}

module.exports = VisitorService;
