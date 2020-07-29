/* 类 描述一类事物的抽象特征 ES以前函数+原型 模拟的类*/

export{}

class Person{
    //类的属性必须有初始值 或者构造函数中赋值否则会报错
    public name:string;//默认public 公有属性
    private age:number;//private 私有属性只能在类内部访问
    protected gender:boolean;//protected 保护 只有子类可以访问
    constructor(name:string ,age:number){
        //直接使用this.name 会报错 TS需要明确声明属性
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    sayHi(msg:string){
        console.log(`I am ${this.name} is age:${this.age}`);
    }
    logSay(){
        this.sayHi('你好啊');
    }
}

class Student extends Person{
    private constructor(name:string,age:number){
        super(name,age);
        console.log(this.gender);
    }
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


