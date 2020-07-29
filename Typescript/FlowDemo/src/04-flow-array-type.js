/* 
数组类型
@flow
*/
const arr:Array<number> = [1,2,3];//<T> 泛型

const arr2:number[] = [1,2,3,4];

//固定长度的数组
const foo:[string,number] = ['foo',123];//第一个元素必须是字符串 第二个元素是数字