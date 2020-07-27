/* Map 数据结构 键值对集合 可以用其他类型的数据最为键 */
//如Object的问题
const obj = {};

obj[true] = 'value';
obj[123] = 'value';
obj[{a:1}] = 'value'

console.log(Object.keys(obj));//[ '123', 'true', '[object Object]' ] 全部转换为了字符串 以toString的结果作为键

console.log(obj['[object Object]']);//value
console.log(obj[{}]);//value
console.log(obj['true']);//value

//Map 是键值对映射集合 键可以是任意类的数据
const m = new Map();
const tom = {name:'tom'};
m.set(tom,90);//键可以是任意类型的数据

console.log(m);//Map { { name: 'tom' } => 90 }

console.log(m.get(tom));//90



m.forEach((value,key)=>{
    console.log(value,key);//90 { name: 'tom' }
})

console.log(m.has(tom));//true
console.log(m.delete(tom));//true
m.clear();
console.log(m);