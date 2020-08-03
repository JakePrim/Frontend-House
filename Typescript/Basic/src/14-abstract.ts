/* 抽象类 可以包含一些方法的具体的实现 */

export{}

abstract class Anima{
    eat(foo:string):void{
        console.log(`吃${foo}`);
        
    }
    //抽象方法
    abstract run(d:number):void;
}

class Dog extends Anima{
    //实现父类的抽象方法
    run(d: number): void {
        console.log(`走:${d}`);
    }
}