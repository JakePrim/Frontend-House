//添加到实例内部
var fn1 = function () {
    this.foo = function () {
        console.log(1111);
    }
}

let f1 = new fn1();

//添加到原型上
var fn2 = function () { }
fn2.prototype.foo = function () {
    console.log(1111);
}

let f2 = new fn2();