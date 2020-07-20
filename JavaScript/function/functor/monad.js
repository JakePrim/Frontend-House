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
        return new IO(fp.flowRight(fn, this._value));//合并函数返回一个新的函子
    }
    join(){
        //调用_value
        return this._value();
    }
    flatMap(fn){
        return this.map(fn).join();//把合并的函数 然后执行合并函数
    }
}
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
let r = readFile('package.json')//_value = fn1
    .map(x=>x.toUpperCase())//处理文件 _value=fn11
    .flatMap(print)//return IO(value) ==> _value = fp.flowRight(print,fn11,fn1); value = _value();
    .join(); // map(fn2) _value = fn2=new IO() ,fn1 join():_value: fp.flowRight(fn2, fn1) => new IO(fn3);---> join:fn3()
console.log(r);//IO { _value: [Function] }