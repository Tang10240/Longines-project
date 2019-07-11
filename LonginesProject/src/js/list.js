
require(['./config'], () => {
  //接收template模块,有返回值
  require(['template', 'url', 'header', 'paging','footer'], (template, url) => {
    //list 页面功能逻辑
    class List {
      constructor() {
        this.container = $('#shop-l')
        this.getData().then((list) => {
          //首先then里面接收了resolve传递过来的list数据，紧接着继续传递给renderList
          this.renderList(list)
          //this.goSort(list)
          this.goPaging(list)
        })
      }
      getData() {
        return new Promise(resolve => {
          $.get(url.rapBaseUrl + '/shop/list', resp => {
            //console.log(resp)
            if (resp.code === 200) {
              //传递实参，把从接口取到的数据传给 then
              resolve(resp.body.list)
            }
          })
        })
      }
      renderList(list) {
        //第二个参数{list:list} 里面的key:指的是template里面需要的变量名，value指的是从接口获取到的数据
        let str = template('list-template', { list })
        this.container.html(str)
      }
      goSort(list) {
        $('#sort').hover(() => {
          $('#sort-u').show()
          //升序
          $('.li2').on('click', () =>{
            list = list.sort(function (a, b) {
              return a.price - b.price
            })
            let str = template('list-template', { list })
            this.container.html(str)
            $('.moren').html($('.li2').html())
          })
          //降序
          $('.li3').on('click', () =>{
            list = list.sort(function (a, b) {
              return b.price - a.price
            })
            let str = template('list-template', { list })
            this.container.html(str)
            $('.moren').html($('.li3').html())
          })
        }, () => {
          $('#sort-u').hide()
        })
      }
      //分页
      goPaging () {
        let _this = this
        var setTotalCount = 120;
        $('#box').paging({
            initPageNo: 3, // 初始页码
            totalPages: 10, //总页数
            totalCount: '合计' + setTotalCount + '条数据', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒
            jump: true, //是否支持跳转
            callback: function(page) { // 回调函数
                console.log(page);
                $.get(url.rapBaseUrl + '/shop/list',(resp)=>{
                  //console.log(resp.body.list)
                  let list = resp.body.list
                  list = list.map(item =>{
                   if(page==1){
                     return item
                   }else{
                    item.id += list.length * (page-1)
                    return item
                   }
                })
                console.log(list)
                let str = template('list-template', { list })
                _this.container.html(str)
                _this.goSort(list)
                })
            }
        })
      }
    }
    new List()
  })
})