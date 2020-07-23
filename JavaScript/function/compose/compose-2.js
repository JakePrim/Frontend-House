/* 函数组合调试 */
//NEVER SAY DIE => never-say-die

const _ = require('lodash');
//_.split();

const split = _.curry((sep, str) => {
    return _.split(str, sep);
});

//toLower join

const join = _.curry((sep, arr) => {
    return _.join(arr, sep);
});

const log=function(v){
    console.log(v);
    return v;
}

const trace = _.curry((tag,v)=>{
    console.log(tag,v);
    return v;
});

const map = _.curry((func,arr)=>{
    return _.map(arr,func);
})

const f = _.flowRight(join('-'),trace('map'), map(_.toLower),trace('split'),split(' '));

console.log('??',f('NEVER SAY DIE'));

// const c = ['NEVER','SAY','DIE'];
// console.log(_.toLower(c));