import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context) => {
  // Use context
  console.log('router middleware')
}

export default myMiddleware
