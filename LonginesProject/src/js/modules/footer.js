define(['jquery'], () => {
    class Header {
      constructor () {
        // 每个页面都留一个空的header标签负责加载头部
        this.container = $('footer')
        this.init()
      }
  
      init () {
        // load尾部
        this.container.load('/html/modules/footer.html')
      }
    }
    
    return new Header()
  })