/* 原始类型在TS中的应用 */

const a:string = 'foo';

const b:number = 100;//NaN Infinity

const c:boolean = true;//false

// const d:string = null;//严格模式下 不允许为null

const e:void = undefined;//严格模式下 不允许为null

const f:null = null;

const g:undefined = undefined;

//如果使用ES5标准库，而这时使用ES6的标准库新的类型会出现错误。
//解决方案一：改为ES2015标准库；
//解决方案二："lib": ["ES2015","DOM"]
const h:symbol = Symbol();

Array;

Promise;

//DOM API需要在lib中引入DOM
console.log();

//标准库就是内置对象所对应的声明