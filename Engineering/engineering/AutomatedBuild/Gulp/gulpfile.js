/* gulp 入口文件 */

/* 
    foo任务没有完成 在最新的gulp取消了同步代码模式，约定的任务都是异步任务，需要标记任务已经完成，需要手动的调用一个回调函数
*/
exports.foo = (done) => {
    console.log('foo task working');
    done();//标识任务完成
}



//2. gulp 组合任务：并行任务和串行任务
const { series, parallel } = require('gulp');
const task1 = done => {
    setTimeout(() => {
        console.log('task1 working');
        done();
    }, 1000);
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 working');
        done();
    }, 1000);
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 working');
        done();
    }, 1000);
}
//串行任务 例如：部署的任务 需要执行编译任务 然后在执行其他的任务
exports.tasks = series(task1, task2, task3);
//并行任务 例如：编译sass bebel 他们之间互不干扰可以并行执行任务
exports.tasksAsync = parallel(task1, task2, task3);

//4.0以前 现在已经不被推荐了 通过导出成员的方式定义gulp任务
const gulp = require('gulp');

gulp.task('bar', done => {
    console.log('bar task working');
    done();
});


//Gulp 异步任务的三种方式

//1. 常用的方式
exports.callback = done => {
    console.log('callback task~');
    done();
}
//错误的任务
exports.callback_error = done => {
    console.log('callback error task');
    done(new Error('task failed'));
}

//2. Promise的方式
exports.promise = () => {
    console.log('promise task~');
    return Promise.resolve();
}

exports.promise_error = () => {
    console.log('promise error task~');
    return Promise.reject(new Error('task failed'));
}

const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

exports.async = async () => {
    await timeout(1000);
    console.log('async task~');
}

//3. Stream方式
const fs = require('fs');
exports.stream = () => {
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('temp.txt');
    readStream.pipe(writeStream);
    return readStream;
}

//Stream的方式 实际上是
exports.stream1 = done => {
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('temp1.txt');
    readStream.pipe(writeStream);
    //监听事件的结束
    readStream.on('end', () => {
        console.log("stream task~");
        done();
    });
}

const { Transform } = require("stream");

// //直接运行 yarn gulp
// exports.default = done => {
//     //文件读取流
//     const read = fs.createReadStream('normailze.css');
//     //文件写入流
//     const write = fs.createWriteStream('normailze.min.css');
//     //文件转换流 压缩css文件
//     const transform = new Transform({
//         //chunk => 读取流中读取到的文件内容 buffer
//         transform: (chunk, encoding, callback) => {
//             const input = chunk.toString();
//             const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
//             //错误优先的回调函数 如果没有错误传入null
//             callback(null, output);
//         }
//     });
//     //写入
//     read.pipe(transform)
//         .pipe(write);

//     return read;
// }

//gulp 的操作文件的api
const { src, dest } = require('gulp');

const cleanCss = require('gulp-clean-css');

const rename = require('gulp-rename');

exports.default = () => {
    return src('src/*.css')//读取文件
        .pipe(cleanCss())//中间进行对css文件的压缩 转换
        .pipe(rename({ extname: ".min.css" }))//对文件进行重新命名
        .pipe(dest('dist'));
}