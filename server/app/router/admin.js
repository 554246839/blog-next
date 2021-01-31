/**
 * 管理端路由
 */
module.exports = app => {
  const { router, controller } = app

  // 获取文章列表
  router.get('/api/admin/articles', controller.admin.getArticleList)

  // 获取文章详情
  router.get('/api/admin/get-article-detail/:_id', controller.admin.getArticleDetail)

  // 发布/更新文章
  router.post('/api/admin/put-article', controller.admin.putArticle)

  // 删除文章
  router.post('/api/admin/delete-article', controller.admin.deleteArticle)

  // 上传图片
  router.post('/api/admin/upload-image', controller.admin.uploadImg)
- 
  // 删除图片
  router.post('/api/admin/delete-image', controller.admin.deleteImg)

  // 获取分类
  router.get('/api/admin/get-categorys', controller.admin.getCategoryList)

  // 新增分类
  router.post('/api/admin/add-category', controller.admin.addCategory)

  // 删除分类
  router.post('/api/admin/delete-category', controller.admin.deleteCategory)

  // 更新分类
  router.post('/api/admin/update-category', controller.admin.updateCategory)

  // 获取访客数据
  router.get('/api/admin/get-visitors', controller.visitor.getVisitors)

}