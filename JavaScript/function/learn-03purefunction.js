//纯函数

//slice splice
let array = [1,2,3,4,5];
console.log(array.slice(0,3));
console.log(array.slice(0,3));
console.log(array.slice(0,3));
//输入相同 输出也相同就是一个纯函数
//[ 1, 2, 3 ]
// [ 1, 2, 3 ]
// [ 1, 2, 3 ]

console.log(array.splice(0,3));
console.log(array.splice(0,3));
console.log(array.splice(0,3));
//splice 相同的输入 每次输出的结果不相同 那么就是一个不纯的函数
//[ 1, 2, 3 ]
//[ 4, 5 ]
//[]

//写一个纯函数
function getSum(n1,n2){
    return n1 + n2;
}
console.log(getSum(1,2));
console.log(getSum(1,2));
console.log(getSum(1,2));
// 3
// 3
// 3