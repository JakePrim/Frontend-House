//import {} 不是一个解构 而是导入，导出的成员的引用 固定的语法
import {name,age} from './module.js';

console.log(name,age);//jake 100

// name = 'tom';//3. 不能修改模块的成员 导入的成员是一个只读的成员

setTimeout(() => {
    console.log(name,age);//ben 100 由此可见导入的是成员的引用
}, 1000);

