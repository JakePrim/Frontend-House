const _ = require('lodash');

const reverse = arr => arr.reverse();

const first = arr => arr[0];

const toUpper = s => s.toUpperCase();

//获取数组最后一个元素 转换为大写 注意函数的运行顺序从右到左
// const l = compose(toUpper, first, reverse);

// console.log(l(['a', 'b', 'c', 'd', 'e']));

//flowRight 的实现方法
// function compose(...args) {
//     console.log(args);
//     return function (value) {
//         return args.reverse().reduce(function (acc, fn) {
//             return fn(acc);
//         }, value);
//     }
// }
//arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
//第一个累计器累计回调的返回值; 它是上一次调用回调时返回的累积值
//第二个参数数组中正在处理的元素
const compose = (...args) => (value) => args.reverse().reduce((acc, fn) =>
    fn(acc), value);//reduce 第二个参数是一个初始的值 reduce是将所有数组进行遍历比如累加第一个的结果会传入到第二个中


//结合律
// const f = _.flowRight(_.flowRight(_.toUpper,_.first),_.reverse);
const f = _.flowRight(_.toUpper,_.flowRight(_.first,_.reverse));
console.log(f(['a', 'b', 'c', 'd', 'e']));


