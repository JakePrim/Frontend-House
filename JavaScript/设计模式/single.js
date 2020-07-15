//通过导出方法的方式来实现单例模式
class Person {
    constructor(name) {
        this.name = name;
    }
}
let instance;
export default function (...arg) {
    if (instance) {
        return instance;
    }
    instance = new Person(...arg);
    return instance
}