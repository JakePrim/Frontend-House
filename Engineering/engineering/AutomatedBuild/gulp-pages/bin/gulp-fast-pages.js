#!/usr/bin/env node

/* cli工具 执行：zce-pages 命令即可 */
console.log(process.argv) // 拿到参数
process.argv.push('--cwd')
process.argv.push(process.cwd()) // 当前命令行所在的目录
process.argv.push('--gulpfile')
process.argv.push(require.resolve('..'))// gulpfile.js文件指定

require('gulp/bin/gulp')// gulp模块
