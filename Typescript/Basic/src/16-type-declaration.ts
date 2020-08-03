/* 类型声明 比如一般我们使用的第三方模块 没有用ts实现这时候就需要 使用模块的类型声明 */

import {camelCase} from 'lodash';

//query-string 模块里面已经包含了类型声明的模块
import qs from 'query-string';

// qs.parse();

//声明函数的类型 明确的声明函数的类型
// declare function camelCase (input:string) : string;

//npm install @types/lodash 或者安装类型声明模块

const r = camelCase('hello worle');
