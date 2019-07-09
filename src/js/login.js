require(['./config'],() => {
    require(['url','header','footer'],(url) =>{
        class Login{
            constructor () {
                this.tel = $('#tel')
                this.pwd = $('#password')
                this.btn = $('#btn')
                this.init()
            }
            init () {
                let _this = this
                let number1 = this.tel.val()
                let password1  =this.pwd.val()
                this.btn.on('click',(event) =>{
                    event.preventDefault()
                    $.post(`${url.phpBaseUrl}/LonginesUser/api/user/login.php`,{number1,password1},resp =>{
                        //let 
                        console.log(resp)
                        // if(resp.code === 200){
                        //     alert(resp.body.message)
                        //     console.log(resp.body.arr)
                        //     //$('#account').html()
                        // }else{
                        //     alert(resp.body.message)
                        // }
                    })
                })
            }
        }
        return new Login()
    })
})