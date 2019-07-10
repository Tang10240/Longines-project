require(['./config'], () => {
    require(['url', 'header', 'footer'], (url) => {
        class Register {
            constructor() {
                this.firstname = $('#firstname')
                this.gender = $('#gender1')
                this.telNumber = $('#mobile')
                this.pwd = $('#pwd1')
                this.isPwd = $('#isPwd')
                this.goSubmit()
            }
            // init() {
            //     // let username = this.firstname.val()
            //     // let gender = this.gender.val()
            //     // let number = this.telNumber.val()
            //     // let password = this.pwd.val()
            //     console.log(username, gender, number, password)
            //     return new Promise(resolve => {
            //         $.post(`${url.phpBaseUrl}/LonginesUser/api/user/register.php`, { username, gender, number, password }, resolve)
            //     })
            // }
            goSubmit() {
                let _this = this
                $('#submit').on('click', (event) => {
                    event.preventDefault()
                    let username = this.firstname.val()
                    let gender = this.gender.val()
                    let number = this.telNumber.val()
                    let password = this.pwd.val()
                    let ispwd = this.isPwd.val()
                    //console.log(username, gender, number, password,ispwd)
                    if(password === ispwd){
                        $.post(`${url.phpBaseUrl}/LonginesUser/api/user/register.php`, { username, gender, number, password }, (resp) => {
                            let resp1 = JSON.parse(resp)
                            if (resp1.code === 200) {
                                alert(resp1.body.message)
                                this.firstname.val('')
                                this.gender.val('')
                                this.telNumber.val('')
                                this.pwd.val('')
                                setTimeout(function () {
                                    window.location.href = "http://localhost:996/html/login.html"
                                }, 2000)
                            } else {
                                alert(resp1.body.message)
                            }
                        })
                    }else{
                        alert("输入的密码不匹配，请重新设置！")
                        _this.pwd.val('')
                        _this.isPwd.val('')
                    }
                



                    // _this.init().then(function (resp) {
                    //     //let username = _this.firstname.val()
                    //     let resp1 = JSON.parse(resp)
                    //     if (resp1.code === 200) {
                    //         alert(resp1.body.message)
                    //         console.log(username)
                    //         //_this.firstname.val() = _this.gender.val()=_this.telNumber.val() =_this.pwd.val() = ""
                    //     } else {
                    //         alert(resp1.body.message)
                    //     }
                    // })

                })
            }
        }
        return new Register()
    })
})