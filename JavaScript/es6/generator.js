/* 生成器 Generator 避免异步编程中回调嵌套过深提供更好异步编程解决方案 */
function * foo() {
    console.log('zce');
    return 100;
}
const result = foo();
console.log(result);//Object [Generator] {} 调用函数返回一个生成器对象
console.log(result.next());//zce     { value: 100, done: true }
//生成器对象也实现了iterable接口

function * f(){
    console.log(1111);
    yield 100
    console.log(222);
    yield 200
    console.log(3333);
    yield 300
}
const generator = f();
//一旦遇到yield就会停下来不往下执行 当再调用next()才会继续执行
console.log(generator.next());//1111 { value: 100, done: false }
console.log(generator.next());//2222 { value: 200, done: false }
console.log(generator.next());//3333 { value: 300, done: false }
console.log(generator.next());//{ value: undefined, done: true }

// 生成器的应用：发号器
function * createIdMaker(){
    let id = 1;
    while(true){
        yield id++;//不必担心死循环
    }
}

const idMaker=createIdMaker();
console.log(idMaker.next().value);
console.log(idMaker.next().value);
console.log(idMaker.next().value);
console.log(idMaker.next().value);

//使用Generator 函数实现iterator方法
const todos = {
    life:['吃饭','睡觉','打豆豆'],
    learn:['语文','数学','外语'],
    //通过Generator函数进行改造
    [Symbol.iterator]:function * (){
        const all =[...this.life,...this.learn];
        for (const iterator of all) {
            yield iterator;
        }
    }
}
for (const iterator of todos) {
    console.log(iterator);
}