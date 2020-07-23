const obj = {name:'zce',age:18}

//注意变量冲突
const name ='tom';
//通过：起一个别名解决冲突
const {name:objName = 'jack',age}=obj;
console.log(name,age);