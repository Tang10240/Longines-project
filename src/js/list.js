
require(['./config'], () => {
    //接收template模块,有返回值
  require(['template','url','header','footer'], (template,url) => {
    //list 页面功能逻辑
    class List{
      constructor(){
        this.container = $('#shop-l')
        this.getData().then((list) =>{
          //首先then里面接收了resolve传递过来的list数据，紧接着继续传递给renderList
          this.renderList(list)
        })
      }
      getData () {
        return new Promise(resolve =>{
          $.get(url.rapBaseUrl + '/shop/list',resp =>{
            console.log(resp)
            if(resp.code === 200){
              //传递实参，把从接口取到的数据传给 then
              resolve(resp.body.list)
            }
          })
        })
      }
      renderList(list){
        //第二个参数{list:list} 里面的key:指的是template里面需要的变量名，value指的是从接口获取到的数据
        let str = template('list-template',{list})
        this.container.html(str)
      }
    }
    new List()
    })
  })