export default {
  pages: [
    'pages/index/index', // 首页
    'pages/search/index', // 搜索
    'pages/rank/index', // 榜单
    'pages/goodsDetail/index', // 商品详情
    'pages/tlj/index', // 淘礼金
    'pages/jiu/index', // 9块9
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '未来商城',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tab/home.png',
        selectedIconPath: './assets/tab/home_f.png',
      },
      {
        pagePath: 'pages/jiu/index',
        text: '9.9包邮',
        iconPath: './assets/tab/jiu.png',
        selectedIconPath: './assets/tab/jiu_f.png',
      },
      {
        pagePath: 'pages/rank/index',
        text: '榜单',
        iconPath: './assets/tab/rank.png',
        selectedIconPath: './assets/tab/rank_f.png',
      },
      // {
      //   pagePath: 'pages/tlj/index',
      //   text: '淘礼金',
      //   iconPath: './assets/tab/tlj.png',
      //   selectedIconPath: './assets/tab/tlj_f.png',
      // },
     
    ],
    color: '#a6a6a6',
    selectedColor: '#b6010c',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
  },

}
