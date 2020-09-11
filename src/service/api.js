import Taro from '@tarojs/taro'
import genApi from '../../config/api'


// const IS_LOCAL = process.env.NODE_ENV === 'development'
const IS_H5 = process.env.TARO_ENV === 'h5'

const genBaseUrl = url => {
  const prefix = url.split('/')[0]

  if (IS_H5) return '/api/' + url


  let currentUrl = url.split('/');
  currentUrl.shift()
  currentUrl = currentUrl.join('/')

  console.log(currentUrl)

  return genApi(prefix) + currentUrl
}



export default {
  baseOptions(params, method = 'GET', options = {}) {
    let { url, data = {} } = params
    let contentType = 'application/json'
    contentType = options.contentType || contentType
    delete options.contentType
    const option = {
      url: genBaseUrl(url),
      data,
      method: method,
      header: {
        'content-type': contentType,
      },
      ...options,
    }
    return Taro.request(option)
  },
  get(url, data = '', options) {
    let params = { url, data }
    return this.baseOptions(params, 'GET', options)
  },
  post(url, data, options) {
    let params = { url, data }
    return this.baseOptions(params, 'POST', options)
  },
}
