//es6 字符串的扩展 判断字符串当中是否包含指定的内容

const message = "Error: foo is not defined.";
console.log(message.startsWith('Error'));//字符串头部匹配
console.log(message.endsWith('.'));//字符串尾部匹配
console.log(message.includes('foo'));//字符串中是否包含某个 字符串参数