//引入gulp工具
const gulp = require("gulp"),
		//压缩html
	  htmlmin = require("gulp-htmlmin"),
	    //编译scss
	  sass = require("gulp-sass"),
	    //启动服务器
	  connect = require("gulp-connect"),
	    //转码 es6-es5
	  babel = require('gulp-babel'),
	    //压缩js
	  uglify = require('gulp-uglify'),
	    //压缩 css
	  cleanCss = require('gulp-clean-css')



//引入第一个任务
// gulp.task("html",() =>{
// 	console.log("123");
// })
gulp.task("html",() =>{
	gulp.src('src/**/*.html')
		.pipe(htmlmin({
			 removeComments: true,// 清除HTML注释
			collapseWhitespace: true,// 压缩HTML
			collapseBooleanAttributes: true,// 省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true,// 删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true,// 删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
			minifyJS: true,// 压缩页面JS
			minifyCSS: true// 压缩页面CSS
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload()) //自动刷新
})

//编译scss
gulp.task("css",() =>{
	gulp.src("src/css/**/*.scss")
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload())
})

//开启服务器
gulp.task("connect",() =>{
	connect.server({
		root:"dist",
		livereload:true,
		port:996  //端口号2-4位
	})
})
//移动libs 和 images  ,单纯的移动一些资源
gulp.task("move",() =>{
	gulp.src('src/libs/**/*')
		.pipe(gulp.dest("dist/libs"))
		.pipe(connect.reload())
	gulp.src('src/img/**/*')
		.pipe(gulp.dest("dist/img"))
		.pipe(connect.reload())
})

//将js代码从es6 转 es5,然后再压缩
gulp.task("js",() =>{
	gulp.src("src/js/**/*.js")
		// 转码
		.pipe(babel({
			presets: ['@babel/env']
		}))
		// 压缩
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		//热更新
		.pipe(connect.reload())
})

// 监听文件的修改,只要文件做了修改,那就自动执行对应的任务
gulp.task('watch',() =>{
	//第一个参数是监听改变的文件
	//第二个参数就是这些文件改变后要重信执行的gulp任务名称
	gulp.watch('src/**/*.html',['html'])
	gulp.watch('src/css/**/*.scss',['css'])
	gulp.watch('src/js/**/*.js',['js'])
	gulp.watch('src/libs/**/*',['move'])
	gulp.watch('src/images/**/*',['move'])
})

// 默认就会执行的任务
//把需要执行的任务列表放进来,只需要输入gulp  他就会自动去找这个default这个任务,所有的任务都会执行
gulp.task('default',['html','css','connect','move','js','watch'])