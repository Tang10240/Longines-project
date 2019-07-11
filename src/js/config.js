require.config({
    baseUrl: '/',
    paths: {
      jquery: 'libs/jquery/jquery-1.11.3.min',
      header: 'js/modules/header',
      footer: 'js/modules/footer',
      template: 'libs/art-template/template-web',
      url: 'js/modules/url',
      zoom:  'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
      fly:  'libs/jquery-plugins/jquery.fly.min',
      superslide: 'libs/jquery/superslide.2.1',
      banner: 'js/modules/banner',
      cookie: 'libs/jquery-plugins/jquery.cookie',
      paging: 'libs/jquery-plugins/paging.min'
    },
    //垫片
    //不满足AMD规范，但又依赖别的模块
    shim: {
      zoom :{
        deps:['jquery']
      },
      fly: {
        deps: ['jquery']
      },
      superslide: {
        deps: ['jquery']
      },
      cookie:{
        deps: ['jquery']
      },
      paging:{
        deps: ['jquery']
      }
    }
  })
  