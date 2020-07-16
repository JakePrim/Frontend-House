const _ = require('lodash');

function getArea(r) {
    console.log(r);
    //计算圆的面积
    return Math.PI * r * r;
}
//lodash的memoize方法 接收一个纯函数 对纯函数的结果缓存 返回一个带有记忆功能的函数
// let getAreaWithMemory = _.memoize(getArea);
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
/* 
4 表示getArea这个函数只执行了一次
50.26548245743669
50.26548245743669
50.26548245743669
*/

//模拟memoize方法的实现
function memoize(fn){
    let cache = {};
    return function(){
        //1 判断cache是否有这个fn的结果
        let key = JSON.stringify(arguments);//将传递的参数作为key
        cache[key] = cache[key] || fn.apply(fn,arguments);//如果没有值调用fn() 结果作为值
        return cache[key];
    }
}
let getAreaWithMemory = memoize(getArea);
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
/* 结果如下:
4
50.26548245743669
50.26548245743669
50.26548245743669
*/