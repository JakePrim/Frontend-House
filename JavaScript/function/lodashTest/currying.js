/* 柯里化 */

//硬编码
// function checkAge(age){
//     let min = 18;
//     return age >= min;
// }

//解决硬编码的问题 普通的纯函数
// function checkAge(min,age){
//     return age >= min;
// }

// console.log(checkAge(18,20));//true

//解决基准值的问题 通过闭包的方式
// function checkAge(min) {
//     return function (age) {
//         return age >= min;
//     }
// }
// let checkAge = min => ((age) =>(age>=min));

// let checkAge18 = checkAge(18);
// let checkAge20 = checkAge(20);

// console.log(checkAge18(20));
// console.log(checkAge18(24));
// console.log(checkAge20(20));
// console.log(checkAge20(24));

//lodash 通用的柯里化方法
//curry(func) 创建一个函数并且该函数接收一个或多个func的参数，如果func所需要的参数，如果func所需要的参数都被提供则
//则执行func并返回执行的结果，否则继续返回该函数并等待接受剩余的参数
//参数：需要柯里化的函数
//返回值：柯里化后的函数
const _ = require('lodash');
function getSum(a, b, c) {
    return a + b + c;
}
const curried = _.curry(getSum);

// console.log(curried(1,2,3));
// console.log(curried(1,2)(3));
// console.log(curried(1)(2,3));

//案例：提取字符串的空白字符
const match = curry(function (reg, str) {
    return str.match(reg);
});

const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

const filter = curry(function(func,arry){
    return arry.filter(func);
});

// console.log(haveSpace('hello world'));
// console.log(haveNumber('123abc'));

console.log(filter(haveSpace,['jonm Connm','Jone_Done']));

const findSpace = filter(haveSpace);//新的函数 查找数组中具有空白数组的函数

console.log(findSpace(['jonm Connm','Jone_Done']));

//柯里化原理实现
function curry(func){
    return function curriedFn(...args){
        //判断匿名接受的参数个数以及func的形参个数
        if (args.length < func.length) {
            //只传递部分的参数则返回一个新的函数
            return function(){
                //再次调用curriedFn 合并参数
                return curriedFn(...args.concat(Array.from(arguments)));
            }
        }
        //参数相同的情况下直接调用func
        return func(...args);
    }
}