require(['./config'], () => {
    // 就可以引入当前页面需要的别的模块了，只需要写短名称
  require(['template','url','header','footer','zoom','fly'], (template,url) => {
    class Detail{
      constructor () {
        this.container = $('#shop-imgs')
        this.shop_info = $('.shop-description')
        this.getData().then(detail =>{
          this.renderDetail(detail)
          this.shopInfo(detail)
          this.addToCar()
          console.log(detail)

        })
      }
      getData(){
        //取到id，请求接口
        const id = window.location.search.slice(4)
        console.log(id)
        return new Promise(resolve =>{
          $.get(`${url.rapBaseUrl}/shop/detail`,{ id },resp =>{
            //由于rap2不能处理请求的时候携带的id，所以返回的数据里面没有id
            //所以要手动的给detail加上id字段
            console.log(resp)
            //console.log(resp)
            if(resp.code === 200) {
              let { detail } = resp.body
              //const { detail } = resp.body
              //detail.id = id
              //console.log(detail)

              //这里的作用是把detail给这个类，方便后面用
              //this.detail = detail
              // console.log(detail)
              detail = {
                ...detail,
                id
              }
              this.detail = detail
              resolve(detail)

            }
          })
        })
      }
      renderDetail (detail){
        //根据info渲染页面
        //console.log(detail)
        let str = template('template-img',{ data: detail })
        this.container.html(str)
        this.zoomImg()
      }
      //商品详情渲染
      shopInfo(detail){
        let str1 = template('template-desc',{data:detail})
        this.shop_info.html(str1)
      }
      //放大镜
      zoomImg(){
        // $('.medium-pic')这里的操作对象是中图
        $('.medium-pic').elevateZoom({
          gallery: 'gal1', // ul父级盒子的id
          cursor: 'pointer',
          borderSize: '1',
          galleryActiceClass: 'active',
          borderColor: '#f2f2f2'
        })
      }
      //加入购物车时飞的效果
      addToCar () {
        let _this = this
        //事件委托
        $('.shop-description').on('click','.addCart',function () {
          const str = _this.detail.images[0]
          let scorllHeight = $(document).scrollTop()
          $(`<img src = "${str}" style="width:40px;height:40px;border-radius:50%;z-index:9999;">`).fly({
            start: {
              left: $(this).offset().left,
              top: $(this).offset().top - scorllHeight
            },
            end: {
              left: $('#shopping-bag').offset().left,
              top: $('#shopping-bag').offset().top - scorllHeight,
              width: 0, //结束时高度
              height: 0
            },
            speed: 0.8,
            onEnd: function () {
              this.destroy()
              // 动画完成，购物车数量 +1
              let num = parseInt($('#shopCarNmber').html())
              $('#shopCarNmber').html(++num)
            }
          })

          //把当前数据存入到localStorage
          //首先要判断数据是否存在，不存在直接把数据存进去，存在时去看里面的数据是否有跟当前
          //数据相同的，有改变数量
          //取到数据
          let allCart = localStorage.getItem('cart')
          if(allCart){
            //把取到的数据满足json格式的字符串，转化成对象
            allCart = JSON.parse(allCart)
            //判断购物车里面是否有当前的商品数据 利用some()方法遍历，找到即返回ture
            const isAllCart = allCart.some(shop =>{
              return shop.id === _this.detail.id
            })
            if(isAllCart){
              //购物车里面有当前商品 改变里面的num并重新存入localStorage
              // map方法每一次循环都要有一个返回值，这些返回值会构成一个新的数组，就是整个map的结果
              allCart = allCart.map(shop =>{
                if(shop.id === _this.detail.id) shop.num++
                return shop
              })
            }else{
              //购物车里面没有当前的商品数据，把数据加进去就行
              allCart.push({
                ..._this.detail,
                num : 1,
                check : false
              })
            }
            localStorage.setItem('cart',JSON.stringify(allCart))
          }else{
            //购物车为空，
            //把当前的数据构造成一个数组，默认加上字段num（一般为1）
            //默认让商品在购物车页面处于不选中
            let arr = [
              {
                ..._this.detail,
                num : 1,
                check : false
              }
            ]
            //把数组转换成json字符串
            let st = localStorage.setItem('cart',JSON.stringify(arr))
            //console.log(st)
          }
        })
      }

    }
    new Detail()
    })
  })