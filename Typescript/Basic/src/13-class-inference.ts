/* 类与接口 */

export{}

interface Eat{
    eat(foo:string):void
}
interface Run{
    run(distance:number):void
}

class Person implements Eat,Run{
    eat(foo:string):void{
        console.log(`优雅的进餐${foo}`);
    }
    run(distance:number):void{
        console.log(`直立行走${distance}`);
    }
}

class Animal implements Eat,Run{
    eat(foo:string):void{
        console.log(`咕噜咕噜的吃${foo}`);
    }
    run(distance:number):void{
        console.log(`爬行${distance}`);
    }
}