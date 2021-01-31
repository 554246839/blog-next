import { handleResult } from '../../utils'

// 文章列表
export async function getArticleList(http: any, data: any) {
  const res = await http.$get(`/web/articles`, data)
  return handleResult(res)
}
// 文章详情
export async function getArticleDetail(http: any, id: string) {
  const res = await http.$get(`/web/get-article-detail/${id}`)
  return handleResult(res)
}

// 分类列表
export async function getCategoryList(http: any) {
  const res = await http.$get('/web/get-categorys')
  return handleResult(res)
}