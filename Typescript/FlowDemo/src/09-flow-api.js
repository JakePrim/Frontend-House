/* 
运行环境API 类型
https://github.com/facebook/flow/blob/master/lib/dom.js
@flow
*/
//DOM BOM Node的内置API等 都有一些类型限制
const element:HTMLElement | null =  document.getElementById("id");
