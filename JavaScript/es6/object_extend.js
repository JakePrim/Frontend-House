/* 对象扩展方法 */

//Object.assign 将多个源对象中的属性复制到目标对象中
const source1 = {
    a: 123,
    b: 123
}

const target = {
    a: 456,
    c: 456
}

//第一个参数是目标对象 也就是所有源对象的属性都会复制到目标对象中
const result = Object.assign(target, source1);
console.log(result);//{ a: 123, c: 456, b: 123 } 后面对象的属性覆盖第一个对象的属性 可以看到a属性被源对象覆盖了
console.log(target);//{ a: 123, c: 456, b: 123 }
console.log(result === target);//返回的对象和目标对象完全相等的

//复制一个对象应用
//比如下面的例子 向函数传递一个对象 如果函数改变了对象的某个属性的属性值 那么外部的对象也会发生改变
function func(obj) {
    obj.name = 'func obj';
    console.log(obj);
}
const obj = {name:'global obj'};

func(obj);//{ name: 'func obj' }

console.log(obj);//{ name: 'func obj' }

//可以使用object.assign 复制一个对象就不会改变外部对象
function copyFunc(obj){
    const o = Object.assign({},obj);
    o.name = 'func obj';
    console.log(o);//{ name: 'func obj' }
}
const obj2 = {name:'global obj'};
copyFunc(obj2);
console.log(obj2);//{ name: 'global obj' }

//Object.is 扩展方法 判断两个值是否相等
//== 会在比较之前自动转换类型
//=== 严格判断类型
console.log(0==false,0===false);//true false
console.log(+0===-0);//true 三等运算符是无法比较+0 和 -0
console.log(NaN===NaN);//false 两个NaN不相等的
//Object.is() 新的一种全等的方法+0和-0可以区分开 两个NaN是相等的 一般不推荐这种方法还是使用===运算法进行比较
console.log(Object.is(+0,-0));//false
console.log(Object.is(NaN,NaN));//true


