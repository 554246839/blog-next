export default function (context: any, inject: (arg0: string, arg1: any) => void) {

  // Create a custom axios instance
  const api = context.$axios.create({
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      }
    }
  })

  api.onError((error: any) => {
    console.log(error, 'error')
    context.error({
      statusCode: error.response.status,
      message: error.message,
    });
    return Promise.resolve(false);
  })

  api.onRequest((config: any) => {
    // console.log(config.url, ' Making request to ------------')
    return config
  })

  api.onResponse((config: any) => {
    const { code } = config.data
    if (code === 99) {
      context.redirect('/Login')
    }
    // console.log(config.url, ' Making response to ')
    return config
  })

  inject('http', api)
}