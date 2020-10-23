for(let i = 0 ;i<10;i++){
    console.log(i);
}

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getName(){
        return this.name;
    }
    getAge(){
        return this.age;
    }
}

const person = new Person('jake',28);

console.log(person.getName);
