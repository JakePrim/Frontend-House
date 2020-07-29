/* 数组类型跟flow完全一致 */

const arr1:Array<number> = [1,2,3,];

const arr2:number[] = [1,2,3,];

//---------累加
function sum(...args:number[]){
    //如果使用js就要判断参数是否为Number类型
    //ts只需要添加一个数字的类型注解即可
    return args.reduce((prev,current)=>prev + current,0);
}

// sum(1,2,3,4,'foo');

