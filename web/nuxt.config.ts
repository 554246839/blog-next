import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '皮侠客 - 一个关于前端的小博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '一个关于前端的小博客' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'mavon-editor/dist/css/index.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/markdown.min.css',
    '@/assets/gruvbox-dark.min.css',
    '@/assets/common.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/mavon-editor', ssr: false },
    '@/plugins/element-ui',
    '@/plugins/composition-api',
    '@/plugins/axios'
  ],

  // router: {
  //   middleware: 'demo'
  // },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios'
    // '@nuxtjs/proxy'
  ],

  server: {
    host: '127.0.0.1',
    port: 8090
  },

  axios: {
    // baseURL: '/api' // http://127.0.0.1:8888
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  
  proxy: {
    '/api': { 
      target: 'http://127.0.0.1:8888', // 目标接口域名
      pathRewrite: {
        // '^/api': '/', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }    
    }
  },  

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/]
  }
}

export default config
