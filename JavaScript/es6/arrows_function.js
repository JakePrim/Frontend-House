//箭头函数 => Fira Code

//传统定义函数
function inc(number){
    return number + 1;
}

//箭头函数 没有括号 则作为结果返回
const inc = n => n + 1;
console.log(inc(100));

//多行代码 需要使用括号 并且需要些return进行返回
const inc = (n, m) => {
    console.log('inc invoked');
    return n + m;
}

const arr = [1, 2, 3, 4, 5, 6];
//过滤偶数 箭头函数使代码更加剪短易读
console.log(arr.filter(i => i % 2));

//箭头函数与this 箭头函数不会改变this的指向
//如果使用箭头函数那么箭头函数的this是什么，那么箭头函数的里面的this就是什么 不会发生改变
const person = {
    name: "tom",
    // syaHi: function () {
    //     console.log(`he,my name is ${this.name}`);//tom
    // }
    syaHi: ()=> {
        // 箭头函数与普通函数的区别 不会改变this的指向 也就是说在箭头函数外面的this是什么 函数里面this就是什么
        console.log(`he,my name is ${this.name}`);//undefined 
    },
    sayHiAsync:function(){
        // const _this = this;//借助闭包的机制 保存当前作用域的this
        // setTimeout(function() {
        //     最终会放在全局对象上调用 无法拿到当前作用域的this对象 拿到的是全局对象
        //     console.log(_this.name);//undefined
        // }, 1000);

        //还可以使用箭头函数来解决 因为箭头函数的作用域就是当前作用域的对象 不会改变this
        setTimeout(()=> {
            //最终会放在全局对象上调用 无法拿到当前作用域的对象
            console.log(this.name);//tom
        }, 1000);
        //一般需要用到闭包解决的this都可以使用箭头函数解决
    }
}

person.sayHiAsync();


