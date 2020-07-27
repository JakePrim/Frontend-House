/* Set 数据结构 集合 Set内部成员不允许重复 */
const s = new Set();
s.add(1).add(2).add(3).add(4).add(2);

// s.forEach(i=>console.log(i));

// for (const iterator of s) {
//     console.log(iterator);
// }

console.log(s.size);//4

console.log(s.has(100));//has 是否包含某个值 false

console.log(s.delete(3));//删除集合某一个值 true

s.clear();//清除集合
console.log(s);

//Set 主要用于数组去重
const arr = [1,2,1,3,4,1];
const result = Array.from(new Set(arr));//去重的数组 转换为一个新的数组
//也可以通过展开运算符
console.log([...new Set(arr)]);//[ 1, 2, 3, 4 ]
console.log(result);//[ 1, 2, 3, 4 ]
