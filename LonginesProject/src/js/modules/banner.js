define(['jquery', 'superslide'], function () {
    class Banner {
        constructor() {
            this.slider = $('.slider')
            this.init().then(() => {
                this.ban()
            })
        }
        init() {
            // banner图
            return new Promise(resolve => {
                this.slider.load('/html/modules/banner.html', () => {
                    resolve()
                })
            })
        }
        ban() {
            $(document).ready(function () {

                /* 设置第一张图片 */
                $(".slider .bd li").first().before($(".slider .bd li").last());

                /* 鼠标悬停箭头按钮显示 */
                $(".slider").hover(function () {
                    $(this).find(".arrow").stop(true, true).fadeIn(300)
                }, function () {
                    $(this).find(".arrow").fadeOut(300)
                });

                /* 滚动切换 */
                $(".slider").slide({
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    effect: "leftLoop",
                    autoPlay: true,
                    vis: 3,
                    autoPage: true,
                    trigger: "click"
                })

            })

        }
    }
    return new Banner()
})