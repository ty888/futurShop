import md5 from 'blueimp-md5'
import { dataokeApiKey, dataoVersion, dataokeAppSecret } from '@/utils/constants';

/**
 * @method 格式化数量为万
 * @param {Number} num 值
 * @param {Boolean} flag 小于1万时是否直接返回具体数值
 * @param {String} unit 万
 */
export const figureChange = (num, flag = false, unit = '万') => {
  const param = String(num)
  const str = param
  if (param.length > 4) {
    const str1 = str.substring(0, str.length - 4)
    const str2 = str.substr(str1.length, 1)
    let str3 = ''
    if (parseInt(str2) == 0) {
      str3 = str1
    } else {
      str3 = str1 + '.' + str2
    }

    return `${str3}${unit}`
  } else {
    if (flag) return str
    const str1 = str.substring(0, 1)
    const str2 = '0.' + str1
    return `${str2}${unit}`
  }
}


/**
 * @method 格式化时间戳
 * @param {Date | Number | String} time 时间戳
 * @param {String} cFormat {y}-{m}-{d} {h}:{i}:{s}
 * @returns {String} 2020-03-12 15:55:39
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return '--'
  }
  if (time === null) {
    return '--'
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a')
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  if (time_str === '0-0-0 0:0:0') {
    return '--'
  }
  return time_str
}


// 大淘客请求参数
const baseParams = {
  version: dataoVersion,
  appKey: dataokeApiKey,
  app: dataokeAppSecret,
  timer: Date.now(),
  nonce: parseInt((Math.random(10)*1000000))
}

export function returnParams(data) {
  const signRanText = `appKey=${baseParams.appKey}&timer=${baseParams.timer}&nonce=${baseParams.nonce}&key=${baseParams.app}`
  const signRan = md5(signRanText).toUpperCase()
  return {
    ...data,
    ...baseParams,
    signRan
  }
}

