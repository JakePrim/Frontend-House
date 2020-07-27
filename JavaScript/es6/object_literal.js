/* 对象字面量新特性 */

const bar = '345';

const obj = {
    foo:123,
    bar,//变量名与添加的属性名一致
    method(){//添加方法可以省略掉:和function
        console.log(this);//内部的this指向当前的对象
    }
}
console.log(obj);//{ foo: 123, bar: '345', method: [Function: method] }
obj.method();

//通过方括号动态使用属性名 可以使用任意的表达式 表达式的结果将会作为对象属性的属性名
obj[Math.random()] = 123;//计算属性名