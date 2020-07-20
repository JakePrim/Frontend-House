//Either 函子 两者选一个

class Left {
    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new Left(value);
    }

    map(fn) {
        return this;
    }
}

class Right {
    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new Right(value);
    }

    map(fn) {
        return Right.of(fn(this._value));
    }
}

let r1 = Right.of(12)
    .map(x => x + 2);

let l1 = Left.of(12).map(x => x + 2);

console.log(r1,l1);//Right { _value: 14 }   Left { _value: 12 }

function parseJson(str){
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        //出现错误的时候 使用Left 因为相同的输入 得到相同的输出
        return Left.of({error:e.message});
    }
}

//异常情况的处理
let r = parseJson('{ "name":"zs" }');

console.log(r);//Left { _value: { error: 'Unexpected token n in JSON at position 1' } }

//正确情况下的处理
let r = parseJson('{ "name":"zs" }').map(x=>x.name.toUpperCase());//处理json将name属性转换为大写
console.log(r);//Right { _value: { name: 'zs' } }