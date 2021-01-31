'use strict';

const fs = require('fs')
const path = require('path')

const Controller = require('egg').Controller;

class AdminController extends Controller {

  /*****************************文章*****************************/
  // 获取文章列表
  async getArticleList() {
    const { ctx } = this
    const query = ctx.request.query

    const data = await ctx.service.article.find(query)

    ctx.body = {
      code: 200,
      data
    }
  }
  // 获取文章详情
  async getArticleDetail() {
    const { ctx } = this
    const _id = ctx.params._id
    
    const data = await ctx.service.article.findOne({ _id })

    ctx.body = {
      code: 200,
      data
    }
  }
  // 发布/更新文章
  async putArticle() {
    const { ctx } = this
    const content = ctx.request.body
    let data = ''

    const id = content._id
    if (id === '0') {
      // 新增
      delete content._id
      data = await ctx.service.article.insertOne(content)
    } else {
      // 更新
      data = await ctx.service.article.update(content)
    }


    ctx.body = {
      code: 200,
      data
    }
  }
  // 删除文章
  async deleteArticle() {
    const { ctx } = this
    const content = ctx.request.body
    const data = await ctx.service.article.delete(content._id)

    ctx.body = {
      code: 200,
      data
    }
  }

  /*****************************图片*****************************/
  // 上传图片
  async uploadImg() {
    const { ctx } = this

    const files = ctx.request.files

    if (!files || !files[0]) {
      ctx.body = {
        code: 1,
        errmsg: '请添加上传文件'
      }
      return
    }

    const file = files[0]
    const newFilePath = path.resolve(__dirname, `../public/temp/${file.filename}`)

    try {
      const readStream = fs.createReadStream(file.filepath)
      const writeStream = fs.createWriteStream(newFilePath)

      readStream.pipe(writeStream)
      readStream.on('end', () => {
        fs.unlinkSync(file.filepath)
      })
      ctx.body = {
        code: 200,
        data: {
          url: `${ctx.domain}/public/temp/${file.filename}`
        }
      }
    } catch (e) {
      ctx.body = {
        code: 2,
        errmsg: '上传失败',
        stack: JSON.stringify(e)
      }
    }
  }
  // 删除图片
  deleteImg() {
    const { ctx } = this
    const reg = /.*(\/public\/.*)/

    const filePath = ctx.request.body
    const regExec = reg.exec(filePath.url.value)

    if (!regExec) {
      ctx.body = {
        code: 3,
        errmsg: '图片路径匹配错误'
      }
      return
    }

    const publicPath = regExec[1]
    const absuloteFilePath = path.join(__dirname, '..', publicPath)

    fs.unlink(absuloteFilePath, err => {
      let result = ''
      if (err) {
        result = {
          code: 4,
          errmsg: '失败',
          stack: JSON.stringify(err)
        }
      } else {
        result = {
          code: 200,
          errmsg: '成功'
        }
      }

      ctx.body = result
    })
    
    ctx.body = {
      code: 200,
      errmsg: '成功'
    }
  }

  /*****************************分类*****************************/
  async getCategoryList() {
    const { ctx } = this
    const result = await ctx.service.category.find()
    
    ctx.body = {
      code: 200,
      data: result
    }
  }
  async addCategory() {
    const { ctx } = this
    const data = ctx.request.body
    const result = await ctx.service.category.insertOne(data)
    
    ctx.body = {
      code: 200,
      data: result
    }
  }
  async deleteCategory() {
    const { ctx } = this
    const data = ctx.request.body
    const result = await ctx.service.category.delete(data._id)
    
    ctx.body = {
      code: 200,
      data: result
    }
  }
  async updateCategory() {
    const { ctx } = this
    const data = ctx.request.body
    const result = await ctx.service.category.update(data)
    
    ctx.body = {
      code: 200,
      data: result
    }
  }
}

module.exports = AdminController;