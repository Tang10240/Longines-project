// 先引入config，让模块的短名称生效
require(['./config'], () => {
    // 就可以引入当前页面需要的别的模块了，只需要写短名称
  require(['template','url','header','footer'], (template,url) => {
    class Index {
      constructor () {
        this.container = $('#index-list')
        this.render().then(index =>{
          this.sellWell(index)
        })
      }
      render () {
        return new Promise (resolve =>{
          $.get(`${url.rapBaseUrl}/shop/list`,resp =>{
            console.log(resp)
            if(resp.code === 200){
              resolve(resp.body.list)
            }
          })
        })
      }
      sellWell (index) {
        let str = template('index-template' ,{index})
        this.container.html(str)
        console.log(str)
      }
    }
    return new Index()
    })
  })