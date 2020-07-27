/* 监视某个对象属性的读写 
以前ES5使用Object.defineProperty 在vue3.0以前的版本使用这样的方法进行属性响应从而实现了数据绑定
Object.defineProperty 需要针对每一个属性进行设置
*/
//ES6 提供Proxy监视对象的读写过程 Proxy可以监视对象的所有属性 要强大很多
//代理对象 监视对象读和写
const person = {
    name:'zce',
    age:20
}
//返回一个代理对象 第一个参数就是需要代理的目标对象 第二个参数是代理的处理对象
const personProxy = new Proxy(person,{
    //监视属性的访问
    get(target,property){
        //target 目标对象 property属性名
        // console.log(target,property);//{ name: 'zce', age: 20 } name
        //返回值是外部访问属性的结果 先判断目标对象是否存在属性
        return property in target ? target[property] : 'default';
    },
    //监视属性的写入
    set(target,property,value){
        //target 目标对象 property属性名 value属性值
        console.log(target,property,value);//{ name: 'zce', age: 20 } gender true
        //可以做一些数据校验
        if(property === 'age'){
            //判断属性值是否为数字
            if (!Number.isInteger(value)) {
                throw new TypeError(`${value} is not an int`);
            }
        }
        target[property] = value;
    }
});
console.log(personProxy.name);//zce
console.log(personProxy.xxx);//default

personProxy.gender= true;
personProxy.age = 123;

//对比 VS Object.defineProperty
//Object.defineProperty 只能监视对象属性的读写
//1 Proxy 能够监视到更多对象操作
const proxy  = new Proxy(person,{
    deleteProperty(target,property){
        console.log(`delete ${property}`);
        //监听属性的删除
        delete target[property];
    }
});

delete proxy.age;
console.log(person);//{ name: 'zce', gender: true }


//总结时 查询Proxy的监听对象的所有方法 在mdn中查找

//2 Proxy 更好的支持数组对象的监视 
const list = [];

const listProxy = new Proxy(list,{
    set(target,property,value){
        console.log(target,property,value);//[] 0(数组的下标) 100(值)
        target[property] = value;
        return true;//写入成功
    }
});
listProxy.push(100);

//3 Proxy 是以非侵入的方式监管了对象的读写
//Object.defineProperty 会侵入对象
const p = {};
Object.defineProperty(p,'name',{
    get(){
        console.log("name 被访问");
        return p._name;
    },
    set(value){
        console.log("name 被设置");
        p._name = value;
    }
});
Object.defineProperty(p,'age',{
    get(){
        console.log("age 被访问");
        return p._age;
    },
    set(value){
        console.log("age 被设置");
        p._age = value;
    }
});
p.name = 'jake';
console.log(p.name);//jake