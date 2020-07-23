const arr = [100,200,300];

//解构
// const [foo,bar,baz] = arr;
// console.log(foo,bar,baz);
//提取指定位置的成员
// const [,,baz] = arr;
// console.log(baz);

// 提取指定位置之后的所有成员
// const [foo,...rest] = arr;
// console.log(rest);

// const [...rest] = arr;
// console.log(rest);

//解构成员的个数小于被解构的数组长度 就会从前到后的提取
// const [foo] = arr;
// console.log(foo);

//如果解构成员的个数大于数组的长度，多出来的成员是undefined
// const [foo,bar,ace,more] = arr;
// console.log(more);//undefined

//给成员设置默认值
const [foo,bar,ace=123,more='default value'] = arr;
console.log(more);//undefined

const path = '/foo/bar/baz';
// const temp = path.split('/');
// const rootdir = temp[1];
// console.log(rootdir);//foo

//通过数组解构的方式可以大大的简化代码
const [,rootdir] = path.split('/');
console.log(rootdir);