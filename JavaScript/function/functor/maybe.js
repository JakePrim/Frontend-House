class MayBe {
    static of(value) {
        return new MayBe(value);
    }

    constructor(value) {
        this._value = value;
    }

    map(fn) {
        return this.isNoting() ? MayBe.of(null) : MayBe.of(fn(this._value));
    }

    isNoting() {
        return this._value === null || this._value === undefined;
    }
}

// let r = MayBe.of('hello world').map(x => x.toUpperCase());
// let r = MayBe.of(null).map(x => x.toUpperCase());//MayBe { _value: null }
let r = MayBe.of('hello world')
    .map(x => x.toUpperCase())
    .map(x => null)
    .map(x => x.split(' '));//MayBe { _value: null } 但是那个地方出现了问题呢？ 是无法知道的

//maybe 函子的问题


console.log(r);