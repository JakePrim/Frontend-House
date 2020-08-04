//JavaScript 弱类型产生的问题
const obj = {}

//运行到此就会报错 抛出异常 这是一个隐患 而强类型的语言直接在语法层面上抛出错误
setTimeout(() => {
    obj.foo();
}, 1000);