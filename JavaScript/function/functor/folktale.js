const { compose, curry } = require('folktale/core/lambda');
const { toUpper, first,split,find } = require('lodash/fp');
const { task } = require('folktale/concurrency/task');
const fs = require('fs');
let f = curry(2, (x, y) => {
    return x + y;
})

console.log(f(1, 2));//3
console.log(f(1)(2));//3

//compose 函数组合

let f1 = compose(toUpper, first);

console.log(f1(['one', 'two']));//ONE

function readFile(filename) {
    return task(resolver => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                resolver.reject(err);
            }
            resolver.resolve(data);
        })
    });
}

readFile('package.json')
    .map(split('\n'))
    .map(find(x=>x.includes('version')))
    .run()//?? run有什么用？执行了什么代码呢？ 是将上述的结果返回给listen吗？
    .listen(
        {
            onRejected:err=>{
                console.log(err);
            },
            onResolved:data=>{
                console.log(data);
            }
        }
    );