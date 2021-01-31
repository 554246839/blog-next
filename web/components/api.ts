import { handleResult } from '../utils'

export async function logout(http: any) {
  const res = await http.$post(`/logout`)
  return handleResult(res)
}