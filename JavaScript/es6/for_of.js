/* for...of... 可以作为所有遍历的方式 */
//for
//for..in.. 
//forEach

//for..of.. 循环遍历所有数据结构的统一方式

const arr = [100,200,300,400];

//拿到的数组每一个元素
for (const iterator of arr) {
    console.log(iterator);
    if(iterator > 200){
        break;
    }
}

//forEach 不能跳出循环 终止循环
//arr.some()
//arr.every()

const s= new Set(['foo','bar']);

for (const iterator of s) {
    console.log(iterator);
}

const m = new Map();

m.set('foo',123);
m.set('bar',456);

for (const [key,value] of m) {//解构数组
    console.log(key,value);//[ 'foo', 123 ] [ 'bar', 456 ]
}

//Object 对象不能被for_of迭代 需要自定义迭代器
const obj = {foo:123,bar:456}

for (const iterator of object) {//object is not defined
    
}