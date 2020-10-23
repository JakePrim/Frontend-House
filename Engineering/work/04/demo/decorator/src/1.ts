console.log("Hello TypeScript");

//最少有两个参数
function log(str: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    // console.log("我装饰了方法:" + name, target, descriptor);
    let value = descriptor.value;
    descriptor.value = function (...arg) {
      console.log(str);
      let result = value(...arg);
      return result;
    };
  };
}

/**
 *
 * 相当于
 * Object.defineProperty(M,"add",{
 *  value:function(){}
 *  get(){},
 *  set(){}
 * })
 */

// function log1(target:any,name:string){

// }

class M {
  // @log1
  // ass1(a:number,b:number){
  //     return a+b;
  // }

  @log("hello")
  static add(a: number, b: number) {
    return a + b;
  }

  @log("bay")
  static sub(a: number, b: number) {
    return a - b;
  }
}

let res1 = M.add(1, 2);
console.log(res1);

let res2 = M.sub(1, 2);
console.log(res2);
