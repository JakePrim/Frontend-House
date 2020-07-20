/* 
    1. Promise 是一个类 在执行这个类的时候 需要传递一个执行器进去 这个执行器会立即执行
    2. Promise 中有三种状态分别为：pending -> fulfilled pending->rejected
    3. resolve reject 函数用来更改状态
        resolve:fulfilled
        reject:rejected
    4. then方法内部做的事情就是判断状态 如果状态成功调用成功回调函数
    如果状态失败就回调失败的回调函数
    5. then成功或失败都有一个参数分别表示成功的值和失败的原因
    6. 记录成功的值和失败的值
    7. 处理执行器内部异步情况的处理 调用resolve或reject
    8. 处理then方法可以被多次调用
    9. then方法可以被链式调用 后面then方法回调函数拿到的值是上一个then方法
    回调函数的返回值
    10. then 返回值是普通值还是Promise对象
    11. then 返回相同的Promise对象循环调用的判断
    12. 执行器内部发生错误 回调给reject，then 内部发生错误的处理
    13. then无参数的链式调用实现
    14. all静态方法实现
*/

const PENDING = 'pending';//等待
const FULFILLED = 'fulfilled';//成功
const REJECTED = 'rejected';//失败

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject);//执行器立即执行
        } catch (e) {
            this.reject(e);
        }
    }
    status = PENDING;//定义状态
    //成功之后的值
    value = undefined;
    //失败之后的值
    error = undefined;

    //成功回调
    onFulfilled = [];
    //失败回调
    onRejected = [];
    //箭头函数 this指向不会被更改 this还会指向MyPromise对象
    resolve = (value) => {
        //0 判断状态是不是pending 阻止向下执行
        if (this.status !== PENDING) {
            return;
        }

        //1 状态更改
        this.status = FULFILLED;
        //2 保存成功之后的值
        this.value = value;
        //3 成功回调是否存在
        // this.onFulfilled && this.onFulfilled(this.value);
        while (this.onFulfilled.length) {
            this.onFulfilled.shift()();
        }
    }
    reject = (error) => {
        //0 判断状态是不是pending 阻止向下执行
        if (this.status !== PENDING) {
            return;
        }
        //1 状态更改
        this.status = REJECTED;
        //2 保存失败之后的值
        this.error = error;
        //3 失败回调是否存在
        // this.onRejected && this.onRejected(this.error);
        while (this.onRejected.length) {
            this.onRejected.shift()();
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = onFulfilled ? onFulfilled : value => value;
        onRejected = onRejected ? onRejected : error => { throw error };
        //1. 实现链式调用
        let p = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        //拿到回调函数的返回值
                        let result = onFulfilled(this.value);
                        //传递给下一个Promise对象
                        //判断result是普通值还是Promise对象
                        //如果是普通值 直接调用resolve
                        //如果是promise对象 查看promise对象返回的结果
                        //再根据promise对象返回的结果 决定调用resolve还是reject
                        // resolve(result);
                        //需要等待同步代码执行完毕拿到p在执行
                        this.resolvePromise(p, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            } else if (this.status == REJECTED) {
                setTimeout(() => {
                    try {
                        //拿到回调函数的返回值
                        let result = onRejected(this.error);
                        this.resolvePromise(p, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            } else {
                //由于异步代码没有立即执行 先存储回调 等异步代码执行完成后再执行回调
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            //拿到回调函数的返回值
                            let result = onFulfilled(this.value);
                            this.resolvePromise(p, result, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            //拿到回调函数的返回值
                            let result = onRejected(this.error);
                            this.resolvePromise(p, result, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return p;
    }
    resolvePromise(p, result, resolve, reject) {
        if (p === result) {
            return reject(new TypeError('TypeError: Chaining cycle detected for'));
        }
        if (result instanceof MyPromise) {
            //Promise对象 把新的Promise对象的值传递下去
            result.then(resolve, reject);
        } else {
            //普通值
            resolve(result);
        }
    }
    static all(array) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value;
                index++;
                if (index === array.length) {
                    //需要等待异步操作完成再调用resolve
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let cur = array[i];
                if (cur instanceof MyPromise) {
                    cur.then((value) => {
                        addData(i, value);
                    }, (err) => {
                        reject(err);
                    });
                } else {
                    addData(i, cur);
                }
            }
        });
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve, reject) => {
            resolve(value);
        });
    }
    static reject(error){
        return new MyPromise((resolve,reject)=>{
            reject(error);
        })
    }
    finally(callback){
        return this.then(res=>{
            return MyPromise.resolve(callback()).then(()=>res);
        },err=>{
            return MyPromise.resolve(callback()).then(()=>{throw err});
        });
    }
    catch(error){
        return this.then(undefined,error);
    }
}

//
module.exports = MyPromise;
