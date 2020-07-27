/* ECMAScript 2017 */
const obj={
    foo:'foo',
    bar:'bar'
}
//Object.values 返回值数组-----------------
console.log(Object.values(obj));//[ 'foo', 'bar' ]

//Object.entries 返回键值对数组--------------
console.log(Object.entries(obj));// [ [ 'foo', 'foo' ], [ 'bar', 'bar' ] ]
for (const [key,value] of Object.entries(obj)) {
    console.log(key,value);//foo foo
}
//将一个对象转换成Map对象
console.log(new Map(Object.entries(obj)));//Map { 'foo' => 'foo', 'bar' => 'bar' }

//Object.getOwnPropertyDescriptors-----------------
const p1 = {
    firstName:'Lei',
    lastName:'Wang',
    get fullName(){
        return this.firstName+' '+this.lastName;
    },
    test(){
        console.log(this.firstName+' '+this.lastName);
    }
}
console.log(p1.fullName);//Lei Wang

const p2 = Object.assign({},p1);//Object.assign 存在的问题 get属性方法无法复制
p2.firstName = 'zce';
console.log(p2.fullName);//Lei Wang

//配合getter setter 属性使用
const descriptors = Object.getOwnPropertyDescriptors(p1);
//Object.defineProperties() 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
const p3 = Object.defineProperties({},descriptors);
p3.firstName = 'zce';
console.log(p3.fullName);//zce Wang

//String.prototype.padStart/String.prototype.padEnd------------------

const books ={
    html:5,
    css:16,
    js:128
}

for (const [name,count] of Object.entries(books)) {
    console.log(`${name.padEnd(16,'-')}|${count.toString().padStart(3,'0')}`);
}

//在函数参数中添加尾逗号
const arr=[
    100,
    200,
    300,
    400,
]

