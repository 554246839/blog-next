'use strict';

const Controller = require('egg').Controller

class WebController extends Controller {
  async getArticleList() {
    const { ctx } = this
    const query = ctx.request.query

    const data = await ctx.service.article.find({...query, isPublic: true})

    const categoryList = await ctx.service.category.findToObject()

    data.list.forEach(item => {
      item.categoryLabel = categoryList[item.category]
    })

    ctx.body = {
      code: 200,
      data
    }
  }

  async getArticleDetail() {
    const { ctx, app } = this
    const redis = app.redis
    const _id = ctx.params._id

    const data = await ctx.service.article.findOne({ _id, isPublic: true })

    const categoryList = await ctx.service.category.findToObject()
    data.categoryLabel = categoryList[data.category]
    
    const IP = ctx.getIpAddress()

    const visitors = await redis.smembers(_id)

    if (!visitors || !visitors.includes(IP)) {
      await redis.sadd(_id, IP)
      !visitors.length && redis.expire(_id, ctx.getRemainTime())
      await ctx.service.article.update({
        _id: data._id,
        readNums: data.readNums + 1
      })
    }

    ctx.handleResult(data)
  }
}

module.exports = WebController