/* 
对象类型
@flow
*/
//定义对象的成员类型方式如下
const obj:{foo:string,bar:number} = {
    foo:'string',bar : 123
}

//上述定义成员类型，成员必须定义否则报错 可以通过?:的方式 成员不是必须定义的
const obj1:{foo?:string,bar:number} = {
    bar:123
}

//设置对象属性键的类型限制和值的类型限制
const obj2:{[string]:string}={}

obj2.key='value';
obj2.age= '14';