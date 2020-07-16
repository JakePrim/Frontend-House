/* 
    面试题:如何判断无限层级的Object中是否存在value=1
*/

/**
 *是否在某个对象中存在某个值
 *
 * @param {*} value
 * @param {*} obj
 */
function isObjectExistValue(value, obj) {
    let arrObj = Object.entries(obj);
    console.log("isObjectExistValue -> arrObj", arrObj);
    let result = [];
    //循环取数组
    while (arrObj.length) {
        const iterator = arrObj.shift();//获取顶部元素
        if (typeof iterator[1] === 'object') {
            //如果value是一个对象则将value对象 转换为数组push进入arrObj
            arrObj.push(...Object.entries(iterator[1]));//由于entries是一个整体的数组 将数组展开添加到arrObj中
        } else if (iterator[1] === value) {
            result.push(iterator);
        }
    }
    return result;
}

//测试数据
const arr = [
    {
        a: 5,
        b: 1,
        c: 3
    },
    {
        a: 5,
        b: 1,
        c: {
            a: 5,
            b: 1,
            c: 5,
            F: {
                A: 1,
                B: 9
            }
        }
    }
];
for (const iterator of arr) {
    let res = isObjectExistValue(1,iterator);
    console.log("res", res)    
}

/* 
isObjectExistValue -> arrObj [ [ 'a', 5 ], [ 'b', 1 ], [ 'c', 3 ] ]
res [ [ 'b', 1 ] ]
isObjectExistValue -> arrObj [ [ 'a', 5 ], [ 'b', 1 ], [ 'c', { a: 5, b: 1, c: 5, F: [Object] } ] ]
res [ [ 'b', 1 ], [ 'b', 1 ], [ 'A', 1 ] ]
*/