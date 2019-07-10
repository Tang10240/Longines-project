require(['./config'], () => {
    require(['url', 'header', 'footer','cookie'], (url) => {
        class Login {
            constructor() {
                this.tel = $('#tel')
                this.pwd = $('#password')
                this.btn = $('#btn')
                this.init()
            }
            init() {
                let _this = this
                //console.dir($)
                this.btn.on('click', (event) => {
                    let number1 = this.tel.val()
                    let password1 = this.pwd.val()
                    event.preventDefault()
                    //去请求php文件
                    $.post(`${url.phpBaseUrl}/LonginesUser/api/user/login.php`, { number1, password1 }, resp => {
                        let resp1 = JSON.parse(resp)
                        if(resp1.code === 200){
                            alert(resp1.body.message)
                            let info =JSON.stringify(resp1.body[0])
                            //存cookie 
                            $.cookie('userInfomation',info,{path:'/',expires:20})
                            //清空input框
                            this.tel.val('')
                            this.pwd.val('')
                            //两秒后跳转到首页
                            setTimeout(function () {
                                window.location.href = "http://localhost:996/"
                            }, 2000)
                        }else{
                            alert(resp1.body.message)
                        }
                    })
                })
            }
        }
        return new Login()
    })
})