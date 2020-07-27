/* Symbol */
//主要作用：为对象添加独一无二的属性名
// ES6 之前对象的属性名都是字符串 而字符串都是有可能会重复的 重复的话就会冲突
//如下例子 缓存的对象 约定的方式解决 
const cache = {};
//a.js
cache['a_foo'] = Math.random();

//b.js 
//不知道之前存在
cache['b_foo'] = '123';

console.log(cache);//{ foo: '123' }

//Symbol 表示一个独一无二的值 ES6 支持Symbol作为属性名

const s = Symbol();
console.log(s);//Symbol()
console.log(typeof s);
console.log(Symbol() === Symbol());//false

console.log(Symbol('foo'));
console.log(Symbol('bar'));
console.log(Symbol('baz'));

//对象支持symbol作为键
const ss=Symbol('foo');
const aa = Symbol('foo');
const obj = {
    [ss]:123,
};
obj[aa]='test'
console.log(obj[ss],obj[aa]);//123 test

//实现对象的私有成员
//a.js==================
//对外暴露对象
const name = Symbol();
const person = {
    [name]:'ace',
    say(){
        console.log(this[name]);
    }
}
//b.js ==============
console.log(person.say());//ace


//Symbol 每次调用都是一个全新的一个值
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');
//for() 相同的字符串返回相同的Symbol值 维护的是字符串和Symbol的对应关系
console.log(s1===s2);//true 
//如果for() 方法传入的不是字符串就会 默认转换为字符串 注意如果传入true和'true' 结果是一样的 注意！！
console.log(Symbol.for(true)===Symbol.for('true'));// true 

console.log(Symbol.iterator);
console.log(Symbol.hasInstance);

const obj2 = {
    //为对象实现迭代器会经常用到
    [Symbol.toStringTag]:"XObject", //[object XObject]
}
console.log(obj2.toString());//[object Object] 自定义对象的toString标签

//symbol 不能被迭代获取到 如下面的方式都无法获取symbol属性名
const obj3 = {
    [Symbol()]:'Symbol value',
    foo:'normal value'
}

for (const key in obj3) {
    console.log(key);//foo
}

console.log(Object.keys(obj3));//[ 'foo' ]

console.log(JSON.stringify(obj3));//{"foo":"normal value"}

//可以通过getOwnPropertySymbols获取symbol属性，注意他只能获取symbol类型的属性名 普通的无法获取
console.log(Object.getOwnPropertySymbols(obj3));//[ Symbol() ]