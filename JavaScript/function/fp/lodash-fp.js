const fp = require('lodash/fp');
const _ = require('lodash');

const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '));

console.log(f('NEVER SAY DIE'));


console.log(_.map(['23','8','10'],parseInt));//23 NaN 2
//parseInt('23',0,array)
//parseInt('8',1,array)
//parseInt('10',2,array)

//parseInt(s: string, radix?: number) radix 进制所以会存在问题导致2被转换2进制了

//fp 模块就不会出现这种问题
//fp map 的函数的参数只有一个就是处理的参数
console.log(fp.map(parseInt,['23','8','10']));//23 8 10