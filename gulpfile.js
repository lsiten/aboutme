var gulp = require('gulp'),
    less = require('gulp-less'),
    //确保本地已安装gulp-minify-css [cnpm install gulp-minify-css --save-dev]
    cssmin = require('gulp-minify-css'),
    //确保本地已安装gulp-autoprefixer [cnpm install gulp-autoprefixer --save-dev]
    autoprefixer = require('gulp-autoprefixer'),
    //确保本地已安装gulp-uglify [cnpm install gulp-uglify --save-dev]
    uglify = require('gulp-uglify');
    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
        plumber = require('gulp-plumber'),
    //文件发生变化自动刷新
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver');

//less解析
// gulp.task('LessToCss', function() {
//     return gulp.src('src/less/**/*.less')
//         .pipe(plumber({
//             errorHandler: notify.onError('Error: <%= error.message %>')
//         }))
//         .pipe(less())
//         .pipe(gulp.dest('src/cssTemp'));
// });
//自动补全浏览器前缀
gulp.task('AutoFx', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('src/cssTemp'));
});

//压缩css
gulp.task("cssMinTask", ["AutoFx"], function() {
    gulp.src('src/cssTemp/**/*.css')
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.src('src').pipe(livereload()));
});

//压缩js
gulp.task('jsminTask', function() {
    gulp.src(['src/js/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {
                except: ['require', 'exports', 'module', '$']
            } //排除混淆关键字
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.src('src').pipe(livereload()));
});
//开启服务器
gulp.task('webserver', function() {
  gulp.src('src')//设置服务器根目录
    .pipe(webserver({
      livereload: true,
      port:8100,
      open: true
    }));
});
//监控html
gulp.task("watchHtml",function(){
  gulp.watch(["src/*.html","src/tpls/**/*.html"]).on("change",function(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.src('src')
        .pipe(livereload());
  });
});
//监控less
gulp.task("watchless",function(){
  gulp.watch("src/less/**/*.less",[]).on("change",function(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.start("cssMinTask");
  });
});
//监控js
gulp.task("watchjs",function(){
  gulp.watch('src/js/**/*.js',["jsminTask"]).on("change",function(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
gulp.task('default',["cssMinTask","jsminTask","webserver","watchHtml","watchless","watchjs"],function() {
    livereload.listen({basepath: 'src'});
});
