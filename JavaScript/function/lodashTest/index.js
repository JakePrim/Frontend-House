//first last toUpper reverse each includes find findIndex
const _=require('lodash');
const array = ['jake','tom','lucy','kate'];

console.log(_.first(array));//jake 纯函数
console.log(_.last(array));//kate 纯函数
console.log(_.toUpper(_.first(array)));//JAKE 纯函数

console.log(_.reverse(array));//[ 'kate', 'lucy', 'tom', 'jake' ] 注意:内部调用的是数组的reverse 而数组的reverse 会改变原有数组不是一个纯函数的方法

const r = _.each(array,(item,index)=>{
    console.log(item,index);
});
console.log(r);

const l = _.find(array,(item)=>{
    return item === 'jake';
});
console.log(l,array);
