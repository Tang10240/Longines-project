// header模块的js
// header模块依赖jquery模块,jquery也是遵循AMD规范
define(['jquery'], () => {
    class Header {
      constructor () {
        // 每个页面都留一个空的header标签负责加载头部
        this.container = $('header')
        this.init().then(resp =>{
          //获取dom要在load加载成功后去获取
          this.shopCarNmber = $('#shopCarNmber')
          this.search = $('#search')
          this.ol = $('.search-in')
          this.navList = $('.nav-list')
          this.firstList = $('#nav-list .nav-list-wrap')
          this.shopCartIn()
          this.Search ()
          this.tab()
        })
      }
  
      init () {
        // load头部
        return new Promise(resolve =>{
          this.container.load('/html/modules/header.html',resolve)
        })
      }

      //头部购物车的显示
      shopCartIn () {
        //从localstorage里面取到数据
        let cart =JSON.parse(localStorage.getItem('cart'))
        //console.log(cart)
        if(cart){
          let isNum = cart.reduce((num,shop) =>{
            return num +=shop.num
          },0)
          //console.log(isNum)
          this.shopCarNmber.html(isNum)
        }else{
          this.shopCarNmber.html(0)
        }
      }
      //搜索框
      Search (){
        let _this = this
        this.ol.hide()
        this.search.on('keyup',function(){
          _this.ol.html('')
          _this.ol.show()
          let inpValue = $(this).val()
          //jsonp请求
          $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inpValue}&cb=?`,resp=>{
          //console.log(resp)
          //从请求出来的数据中，得到里面的s数组
            let searchResult = resp.s;
            //console.log(searchResult)
          searchResult.forEach(item =>{
            let li = $('<li>')
            li.html(item)
            _this.ol.append(li)
            //给li添加事件，点击它时让li的html给到input
            li.on('mousedown', () => {
              _this.search.val(li.html());
              _this.ol.hide()
            })
          })
          })
        })
      }
      // 导航选项卡
      tab () {
        let _this = this
        _this.navList.hide()
        $('#nav-left .watchSelection').mouseenter(function (){
          _this.navList.show()
          $(this).addClass('ac')
          $('#nav-left .longqinWorld').removeClass('ac')
          $('.nav-right .n-brand').css({"backgroundColor":""})
          _this.firstList.show()
          $('#nav-list .longines-world').hide()
          $('#nav-list .brand').hide()
        }) 
        this.firstList.mouseleave(function (){
          _this.navList.hide()
          $('#nav-left .watchSelection').removeClass('ac')
          $(this).hide()
        })

        $('#nav-left .longqinWorld').mouseenter(function (){
          _this.navList.show()
          $(this).addClass('ac')
          $('#nav-left .watchSelection').removeClass('ac')
          $('.nav-right .n-brand').css({"backgroundColor":""})
          $('#nav-list .longines-world').show()
          _this.firstList.hide()
          $('#nav-list .brand').show()
        }) 
        $('#nav-list .longines-world').mouseleave(function (){
          _this.navList.hide()
          $('#nav-left .longqinWorld').removeClass('ac')
          $(this).hide()
        })
        console.log($('.nav-right .n-brand'))
        $('.nav-right .n-brand').mouseenter(function () {
          _this.navList.show()
          $(this).css({"backgroundColor":"#ccc"})
          $('#nav-left .longqinWorld').removeClass('ac')
          $('#nav-list .brand').show()
          _this.firstList.hide()
          $('#nav-list .longines-world').hide()
        })
        $('#nav-list .brand').mouseleave(function (){
          _this.navList.hide()
          $('.nav-right .n-brand').css({"backgroundColor":""})
          $(this).hide()
        })
      }
    }
    
    return new Header()
  })