//写法
// const promise = new Promise(function (resolve, reject) {
//     //只能调用两者中的一个 一旦设置了某个状态就不允许修改了
//     // resolve(100);//成功
//     reject(new Error('promise rejected'));//失败
// });

// promise.then(function (value) {
//     console.log('resolved', value);
// }, function (err) {
//     console.log('rejected', err);
// }).catch(err=>{
//     console.log("catch",err);
// });

// console.log('end');

//应用案例
function ajax(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
        xhr.send();
    });
}

// let promise2 = ajax('./api/user.json');
// let newPromise = promise2.then((res) => {
//     console.log(res);
// });
// console.log(promise2 === newPromise);//false 每一个then都返回一个新的promise对象
//then 仍然会导致回调地狱 尽量保证异步任务的扁平化

//也可以在then方法中返回一个promise对象
// ajax('./api/user.json').then(res=>{
//     console.log(111);
//     return ajax('./api/user.json');
// }).then(res=>{
//     console.log(222);
//     return 'foo';
// }).then(res=>{
//     console.log(res);
// })

// ajax('./api/user.json').then(res=>{
//     console.log('onresolved',res);
//     return ajax('/error.json');
// },err=>{
//     console.log("onRejected",err);
// });

// ajax('./api/user.json').then(res=>{
//     console.log('onresolved',res);
//     return ajax('/error.json');
// }).catch(err=>{
//     console.log("onRejected",err);
// });

// process.on('unhandledRejection',(reason,promise)=>{

// })

// Promise.resolve('foo').then(res=>{
//     console.log(res);
// });

// var promise = ajax('./api/user.json');

// var promise2 = Promise.resolve(promise);

// console.log(promise === promise2);//true

// Promise.resolve({
//     then:function(onFulfilled,onRejected){
//         onFulfilled('f00');
//     }
// }).then(res=>{
//     console.log(res);//f00
// });

// Promise.reject(new Error('rejected')).catch(err=>{
//     console.log(err);
// })

//并行执行Promise

// var promise = Promise.all([ajax('./api/user.json'),ajax('./api/user.json')]);

// promise.then(res=>{
//     console.log(res);
// })
// //都成功才会成功 有一个失败就会返回失败状态

// ajax('./api/user.json')
// .then(res=>{
//     const urls = Object.values(res);
//     console.log('??',urls);
//     const tasks = urls.map(url=>{
//         console.log(url);
//         return ajax(url);
//     });
//     console.log(tasks);
//     return Promise.all(tasks);
// }).then(res=>{
//     console.log(res);
// })

// //race 只会等待第一个结束的任务
// const request = ajax('./api/user.json');

// const timeout = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         reject(new Error('timeout'));
//     }, 500);
// });

// Promise.race([request,timeout]).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);    
// });

