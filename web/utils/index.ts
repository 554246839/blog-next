import { Message } from 'element-ui'

export function dateFormat(fmt: string, date: Date) {
  let ret: RegExpExecArray | null
  const opt: any = {
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
}

export function handleResult(res: any) {
  const { code, errmsg } = res
  if (code === 200) {
    return res.data
  } else {
    errmsg && Message.error(errmsg)
    return false
  }
}