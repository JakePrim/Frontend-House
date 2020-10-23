var name = 'jake';
var age = 100;

var obj={name,age}

export {name,age} //1. 导出的是两个成员 不是对象字面量 而是成员的引用
//导出的注意事项: 导出的{} 和obj的对象字面量不是一个概念

// export default {name,age} //2. default 导出的是一个对象字面量

setTimeout(() => {
    name='ben';
}, 1000);

