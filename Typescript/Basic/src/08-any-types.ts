/* 任意类型 */

export{}

function stringify(value:any){
    return JSON.stringify(value);
}

stringify('100');

stringify(100);
//any 动态类型 ts不会对他进行类型检查
let foo:any = 'string';

foo = 100;

foo.bar();