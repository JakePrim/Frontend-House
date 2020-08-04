/* Reflect 属于一个静态类 */
//Reflect 内部封装了一系列对对象的底层操作 14个静态方法 其中废弃掉了一个
//它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同
//Reflect 成员方法就是Proxy处理对象的默认实现

const obj = {
    foo:'123',
    bar:'456'
}

const proxy = new Proxy(obj,{
    get(target,property){
        console.log('watch logic~');
        return Reflect.get(target,property);
    }
});

console.log(proxy.foo);
//Reflect 的意义：提供统一一套用于操作对象的API

const obj = {
    name:'zce',
    age:18
}
//传统的写法
// console.log('name' in obj);
// console.log(delete obj['age']);
// console.log(Object.keys(obj));

//统一的方法
console.log(Reflect.has(obj,'name'));//是否存在属性
console.log(Reflect.deleteProperty(obj,'age'));
console.log(Reflect.ownKeys(obj));

//总结MDN

