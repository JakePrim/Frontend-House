/* 元组类型 */
//元组：就是一个明确元素数量以及元素类型的一个类型 各个元素的类型不必要完全相同
export{}

const tuple:[number,string] = [18,''];//类型不相符 或者超出元素的数量都会报错

const [age,name] = tuple;

//元组类型现在非常常见了
//比如 entries 得到一个键值数组，键值数组就是一个元组[string,number]
//注意entries 属于ES2017的一个标准库
Object.entries({
    foo:123,
    bar:456
});