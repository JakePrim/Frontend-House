/* 引用计数 */

const user1 = { age: 11 }
const user2 = { age: 12 }
const user3 = { age: 13 }

//user1 - user3 都被nameList 此时引用数不是0 就不会被GC回收掉
const nameList = [user1.age, user2.age, user3.age];

function fn() {
    //挂载在全局下 加上const 就会只在fn()其效果 一旦函数调用完毕 num1 num2 的引用计数就为0
    const num1 = 1
    const num2 = 2
}

fn();

//对象循环引用

function fn1(){
    const obj1 = {}
    const obj2 = {}
    //但是obj2的一个属性是指向了 obj1的两者之间还存在引用 引用计数并不是为0的
    obj1.name = obj2;
    obj2.name = obj1;

    return '';
}

fn1();