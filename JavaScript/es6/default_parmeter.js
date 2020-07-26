//函数参数的默认值 新特性

//一般的写法
// function foo(enable){
//     //需要判断函数是否传递了
// 不能这样写： enable = enable || true; 这样如果传入false还会使用的默认值true
//     enable = enable === undefined ? true : enable;
//     console.log('foo invoked - enable:');
//     console.log(enable);
// }
// foo(false);

//es6 新的写法 注意如果有多个参数 默认参数一定要放在参数列表最后面 可以定义多个默认参数
// function foo(bar,enable = true,tag = "TAG"){
//     console.log(bar,enable,tag);
// }
// foo('hello');

//剩余参数 接受任意个数的参数 一般通过arguments接受
//ES6 引入了... 的形式 已数组的形式去接收当前位置开始所有的形参 同样只能出现在形参列表的最后一位，而且只能出现一次
function foo(first,...args){
    console.log(first,args);
}
foo(1,2,3,4);//[ 1, 2, 3, 4 ]