const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => {
  return path.resolve(appDirectory, relativePath)
}
// 运行时会导致过不了taro配置类型检查
const src = resolveApp('src');

module.exports = {
  src
}
