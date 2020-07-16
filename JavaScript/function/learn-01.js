//高阶函数 - 函数作为参数

//模拟forEach
function forEach(array, fn) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        fn(element);
    }
}

// let arr = [1,2,3,4,5];
// forEach(arr,item=>{
//     console.log(item);
// });

//模拟filter
function filter(array, fn) {
    let result = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (fn(element)) {
            result.push(element);
        }
    }
    return result;
}

//测试
// let arr = [1, 3, 4, 7, 8];
// let r = filter(arr, item => {
//     return item % 2 === 0;
// });
// console.log(r);

//函数作为返回值
function makeFn() {
    let msg = "hello function";
    return function () {
        console.log(msg);
    }
}
const fn = makeFn();
// fn();

// makeFn()();//另外一种调用方式

//模拟once函数 只能执行一次
function once(fn) {
    let done = false;
    return function () {
        if (!done) {
            done = true;
            return fn.apply(this, arguments);//调用function() 传递的参数 传递到fn
        }
    }
}

let pay = once((money) => {
    console.log(`支付了${money} RMB`);
});
// pay(5);
// pay(5);
// pay(5);
// pay(5);

//模拟map函数 对数组中对每一个元素遍历改变每一个元素的值 使用const 不希望函数被修改定义为常量
const map = (array, fn) => {
    let results = [];
    for (const value of array) {
        results.push(fn(value));//得到的是fn的处理的结果
    }
    return results;
}

//测试
// let arr = [1,2,3,4,5];
// arr = map(arr, value => {
//     return value * value;
// });
// console.log(arr);

//every 数组的所有元素进行某种操作全部为真匹配条件才返回真 否则只要有一个不成立就会返回false假
const every = (arr, fn) => {
    let result = false;
    for (const iterator of arr) {
        result = fn(iterator);
        //只要有一个返回为false就不成立
        if (!result) {
            break;
        }
    }
    return result;
}
// let arr = [2, 4, 6,7, 8];
// let e = every(arr, function (value) {
//     return value % 2 === 0;
// });
// console.log("e -> e", e)

//模拟some函数 数组中的元素只要有一个元素匹配条件返回为true,只有所有元素全部不匹配条件才会返回false
const some = (arr, fn) => {
    let result = false;
    for (const value of arr) {
        result = fn(value);
        if (result) {
            break;
        }
    }
    return result;
}
// let arr = [1, 3, 7, 5];
// let res = some(arr, (value) => {
//     return value % 2 == 0;
// });
// console.log("res -> res", res)
