// 纯函数的副作用

//不纯的函数 一旦mini的值发生了改变就会是函数变的不纯 正是对外部的依赖导致的副作用
let mini = 18;
function checkAge(age){
    return age >= mini;
}

//纯的 (硬编码 后续会通过柯里化解决)
function makeCheckAge(age){
    let mini = 18;
    return age >= mini;
}