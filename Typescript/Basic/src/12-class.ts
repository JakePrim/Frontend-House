/* 类 描述一类事物的抽象特征 ES6以前通过 函数+原型来模拟的类*/

export{}

class Person{
    //类的属性必须有初始值 或者构造函数中赋值否则会报错
    public name:string;//默认public 公有属性
    private age:number;//private 私有属性只能在类内部访问
    protected readonly gender:boolean;//protected 保护 只有子类可以访问
    //readonly 只读属性 通过=或者构造函数初始化就不允许再被修改了
    constructor(name:string ,age:number){
        //直接使用this.name 会报错 TS要求明确声明属性 声明的属性必须有初始值可以在=后面赋值，或者在构造函数中对他赋值
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    sayHi(msg:string){
        // this.gender = false;
        console.log(`I am ${this.name} is age:${this.age}`);
    }
    logSay(){
        this.sayHi('你好啊');
    }
}

class Student extends Person{
    //构造函数声明了private 外部就不允许尽心实例化类了
    private constructor(name:string,age:number){
        super(name,age);
        console.log(this.gender);
        //
        // this.gender = false;
    }
    //可以通过内部new实例返回交给外部调用
    static create(name:string,age:number){
        return new Student(name,age);
    }
}

const tom = new Person('tom',18);
console.log(tom.name);
// console.log(tom.gender);
// console.log(tom.age);

// const jake = new Student('jake',18);
const jake = Student.create('jake',18);


