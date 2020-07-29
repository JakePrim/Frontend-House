/* 隐式类型推断 */

export{}

let age = 18;//推断为了 number

// age = 'number';

let foo;//没有赋值就是any类型
//可以给任意类型的值 语法上不会报错
foo = 100;

foo = 'string';

//建议每个变量添加更直观的类型