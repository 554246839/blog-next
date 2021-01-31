/**
 * 文章相关
 */

const Service = require('egg').Service;

class ArticleService extends Service {
  // 查询多个
  async find(query) {
    const pageSize = +query.pageSize
    const pageNo = +query.pageNo
    const isPublic = query.isPublic
    const searchKey = query.key
    const category = query.category

    const condition = isPublic ? { isPublic: true } : null

    if (category && category !== 'all') {
      condition.category = category
    }
    if (searchKey) {
      condition.title = new RegExp(searchKey)
    }

    const list = await this.ctx.model.Article
      .find(condition)
      .skip(pageNo * pageSize - pageSize)
      .limit(+pageSize)
      .sort({ _id: -1 })

    let total = await this.ctx.model.Article.find(condition).countDocuments()

    return {
      list,
      total,
      pageSize,
      pageNo: pageNo
    }
  }
  // 查询一个
  async findOne(query) {
    let queryData = {
      _id: query._id
    }
    if (query.isPublic) {
      query.isPublic = true
    }
    const result = await this.ctx.model.Article.findOne(queryData)
    return result
  }
  // 新增
  async insertOne(data) {
    const result = await this.ctx.model.Article.create(data)
    return result
  }
  // 更新
  async update(data) {
    const _id = data._id
    const result = await this.ctx.model.Article.updateOne({ _id }, data)
    return result
  }
  // 删除
  async delete(_id) {
    const result = await this.ctx.model.Article.deleteOne({ _id })
    return result
  }
}

module.exports = ArticleService
