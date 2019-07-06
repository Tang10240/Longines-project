require(['./config'], () => {
    require(['template', 'header', 'footer'], (template) => {
        class Cart {
            constructor() {
                this.shopTbody = $('#cart-tbody')
                this.totalPrice = $('.totalPrice')
                this.allCheck = $('.allCheck')
                this.init()
                this.calculatePrice()
                this.checksChange()
                this.isAllChange()
                this.addNumber()
                this.subNumber()
                this.goDelete()
            }
            init() {
                //获取数据渲染页面
                this.cart = JSON.parse(localStorage.getItem('cart'))
                //console.log(this.cart)
                if (this.cart) {
                    $("#empty-cart").hide()
                    let str = template('cart-template', { cart: this.cart })
                    this.shopTbody.html(str)
                    //一进页面就判断是否要全选
                    this.isALL()
                } else {
                    //当this.cart不存在时，创建一个tr，在页面显示 结果
                    $('<tr>').attr('class', 'empty-cart').html("<td colspan='6'><a href='list.html'>购物车为空，去逛逛添加吧！</a></td>").appendTo($('#cart-tbody'))

                }
            }
            //计算所有选中商品的价格合计
            calculatePrice() {
                this.money = 0
                //console.log(this.cart)
                if (this.cart) {
                    this.money = this.cart.reduce((money, shop) => {
                        if (shop.check) {
                            money += shop.price * shop.num
                        }
                        return money
                    }, 0)
                    this.totalPrice.html((this.money).toFixed(2))
                }
            }
            //单选按钮改变事件
            checksChange() {
                let _this = this
                //不用点击事件的原因：在form表单里面tab可以获取到焦点，回车会改变其值
                this.shopTbody.on('change', '.check', function () {
                    //通过Id找到数据改变check的值
                    //如何获取当前数据的id？把当前数据的id给到tr的自定义属性
                    //parents祖先的tr
                    const id = $(this).parents('tr').attr('data-id')
                    //console.log(id)
                    //shop要有返回值
                    if (_this.cart) {
                        _this.cart = _this.cart.map(shop => {
                            if (shop.id === id) shop.check = $(this).prop('checked')
                            return shop
                        })
                        localStorage.setItem('cart', JSON.stringify(_this.cart))
                        _this.calculatePrice()
                        _this.isALL()
                    }


                })
            }

            //商品的check都为true的时候，全选该被选中
            isALL() {
                //全选状态
                let isAllCheck = this.cart.every((shop) => {
                    return shop.check === true
                })
                this.allCheck.prop('checked', isAllCheck)
            }

            //全选按钮的事件
            isAllChange() {
                let _this = this
                this.allCheck.on('change', function () {
                    //获取全选状态
                    let isCheck = $(this).prop('checked')
                    if (_this.cart) {
                        _this.cart = _this.cart.map(shop => {
                            //数据和所有单选都要按照这个值来修改
                            shop.check = isCheck
                            return shop
                        })
                        //console.log(_this.cart)
                        $('.check').prop('checked', isCheck)
                        //_this.calculatePrice()
                        localStorage.setItem('cart', JSON.stringify(_this.cart))
                        _this.calculatePrice()
                    }

                })
            }

            //点击购物车里面的+要实现的效果
            addNumber() {
                let _this = this
                //事件委托，添加点击事件
                this.shopTbody.on('click', '.add', function () {
                    //找到当前数据,通过id
                    //祖先tr上面有自定的属性，里面存的是当前这条数据的id
                    //attr这里参数只有一个时表示获取。两个时表示设置
                    const id = $(this).parents('tr').attr('data-id')
                    if (_this.cart) {
                        _this.cart = _this.cart.map(shop => {
                            if (shop.id === id) {
                                shop.num++
                            }
                            return shop
                        })
                        //操作之后数据再存一次
                        localStorage.setItem('cart', JSON.stringify(_this.cart))
                        _this.calculatePrice()
                        _this.init()
                        _this.shopCartIn()
                    }

                })
            }

            subNumber() {
                let _this = this
                //事件委托，添加点击事件
                this.shopTbody.on('click', '.subNum', function () {
                    //找到当前数据,通过id
                    //祖先tr上面有自定的属性，里面存的是当前这条数据的id
                    //attr这里参数只有一个时表示获取。两个时表示设置
                    const id = $(this).parents('tr').attr('data-id')
                    if (_this.cart) {
                        _this.cart = _this.cart.map(shop => {
                            if (shop.id === id) {
                                shop.num--
                                if (shop.num < 1) shop.num = 1
                            }
                            return shop
                        })
                        //操作之后数据再存一次
                        localStorage.setItem('cart', JSON.stringify(_this.cart))
                        _this.calculatePrice()
                        _this.shopCartIn()
                        _this.init()
                    }

                })
            }

            //删除的方法
            goDelete() {
                let _this = this
                this.shopTbody.on('click', '.delete', function () {
                    const id = $(this).parents('tr').attr('data-id')
                    if (_this.cart.length > 1) {
                        _this.cart = _this.cart.filter(shop => {
                            return shop.id != id
                        })
                        localStorage.setItem('cart', JSON.stringify(_this.cart))
                        _this.calculatePrice()
                        _this.init()
                        _this.shopCartIn()
                    } else {
                        localStorage.removeItem('cart')
                        $(this).parents('tr').remove()
                        console.log(_this.cart)
                        _this.calculatePrice()
                        _this.init()
                        //$("#empty-cart").show()
                        // $(this).parents('tr').remove()
                    }
                })
            }
            //头部购物车的显示
            shopCartIn() {
                //从localstorage里面取到数据
                let cart = JSON.parse(localStorage.getItem('cart'))
                //console.log(cart)
                if (cart) {
                    let isNum = cart.reduce((num, shop) => {
                        return num += shop.num
                    }, 0)
                    //shopCarNmber只能在这获取  在上面获取不到
                    $('#shopCarNmber').html(isNum)
                } else {
                    $('#shopCarNmber').html(0)
                }
            }
        }
        new Cart()
    })
})