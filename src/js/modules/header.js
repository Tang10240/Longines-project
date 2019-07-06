// header模块的js
// header模块依赖jquery模块,jquery也是遵循AMD规范
define(['jquery'], () => {
    class Header {
      constructor () {
        // 每个页面都留一个空的header标签负责加载头部
        this.container = $('header')
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
        this.search.on('keyup',function(){
          let inpValue = $(this).val()
          console.log(inpValue)
          $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inpValue}&cb=?`,resp=>{
            console.log(resp)
          })
        })
      }
    }
    return new Header()
  })