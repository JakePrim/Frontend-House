/* 
任意类型
@flow
*/

//mixed 强类型 就可以传递任意的类型
function passMixed(value:mixed){
    //需要添加类型判断
    if (typeof value === 'number') {
        value * value;
    }
    if (typeof value === 'string') {
        value.substr(1);
    }
    
}
passMixed(200);
passMixed('100');

//any 弱类型 也可以表示任意类型 一般不推荐使用any
function passAny(value:any){
    //any可以使用任何方法 value 其实还是弱类型的
    value * value;

    value.substr(1);
}
passAny(200);
passAny('100');