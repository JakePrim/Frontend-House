//IO 函子
const fp = require('lodash/fp');
const fs = require('fs');
class IO {
    static of(value) {
        return new IO(function () {
            return value;
        });
    }
    constructor(fn) {
        this._value = fn;
    }
    map(fn) {
        return new IO(fp.flowRight(fn, this._value));
    }
}

//调用
// let io = IO.of(process).map(p=>p.execPath).map(p=>p.toUpperCase());
// console.log(io);
//将组合的函数调用 先执行p.execPath 再执行：p=>p.toUpperCase() 注意map函数的执行顺序
// console.log(io._value());///Users/prim/.nvm/versions/node/v12.14.0/bin/node 执行方法
///USERS/PRIM/.NVM/VERSIONS/NODE/V12.14.0/BIN/NODE

let readFile = function (filename) {
    return new IO(function () {
        return fs.readFileSync(filename, 'utf-8');
    });
}

let print = function (log) {
    return new IO(function(){
        console.log(log);
        return log;//log = IO(x)
    });
}

let cat = fp.flowRight(print,readFile);

let r = cat('package.json')._value()._value(); // IO(IO(x))
console.log(r);//IO { _value: [Function] }