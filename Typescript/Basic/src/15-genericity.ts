/* 泛型 */

export{}

function crateNumberArray(len:number,value:number):number[]{
    //<number> 存放number类型的数据
    const arr = new Array<number>(len).fill(value);
    return arr;
}

const res = crateNumberArray(3,100);
//res => [100,100,100]

//创建string类型的数据
function crateStringArray(len:number,value:string):string[]{
    //<number> 存放number类型的数据
    const arr = new Array<string>(len).fill(value);
    return arr;
}

//通过泛型解决上述代码中的冗余部分

function createArray<T>(len:number,value:T):T[]{
    const arr = new Array<T>(len).fill(value);
    return arr;
}

createArray<number>(1,100);
createArray<string>(10,'10');