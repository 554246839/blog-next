/**
 * 分类相关
 */

const Service = require('egg').Service;

class CategoryService extends Service {
  // 查询所有分类
  async find() {
    let data = await this.ctx.model.Category.find()
    return data
  }
  // 查询并转object
  async findToObject() {
    const data = await this.find()
    const categoryList = {}
    data.forEach(item => {
      categoryList[item.value] = item.name
    })
    return categoryList
  }
  // 新增
  async insertOne(data) {
    const result = await this.ctx.model.Category.create(data)
    return result
  }
  // 更新
  async update(data) {
    const _id = data._id
    const result = await this.ctx.model.Category.update({ _id }, data)
    return result
  }
  // 删除
  async delete(_id) {
    const result = await this.ctx.model.Category.deleteOne({ _id })
    return result
  }
}

module.exports = CategoryService
