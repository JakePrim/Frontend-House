/* 
函数类型
@flow
*/
//设置函数的参数类型 以及返回值类型
function s(num:number):void{
    console.log(num);
}
s(123);

function ss():number{
    return 100;
}

//回调函数的类型限制(string,number)=>void 参数类型以及返回值类型
function foo(callback:(string,number)=>void){
    callback('zce',123);
}

foo(function(name,num){
    console.log(name,num);
});