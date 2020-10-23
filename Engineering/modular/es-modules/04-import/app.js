//import from导入模块的路径 必须使用完整的文件名称 不能省略.js 和CommonJs有区别的
//./ 不能省略的 也可以使用完整的路径 或者URL
// import {name} from './module.js';
// import {name} from '/04-import/module.js';
// import {name} from './module';

//只加载模块 并不会提取成员 这个特性 导入不需要外界控制的子功能模块会很有用
// import './module.js';

// 导入所有成员 并放到一个对象中
// import * mod from './module.js';

// 按需导入 动态导入模块,返回的是一个Promise通过then会可以获取到导出成员对象
// import('./module.js').then(function(module){
//     console.log(module.name);
// })

//统一导出成员 和 默认的成员 同时存在如何导入？
//第一种方式：
// import {name,age,default as title} from './module.js';

// console.log(name,age,title);

//第二种方式：推荐
import title,{name,age} from './module.js';
console.log(title,name,age);

