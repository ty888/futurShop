const genApi = require('./api')

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      host: 'localhost', // 如需局域网（如手机）访问，请更换为0.0.0.0
      // host: '0.0.0.0', // 如需局域网（如手机）访问，请更换为0.0.0.0
      open: false,
      port: 10086,
      https: false,
      proxy: {
        '/api/hdk': {
          target: genApi('hdk'), // 接口的域名 // secure: false,// 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置 // pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址 //   '^api': ''
          pathRewrite: {
            '^/api/hdk': '',
          },
        },
        '/api/dtk': {
          target: genApi('dtk'),
          changeOrigin: true,
          pathRewrite: {
            '^/api/dtk': '',
          },
        },
      },
    }
  }
}