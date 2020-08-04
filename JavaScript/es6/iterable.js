/* 可迭代接口 用于for..of 循环 提供了Iterable 接口 */
//只要数据结构实现了Iterable接口就可以被for..of 遍历
//Symbol.iterator 方法实现

//for..of 遍历的原理 内部实现Symbol.iterator方法
const set = new Set(['foo', 'bar', 'baa']);

const iterator = set[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
/* 
{ value: 'foo', done: false }
{ value: 'bar', done: false }
{ value: 'baa', done: false }
{ value: undefined, done: true }
*/
const obj = {
    store:['foo','bar','baz'],
    [Symbol.iterator]: function () {
        let index = 0;
        const self = this;
        return {//iterable
            //约定内部必须要有一个next方法 iterator
            next: function () {
                //约定的迭代结果接口:IterationResult value 当前迭代的数据 done 用来表示迭代有没有结束
                const result = {
                    value: self.store[index],
                    done: index >= self.store.length
                }
                index++;
                return result;
            }
        }
    }
};
for (const iterator of obj) {
    console.log(iterator);
}

//迭代器模式 场景:协同开发一个任务清单应用
//a同学的代码 ====================================
const todos = {
    life:['吃饭','睡觉','打豆豆'],
    learn:['语文','数学','外语'],
    //一般提供一个迭代的回调函数 但是这样并不好用 需要根据某个key来进行迭代 如果key值改变以后 其他调用的代码都需要改变
    each:function(callback){
        const all = [].concat(this.life,this.learn,this.work);
        for (const iterator of all) {
            callback(iterator);
        }
    },
    //对外提供统一遍历的接口 直接使用for..of循环即可 不用关系内部的结构是什么样的 从语言层面实现的迭代器模式 可以适用任何的数据结构
    [Symbol.iterator]:function(){
        const all =[...this.life,...this.learn];
        let index = 0;
        return{
            next:function(){
                return{
                    value:all[index],
                    done:index++ >= all.length
                }
            }
        }
    }
}


// b同学的代码 =======================
// for (const iterator of todos.life) {
//     console.log(iterator);
// }

// for (const iterator of todos.learn) {
//     console.log(iterator);
// }
todos.each(item=>{
    console.log(item);
});
console.log('-------------------------------------');
for (const iterator of todos) {
    console.log(iterator);
}