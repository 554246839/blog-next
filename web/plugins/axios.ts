export default function ({ $axios, error: nuxtError }: any, inject: (arg0: string, arg1: any) => void) {

  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      }
    }
  })
  
  api.onError((error: any) => {
    console.log(error, 'error')
    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    });
    return Promise.resolve(false);
  })

  api.setToken('123', 'Bearer')

  api.onRequest((config: any) => {
    console.log(config.url, ' Making request to ')
    return config
  })

  api.onResponse((config: any) => {
    console.log(config.url, ' Making response to ')
    return config
  })

  inject('http', api)
}