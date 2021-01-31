import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context) => {
  // 管理端权限校验
  // Use context
  console.log('router middleware auth')
  // context.redirect('/Login')
}

export default myMiddleware