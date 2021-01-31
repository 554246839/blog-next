import { handleResult } from '../utils'

export async function getArticleDetail(http: any, id: string) {
  const res = await http.$get(`/admin/get-article-detail/${id}`)
  return handleResult(res)
}

export async function login(http: any, data: any) {
  const res = await http.$post(`/login`, data)
  return handleResult(res)
}

export async function loginAuth(http: any) {
  const res = await http.$post(`/login/auth`)
  return handleResult(res)
}
