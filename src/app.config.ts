export default defineAppConfig({
  networkTimeout: {
    request: 60000 * 5,
  },
  pages: [
    // 首页
    'pages/index/index',
    'pages/hotContent/index',
    'pages/webView/about',
    'pages/webView/index',
    'pages/login/index',
    'pages/login/agreement/user',
    'pages/login/agreement/private',
    // 我的
    'pages/my/index',
    //热门内容 - 排行榜
  ],
  subpackages: [
    // 授权相关
    {
      root: 'pages/authorize',
      pages: [
        // 授权主页
        'index/index',
        // 授权确认页
        'confirm/index',
        //授权成功页面
        'success/index',
        // 授权扫码页面
        'qrcode/index',
        //抖音授权页面
        'detail/index',
      ],
    },
    // 活动相关
    {
      root: 'pages/activity',
      pages: [
        // 活动列表
        'list/index',
        // 活动banner
        'bannerActivity/index',
        // 活动详情
        'detail/index',
      ],
    },
    // AI合拍
    {
      root: 'pages/AI',
      pages: [
        //AI合拍列表
        'list/index',
        //AI合拍列表-创建拍摄
        'create/index',
        //AI合拍列表-详情
        'detail/index',
        // 快速注册
        // "register/index",
      ],
    },
    // 产品
    {
      root: 'pages/product',
      pages: [
        // 活动产品列表
        'activityList/index',
        // 产品列表
        'list/index',
        // 搜索产品
        'search/index',
        // 选择产品
        'selectProduct/index',
        // ai生成素材
        'selectGenerate/index',
        // 生成结果
        'generateResult/index',
        //生成图片素材-小红书、抖音、朋友圈页面
        'generateImageMaterial/index',
        'generateVideoMaterial/index',
        'GenerateImagePosters/index',
        //生成图片素材
        'generateImageMaterialDetail/index',
        //生成视频素材
        'generateVideoMaterialDetail/index',
      ],
    },
    // 我的创作
    {
      root: 'pages/myWorks',
      pages: [
        // 我的创作 - 搜索素材
        'search/index',
        // 我的创作 - 素材tabs
        'marketingTabs/index',
        // 我的创作 - 素材tabs - 最新
        'marketingTabsLatest/index',
      ],
    },
    // 课程
    {
      root: 'pages/course',
      pages: ['list/index', 'detail/index', 'video/index'],
    },
    // 门店推广
    {
      root: 'pages/store',
      pages: [
        // 门店列表
        'list/index',
      ],
    },

    // 公共页面
    {
      root: 'pages/common',
      pages: [
        // 视频播放
        'videoplay/index',
      ],
    },
  ],
  tabBar: {
    color: '#888888',
    selectedColor: '#171B27',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/images/tabbar/home.png',
        selectedIconPath: './assets/images/tabbar/home_select.png',
      },
      {
        pagePath: 'pages/hotContent/index',
        text: '热门内容',
        iconPath: './assets/images/tabbar/hot.png',
        selectedIconPath: './assets/images/tabbar/hot_select.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/images/tabbar/my.png',
        selectedIconPath: './assets/images/tabbar/my_select.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: "WeChat",
    navigationBarTextStyle: 'black',
  },
  resizable: true,
})
