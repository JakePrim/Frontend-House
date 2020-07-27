/* Class 类型 */

//传统的写法
// function Person(name){
//     this.name = name;
// }
// Person.prototype.say = function(){
//     console.log(`hi my name is ${this.name}`);
// }
// Person.t = "123";

//Class 写法
class Person{
    constructor(name){
        this.name = name;
    }
    //实例方法
    say(){
        console.log(`hi my name is ${this.name}`);
    }
    //静态方法
    static create(name){
        //注意静态方法中的this是指向调用的作用域 而不是实例的作用域
        return new Person(name);
    }
}
// const p = new Person('tom');
const p = Person.create('tom')
p.say();

//继承
class Student extends Person{
    constructor(name,number) {
        super(name);//super始终指向父类 可以调用父类的方法super.say()
        this.number = number;
    }
    hello(){
        super.say();//调用父类的方法
        console.log(`my school number is ${this.number}`);
    }
}

const s = new Student('jake',123);
s.hello();