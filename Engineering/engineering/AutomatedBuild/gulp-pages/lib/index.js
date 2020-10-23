/* 入口文件 */
/* gulp 配置文件 */
const { src, dest, parallel, series } = require('gulp')

const loadPlugins = require('gulp-load-plugins')
// 自动加载插件
const plugins = loadPlugins()
// yarn add gulp-sass --dev
const sass = plugins.sass
const babel = plugins.babel
// const swig = plugins.swig
const imagemin = plugins.imagemin
// 注意del不属于gulp 不能被load-plugins管理
const del = require('del')

// 数据文件 一般是在页面中写死的东西
const cwd = process.cwd()// 当前项目的工作目录
let config = {
  // default config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}

try {
  const loadConfig = require(`${cwd}/pages.config.js`)
  config = Object.assign({}, config, loadConfig)
} catch (e) {

}

// 每一个插件都是提供了一个函数 每个函数的结果返回转换流
const style = () => {
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })// 保留基本的路径否则 在dist目录里面只有样式文件没有之前的目录
    .pipe(sass({ outputStyle: 'expanded' }))// 编译scss文件 expanded 完全展开css文件
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

// yarn add gulp-babel --dev
// 注意还需要安装 babel内部的插件 这个插件才会正真的转换
// yarn add @babel/core @babel/preset-env --dev

const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(babel({ presets: [require('@babel/preset-env')] }))// babel preset-env通过require的方式载入
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

// 3. 模板文件
// yarn add gulp-swig --dev

const page = () => {
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })// src/**/*.html表示：src下面任意子目录下面的.html文件
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

// 图片读取和压缩 安装插件：yarn add gulp-imagemin --dev

const image = () => {
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    .pipe(imagemin())
    .pipe(dest(config.build.dist))
}
// 字体文件 svg也会有 压缩svg
const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    .pipe(imagemin())
    .pipe(dest(config.build.dist))
}

// 其他文件任务
const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}

// yarn add del --dev 自动清除dist文件
// 清除任务
const clean = () => {
  return del([config.build.dist, config.build.temp])
}

// 引入热更新服务器
const browserSync = require('browser-sync')

const bs = browserSync.create()

const { watch } = require('gulp')// 监视变化

const serve = () => {
  // 监视的文件变化 执行相应的任务 同步到dist目录 bs监听dist目录刷新浏览器
  watch(config.build.paths.styles, { cwd: config.build.src }, style)// 监视文件路径 第二个参数就是执行的任务
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, page)
  // 至于图片等文件 在开发阶段不用监视
  // watch('src/assets/images/**',image);
  // watch('src/assets/fonts/**',font);
  // watch('public/**',extra);
  // 文件修改后 直接刷新浏览器
  watch([config.build.paths.images, config.build.paths.fonts], { cwd: config.build.src }, bs.reload)
  watch('**', { cwd: config.build.public }, bs.reload)
  bs.init({
    notify: false, // 通知的弹窗不显示
    // port:2080,//设置端口号
    // open:true,//是否自动打开浏览器
    // files:'dist/**',//监听目录下的文件更新 自动更新到浏览器
    server: {
      baseDir: [config.build.temp, config.build.dist, config.build.public], // 当在dist目录找不到文件就会找src下面的文件，如果src也找不到就去找public目录下 在开发阶段提高构建效率 目的在开发阶段不需要把一些固定的图片字体 等编译到dist目录 提高构建效率
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// yarn add gulp-useref --dev  解决引入文件路径的问题插件
const useref = () => {
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp })
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))// 判断是否是js文件 如果是就压缩js文件
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))// 判断是否是css文件 如果是就压缩css文件
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true, // 折叠掉所有的空白字符
      minifyCss: true, // 页面中style script脚本压缩
      minifyJS: true//
      // 移除掉注释等设置
    })))// 判断是否是html文件 如果是就压缩html文件
    .pipe(dest(config.build.dist))// 放到一个新的目录中防止 dist读写冲突
}

const compile = parallel(style, script, page)

// 上线之前执行的任务 先进行清除dist文件
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

// 开发阶段的任务 开发阶段不需要对图片和字体进行编译 优化构建速度
const develop = series(compile, serve)

// 将任务导出
module.exports = {
  build,
  develop,
  clean,
  useref
}
