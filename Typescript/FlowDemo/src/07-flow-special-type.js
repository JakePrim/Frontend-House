/* 
特殊类型
@flow
*/
//字面量类型 a 只能等于foo
const a:'foo'='foo';

//type 可以等于'success' | 'warning' | 'danger'
const type:'success' | 'warning' | 'danger' = 'success';

//同时还可以使用多个类型
type StringOrNumber = string | number;

const b : StringOrNumber = '12';//100

const gender:?number = 100;//? maybe类型 可以接受undefined null 