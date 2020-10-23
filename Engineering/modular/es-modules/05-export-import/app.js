
//可以将导入的模块 直接导出 当前作用域不能再访问这个成员了
export {name,age} from './module.js';
// console.log(age);//报错找不到
//一个一个的导入组件太麻烦了 最好可以集中的导出出去 而不用在一个个导入组件模块
import {Button,Avator} from './components/index.js';
console.log(Button,Avator);


