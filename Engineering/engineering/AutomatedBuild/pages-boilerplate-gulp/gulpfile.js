// 实现这个项目的构建任务
/* 
    src:读取一个文件流
    dest:写入文件流
    parallel:并行执行任务
*/
const { src, dest, parallel, watch, series } = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const { data } = require('./data');
const plugins = loadPlugins();
/* 
    所需要的gulp插件：
    0. gulp-load-plugins 自动加载所有插件
    1. sass 编译scss文件
    2. babel 兼容ES最新特性
    3. swig 编译页面模板
    4. imagemin 图片字体压缩插件
    5. useref 路径处理插件
    6. gulp-htmlmin gulp-uglify gulp-clean-css 压缩插件
    其他插件：
    del 指定清除文件插件
    browser-sync 热更新，开发服务器插件
*/

/* 
style 任务:编译scss文件为css文件
yarn add gulp-sass --dev
*/
const style = () => {
    return src("src/assets/styles/*.scss", { base: "src" })
        .pipe(plugins.sass({ outputStyle: "expended" }))//编译scss文件
        .pipe(dest('.tmp'));
}

/* 
javascript任务：使用babel兼容ES最新特性
yarn add gulp-babel --dev
注意还需要安装 babel内部的插件 这个插件才会正真的转换
yarn add @babel/core @babel/preset-env --dev
*/
const script = () => {
    return src("src/assets/scripts/*.js", { base: "src" })
        .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
        .pipe(dest(".tmp"));
}

/* 
page任务：编译HTML swig模板
yarn add gulp-swig --dev        
*/
console.log(data);
const page = () => {
    return src("src/**/*.html", { base: "src" })
        .pipe(plugins.swig({ data: data }))
        .pipe(dest(".tmp"));
}



/* 
压缩图片以及字体任务：yarn add gulp-imagemin --dev
*/
const image = () => {
    return src("src/assets/images/**", { base: "src" })
        .pipe(plugins.imagemin())
        .pipe(dest("dist"));
}

const font = () => {
    return src("src/assets/fonts/**", { base: "src" })
        .pipe(plugins.imagemin())
        .pipe(dest("dist"));
}

/* 
extra 其他文件 移动到指定的目录中
*/
const extra = () => {
    return src("public/**", { base: "public" })
        .pipe(dest("dist"));
}

/* 

clean:清除任务：yarn add del --dev 清除生成的文件目录
*/
const del = require('del');
const clean = () => {
    return del([".tmp", "dist"]);
}

/* 
useref :文件路径问题以及压缩文件 yarn add gulp-useref --dev
*/
const useref = () => {
    return src(".tmp/**/*.html", { base: ".tmp" })
        .pipe(plugins.useref({ searchPath: [".tmp", '.'] }))
        .pipe(dest(".tmp"));//还是写的.tmp目录中 方便开发使用
}

/* 
压缩任务：压缩html css js
*/
const compress = () => {
    return src(".tmp/**").pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true, // 折叠掉所有的空白字符
        minifyCss: true, // 页面中style script脚本压缩
        minifyJS: true//
        // 移除掉注释等设置
    })))//压缩HTML
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))//压缩css
        .pipe(plugins.if(/\.js$/, plugins.uglify()))//压缩js
        .pipe(dest("dist"))
}

/* 
 开发服务器：热更新插件 yarn add browser-sync --dev
*/
// 引入热更新服务器
const browserSync = require('browser-sync');
const bs = browserSync.create();

const serve = () => {
    //监视原始文件的变化 而不是监视编译之后的文件变化
    watch("src/assets/styles/*.scss", style);
    watch("src/assets/scripts/*.js", script);
    watch("src/**/*.html", page);
    //图片 字体在开发阶段不用再执行任务 刷新浏览器即可
    watch("public/**", bs.reload);
    watch(["src/assets/images/**", "src/assets/fonts/**"], bs.reload);

    bs.init({
        notify: false, // 通知的弹窗不显示
        // port:2080,//设置端口号
        // open:true,//是否自动打开浏览器
        // files:'dist/**',//监听目录下的文件更新 自动更新到浏览器
        server: {
            baseDir: [".tmp", "dist", "src", "public"], // 当在dist目录找不到文件就会找src下面的文件，如果src也找不到就去找public目录下 在开发阶段提高构建效率 目的在开发阶段不需要把一些固定的图片字体 等编译到dist目录 提高构建效率
        },
        routes: {
            '/node_modules': 'node_modules'
        }
    });
}

// /* 
// 引入lint任务 检查js文件
// yarn add gulp-eslint --dev   
// */
// const eslint = require('gulp-eslint');
// const lint = () => {
//     return src(['**/*.js', '!node_modules/**'])
//         .pipe(eslint())
//         .pipe(eslint.result(result => {
//             // Called for each ESLint result.
//             console.log(`ESLint result: ${result.filePath}`);
//             console.log(`# Messages: ${result.messages.length}`);
//             console.log(`# Warnings: ${result.warningCount}`);
//             console.log(`# Errors: ${result.errorCount}`);
//         }));
// }

/* 
并发执行三个任务
*/
const complete = parallel(style, script, page);

/* 
开发阶段执行的任务，先执行清除文件，必须要编译的文件，在执行文件目录的问题否则显示不正常，再开启开发服务器
*/
const start = series(clean, complete, useref, serve);

/* 
上线阶段执行的任务
*/
const build = series( clean, parallel(series(complete, useref, compress), image, font, extra));

/* 
任务导出
*/
module.exports = {
    clean,
    start,
    serve,
    build,
}
