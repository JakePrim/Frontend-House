// ... 操作符展开数组 而不用在根据下标进行展开数组
const arr= ['foo','bar','baz'];

console.log(arr[0],arr[1],arr[2]);

//以前的写法 打印数组
console.log.apply(console,arr);

//新特性直接通过...操作符可输出数组的值 大大减少了操作
console.log(...arr);