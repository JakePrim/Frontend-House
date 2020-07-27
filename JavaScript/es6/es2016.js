const arr = ['foo',1,NaN,false];

//一般查找数组元素通过find()方法找到元素的下标 但是他不能查找NaN
//includes可以查找NaN的数值 直接返回true/false
console.log(arr.includes(NaN));//true

//指数运算符----------------------------------------
console.log(Math.pow(2,10));//2的10次方

console.log(2 ** 10);//2的10次方