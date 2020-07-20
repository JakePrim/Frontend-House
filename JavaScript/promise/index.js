const MyPromise = require('./MyPromise');
const { reject } = require('async');

let promise = new MyPromise((resolve,reject)=>{
    // resolve('123');
    // reject(new Error('123'));
    // setTimeout(() => {
    // throw new Error('executor error');
    // resolve('成功');
        // reject(new Error('123'));
    // }, 2000);
    // resolve('成功');
    reject('失败');
});

promise.then().then()
.then(res=>{
    console.log('??',res);
},err=>{
    console.log(err);
})

function p1(){
    return new MyPromise((resolve,reject)=>{
        setTimeout(() => {
            resolve('p1');
        }, 2000);
    });
}

function p2(){
    return new MyPromise((resolve,reject)=>{
        // resolve('p2');
        reject('p2 error');
    })
}

MyPromise.all(['a','b',p1(),p2(),'c']).then(values=>{
    console.log(values);
});

MyPromise.resolve(100).then(res=>{console.log(res);}); 

// p2().finally(()=>{
//     console.log('finally');
//     return p1();
// }).then(res=>{
//     console.log(res);
// })

p2().then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})

// promise.then(res=>{
//     console.log(res);
//     // throw new Error('then error');
// },err=>{
//     console.log(err);
//     return 10000;
// }).then(res=>{
//     console.log('??',res);
// });

// let p1 = promise.then(res=>{
//     console.log(res);
//     // return 100;
//     return p1;
// });

// p1.then(res=>{
//     console.log(res);
// },error=>{
//     console.log(error.message);
// })

// promise.then(res=>{
//     console.log(res);
//     // return 100;
//     return other();
// }).then(res=>{
//     console.log(res);
// }); 

function other(){
    return new MyPromise((resolve,reject)=>{
        resolve('other');
    })
}


//问题
// let p = new Promise((resolve,reject)=>{
//     resolve(100);
// });

// let p1 = p.then(value=>{
//     console.log(value);
//     return p1;//报错 返回了p1被循环调用了
// });

// p1.then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);//TypeError: Chaining cycle detected for promise #<Promise>
// });

// promise.then(res=>{
//     console.log(res);
// },err=>{
//     console.log(err);
// });

var queue = [];//消息队列
var event;
//永远执行
while(true){
    //一次tick
    if (queue.length > 0) {
        //拿到队列中的下一个事件
        event = queue.shift();
        //执行事件
        try {
            event();
        } catch (e) {
            reportError(err);
        }
    }
}