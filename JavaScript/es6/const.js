const name ='jake';
//const 一旦声明赋值后就不允许修改
name = '1223';

//const 声明变量必须有初始值否则报错
const name;
name = 'zce';


//const 只是不允许修改内存地址 如下对象的属性修改是可以的
const obj = {};
obj.name = 'zce';

//如下就会报错 因为内存地址改变了
obj = {}

//对于const 只需要记住，const声明的变量内存地址不能改变

