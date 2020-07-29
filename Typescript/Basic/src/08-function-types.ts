/* 函数类型 */
export {};

//可选参数或者默认参数 一定在参数列表的最后
function func1(a: number, b?: number,...rest:number[]): string {
  return "func1";
}

func1(100,200);
func1(100);
// func1();

//函数表达式
//回调函数约束
const func2 : (a:number,b:number) => string =  function(a:number,b:number):string{
    return 'func2';
}