// if (true) {
//     var foo = "zce";
// }
// console.log(foo);

// if (true) {
//     let foo = "zce";
// }
// console.log(foo);
// foo is not defined

//for 循环的块级作用域
// for(var i =0;i<3;i++){
//     for(var i =0;i<3;i++){
//         console.log(i);//当内层循环完毕 外层i也=3 所以循环只执行了一次
//     }
// }
// 一般不要使用同名的计数器
// for(let i =0;i<3;i++){
//     for(let i =0;i<3;i++){
//         console.log(i);//当内层循环完毕 外层i也=3
//     }
// }

//事件绑定的问题
// var eles = [{},{},{}];
// for(var i = 0;i<eles.length;i++){
//     eles[i].onclick=function(){
//         console.log(i);//打印的是全局作用域的i
//     }
// }
// eles[2].onclick();//3

//通过闭包来解决上述问题
// for(var i = 0;i<eles.length;i++){
//     eles[i].onclick=(function(i){
//         return function(){
//             console.log(i);//打印的是全局作用域的i
//         }
//     })(i);
// }
// eles[2].onclick();

//let 解决 实际内部也是闭包的机制
// for(let i = 0;i<eles.length;i++){
//     eles[i].onclick=function(){
//         console.log(i);//打印的是全局作用域的i
//     }
// }
// eles[2].onclick();

//----------------- 两个i不互相影响
// for(let i =0;i<3;i++){
//     let i = 'foo';
//     console.log(i);
// }
// //循环的拆解容易理解
// let i = 0;
// if(i<3){
//     let i = 'foo';
//     console.log(i);
// }
// i++;

// if(i<3){
//     let i = 'foo';
//     console.log(i);
// }
// i++;

// if(i<3){
//     let i = 'foo';
//     console.log(i);
// }
// i++;

// let 的声明不会变量提升 必须先声明变量在使用变量
// console.log(foo);//undefined
// var foo = 'zce';

// console.log(foo);//Cannot access 'foo' before initialization
// let foo = 'zce';