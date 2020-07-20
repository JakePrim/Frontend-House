//Hello world => hello_world

const fp = require('lodash/fp');

const f = fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower);//函数组合不需要处理数据
//返回新的函数来处理数据
console.log(f('Hello world'));



//world wild web => W,W,W
//先切割字符串变成数组，map将数组的每一个元素转换为大写，map将数组获取数组的元素的首字母
const firstLetterToUpper = fp.flowRight(fp.join(', '),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '));

console.log(firstLetterToUpper('world wild web'));