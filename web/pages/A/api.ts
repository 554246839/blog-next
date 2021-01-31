import { handleResult } from '../../utils'

// 文章列表/文章详情/文章删除
export async function getArticleList(http: any, data: any) {
  const res = await http.$get(`/admin/articles`, data)
  return handleResult(res)
}
export async function getArticleDetail(http: any, id: string) {
  const res = await http.$get(`/admin/get-article-detail/${id}`)
  return handleResult(res)
}
export async function putArticle(http: any, data: any) {
  const res = await http.$post('/admin/put-article', data)
  return handleResult(res)
}
export async function deleteArticle(http: any, data: any) {
  const res = await http.$post('/admin/delete-article', data)
  return handleResult(res)
}

// 图片上传及删除
export async function uploadImg(http: any, formdata: FormData) {
  const res = await http.$post('/admin/upload-image', formdata)
  return handleResult(res)
}
export async function deleteImg(http: any, data: any) {
  const res = await http.$post('/admin/delete-image', data)
  return handleResult(res)
}

// 分类列表
export async function getCategoryList(http: any) {
  const res = await http.$get('/admin/get-categorys')
  return handleResult(res)
}
// 添加分类
export async function addCategory(http: any, data: any) {
  const res = await http.$post('/admin/add-category', data)
  return handleResult(res)
}
// 删除分类
export async function deleteCategory(http: any, _id: string) {
  const res = await http.$post('/admin/delete-category', { _id })
  return handleResult(res)
}
// 更新分类
export async function updateCategory(http: any) {}

// 访客
export async function getVisitors(http: any, data: any) {
  const res = await http.$get('/admin/get-visitors', data)
  return handleResult(res)
}