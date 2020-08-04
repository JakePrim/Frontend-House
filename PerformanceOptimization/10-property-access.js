/* 避免属性访问方法的使用 */
function Person() {
    this.name = 'icoder';
    this.age = 18;
    this.getAge = function () {
        return this.age;
    }
}

const p1 = new Person();
//成员属性的访问函数
const a = p1.getAge();

function Person(){
    this.name = 'icoder';
    this.age = 18;
}

const p2 = new Person();
//直接访问属性
const b = p2.age;