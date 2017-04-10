var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    src: 'src/',     //源代码
    dev: 'build/',   //整合后的开发环境
    prd: 'dist/'     //可部署的生产环境
}
//拷贝bower下载的代码
gulp.task('lib', function () {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.dev + 'vendor'))
        .pipe(gulp.dest(app.prd + 'vendor'))
        .pipe($.connect.reload());  //执行浏览器刷新
});
//拷贝html文件
gulp.task('html', function () {
    gulp.src(app.src + '**/*.html')
        .pipe(gulp.dest(app.dev))
        .pipe(gulp.dest(app.prd))
        .pipe($.connect.reload());
});
//拷贝Json文件
gulp.task('json', function () {
    gulp.src(app.src + 'data/**/*.json')
        .pipe(gulp.dest(app.dev + 'data'))
        .pipe(gulp.dest(app.prd + 'data'))
        .pipe($.connect.reload());
});
//编译less并压缩合并
gulp.task('less', function () {
    gulp.src(app.src + 'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.dev + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prd + 'css'))
        .pipe($.connect.reload());
});
//合并JS并压缩
gulp.task('js', function () {
    gulp.src(app.src + 'script/**/*.js')
        .pipe($.concat('index.js')) //合并代码
        .pipe(gulp.dest(app.dev + 'js'))
        .pipe($.uglify())           //压缩代码
        .pipe(gulp.dest(app.prd + 'js'))
        .pipe($.connect.reload());
});
//压缩图片
gulp.task('image', function () {
    gulp.src(app.src + 'image/**/*')
        .pipe(gulp.dest(app.dev + 'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prd + 'image'))
        .pipe($.connect.reload());
});
//清除旧文件
gulp.task('clean', function () {
    gulp.src([app.dev,app.prd])
        .pipe($.clean())
});
//合并所有生成任务
gulp.task('build',['image','js','less','lib','html','json']);
//监控代码变动，并执行对应任务，并生成服务器，并启动浏览器
gulp.task('serve',function(){
    $.connect.server({
        root:[app.dev],
        livereload:true,
        port:8087
    });
    open('http://localhost:8087');
    
    gulp.watch('bower_components/**/*.js',['lib']);
    gulp.watch(app.src +'**/*.html',['html']);
    gulp.watch(app.src +'data/**/*.json',['json']);
    gulp.watch(app.src +'style/**/*.less',['less']);
    gulp.watch(app.src +'script/**/*.js',['js']);
    gulp.watch(app.src +'image/**/*.js',['image']);
})
//设置默认任务名为serve
gulp.task('default',['serve']);