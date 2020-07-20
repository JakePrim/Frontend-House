
// //Generator 生成器函数
// function* foo() {
//     try {
//         console.log('start');
//         const res = yield 'foo';
//         console.log(res);
//     } catch (e) {
//         console.log(e);
//     }

// }

// const generator = foo();

// const result = generator.next();

// console.log(result);

// generator.next('bar');

// generator.throw(new Error('Generator Error'));//抛出一个异常
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

function* main() {
    try{
        const users = yield ajax('./api/user.json');
        console.log(users);
        const posts = yield ajax('./api/user.json');
        console.log(posts);
    }catch(e){
        console.log(e);
    }
}
//通用的异步生成器方法
function co(generator){
    const g = generator();
    function handleResult(result){
        if(result.done) return;
        result.value.then(data=>{
            handleResult(g.next(data));
        }).catch(err=>{
            g.throw(err);
        })
    }
    handleResult(g.next());
}

// co(main);

async function  main2() {
    try{
        const users = await ajax('./api/user.json');
        console.log(users);
        const posts = await ajax('./api/user.json');
        console.log(posts);
    }catch(e){
        console.log(e);
    }
}
main2();