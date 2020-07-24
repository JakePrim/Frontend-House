//函数参数的默认值

//一般的写法
// function foo(enable){
//     //需要判断函数是否传递了
//     enable = enable === undefined ? true : enable;
//     console.log('foo invoked - enable:');
//     console.log(enable);
// }
// foo(false);

//es6 新的写法 注意如果有多个参数 默认参数一定要放在最后面
function foo(bar,enable = true,tag = "TAG"){
    console.log(bar,enable,tag);
}
foo('hello');