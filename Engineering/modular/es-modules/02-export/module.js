//导出
var name = 'foo module';

function hello() {
    console.log('hello');
}

class Person { }

//统一导出成员 as 对成员重命名  default关键词
// export { name as fooName, hello as default, Person }

var a = 1;

//默认导出 不能和上述的导出共存 
export default a;

