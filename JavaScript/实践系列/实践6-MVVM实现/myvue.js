class MyVue extends EventTarget {
    constructor(props) {
        super();
        this.$props = props;
        this._data = props.data;
        this.initData();
        this.compleat();
    }
    /**
     * 监听data属性值的变化
     */
    initData() {
        let data = this._data;
        let _this = this;
        // let dep = new Dep();
        let proxyData = new Proxy(data, {
            get(target, propKey, receiver) {
                // console.log(`getting ${propKey}`);
                // if (Dep.target) {//添加订阅者
                //     console.log('添加订阅者');
                //     dep.add(Dep.target);
                // }
                return Reflect.get(target, propKey, receiver);
            },
            set(target, propKey, value, receiver) {
                console.log(`setting ${propKey} ${value}`);
                // dep.update(value);
                let event = new CustomEvent(propKey, {
                    detail: value
                });
                _this.dispatchEvent(event);
                return Reflect.set(target, propKey, value, receiver);
            }
        });
        this._data = proxyData;
        // for (const key in data) {
        //     if (data.hasOwnProperty(key)) {
        //         let element = data[key];
        //         //每个属性都是一个发布者 他可以有多个订阅者
        //         let dep = new Dep();
        //         Object.defineProperty(data,key,{
        //             enumerable:true,
        //             configurable:true,
        //             get(){
        //                 console.log('get',Dep.target);
        //                 if(Dep.target){//添加订阅者
        //                     console.log('添加订阅者');
        //                     dep.add(Dep.target);
        //                 }
        //                 return element;
        //             },
        //             set(newValue){
        //                 console.log(newValue);
        //                 element = newValue;
        //                 //触发监听
        //                 // const event = new CustomEvent(key,{
        //                 //     detail:newValue
        //                 // });
        //                 // _this.dispatchEvent(event);
        //                 //发布者触发监听
        //                 dep.update(newValue);
        //             }
        //         });
        //     }
        // }
    }
    /**
     * 初始化
     */
    compleat() {
        //找到当前的元素
        let ele = document.querySelector(this.$props.el);
        this._initEle(ele);
    }
    _initEle(ele) {
        let el = ele.childNodes;//获取所有子节点
        //遍历el节点
        [...el].forEach((e) => {
            // console.dir(e);
            if (e.nodeType === 3) {
                //数据节点
                let content = e.textContent;
                //正则表达式截取{{ }} 文本 data中的属性名
                let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
                if (reg.test(content)) {
                    // console.log("匹配到{{}}表达式");
                    let $1 = RegExp.$1;
                    //获取data设置的$1的值
                    let rData = this._data[$1];
                    // console.log("$1", $1);
                    //将文本直接替换
                    e.textContent = e.textContent.replace(reg, rData);
                    this.addEventListener($1, (value) => {
                        // console.log("event listener",e);
                        let rData = this._data[$1];
                        e.textContent = e.textContent.replace(rData, value.detail);
                    }, false);
                    //订阅发布者信息 缺点就是一个节点是一个订阅者 如果有重复的节点 会被重复订阅
                    // new Watcher(this._data, $1, (value) => {
                    //     let reg = new RegExp(rData);
                    //     e.textContent = e.textContent.replace(reg, value);
                    // });
                }
            } else if (e.nodeType === 1) {
                //获取节点是所有属性
                // console.dir(e);
                let attrs = e.attributes;
                // console.log([...attrs]);
                [...attrs].forEach((attr) => {
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    if (attrName === 'v-text') {
                        e.textContent = this._data[attrValue];
                        //监听值的变化
                        this.addEventListener(attrValue, (value) => {
                            e.textContent = value.detail;
                        }, false);
                    } else if (attrName === 'v-model') {
                        e.value = this._data[attrValue];
                        e.addEventListener('input',(e)=>{
                            console.log(e.target);
                            //更新视图
                            this._data[attrValue] = e.target.value;
                        });
                        console.log(this);
                    } else if (attrName === 'v-html') {
                        e.innerHTML = this._data[attrValue];
                    }
                })

                //元素节点下的所有节点
                if (e.childNodes.length > 0) {
                    this._initEle(e);
                }
            }
        });
    }
}

class Dep {
    constructor() {
        this.pop = [];
    }

    add(watcher) {
        this.pop.push(watcher);
    }

    update(value) {
        this.pop.forEach((e) => {
            e.notify(value);
        });
    }
}

class Watcher {
    constructor(data, key, cb) {
        console.log(data, key, cb);
        Dep.target = this;
        data[key];
        Dep.target = null;
        this.cb = cb;
    }

    notify(value) {
        this.cb && this.cb(value);
    }
}