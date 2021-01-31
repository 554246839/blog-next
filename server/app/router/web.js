/**
 * web端路由
 */
module.exports = app => {
  const { router, controller } = app

  // 获取文章列表
  router.get('/api/web/articles', controller.web.getArticleList)

  // 获取文章详情
  router.get('/api/web/get-article-detail/:_id', controller.web.getArticleDetail)

  // 获取分类
  router.get('/api/web/get-categorys', controller.admin.getCategoryList)
}