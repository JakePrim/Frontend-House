/* Object类型 */

export{}

const foo:object = function(){}//[] {} 可以接受对象 数组 函数

//限制对象成员类型 对象的成员
const obj:{foo:number,bar:string} = {foo:123,bar:"string"};
