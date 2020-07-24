
const str = `hello es2015,this is a string`;

//支持换行

//支持嵌入变量
// const name= 'tom';
// const msg = `hey,${name} --- ${1 + 2 }===${Math.random()}`;
// console.log(msg);

//代表标签的模板字符串
const str1 = console.log`hello world`;

const name = 'tom';
const gender = true;

function myTagFunc(strings,name,gender){
    console.log(strings,name,gender);//[ 'hey,', ' is a ', '' ] tom true
    const sex = gender ? '男' : '女';
    return strings[0]+name+strings[1]+sex+strings[2];
}

const result = myTagFunc`hey,${name} is a ${gender}`;

console.log(result);

