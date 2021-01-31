/**
 * ctx 扩展
 */
const os = require('os')

module.exports = {
  // 当前域名
  get domain() {
    const env = process.env.NODE_ENV
    if (env === 'development') {
      return 'http://127.0.0.1:8888'
    }
  },
  cookieToken: 'AUTH_TOKEN',
  // 获取IP地址
  getIpAddress() {
    /**os.networkInterfaces() 返回一个对象，该对象包含已分配了网络地址的网络接口 */
    const interfaces = os.networkInterfaces()
    for (let devName in interfaces) {
      const iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
  },
  // 时间格式化
  dateFormat(fmt, date = new Date()) {
    let ret
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "M+": (date.getMonth() + 1).toString(),     // 月
      "D+": date.getDate().toString(),            // 日
      "h+": date.getHours().toString(),           // 时
      "m+": date.getMinutes().toString(),         // 分
      "s+": date.getSeconds().toString()          // 秒
    }
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt)
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? opt[k] : opt[k].padStart(ret[1].length, "0"))
      }
    }
    return fmt
  },
  // 获取当天剩余时间毫秒数
  getRemainTime() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()

    const time = new Date(`${year}-${month}-${day} 23:59:59`)

    return Math.floor((time - now) / 1000 + 1)
  },
  // 结果处理
  handleResult(data) {
    if (!data) {
      this.body = {
        code: -1,
        errmsg: '未知错误'
      }
    } else {
      this.body = {
        code: 200,
        data
      }
    }
  },
  // uuid
  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

}