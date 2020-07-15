const STATUS = {
    resolved: "resolved",
    reject: "rejected",
    pending: "pending"
}
class MPromise {
    //传递一个参数进来
    constructor(handle) {
        //判断handle是否是一个函数
        if (!this._isFunction(handle)) {
            throw Error("参数必须是一个函数!");
        }
        this.status = STATUS.pending;
        this.value = undefined;
        this.resolveQueue=[];
        this.rejectQueue=[];
        this.time = 0;
        //handle有两个参数是一个回调函数
        handle(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(val) {
        //判断状态 如果状态是pending就执行否则不执行
        if (this.status !== STATUS.pending) {
            return;
        }
        this.status = STATUS.resolved;
        this.value = val;
        // console.log(val);
        // console.log(this.resolveQueue);
        //主任务执行完毕 微观任务执行 异步回调给用户
        let run = ()=>{
            let cb;
            while(cb = this.resolveQueue.shift()){
                cb(val);
            }
        }
        let observer = new MutationObserver(run);
        observer.observe(document.body,{
            attributes:true
        });
        document.body.setAttribute('llb',Math.random());
    }
    _reject(val) {
         //判断状态 如果状态是pending就执行否则不执行
        if (this.status !== STATUS.pending) {
            return;
        }
        this.status = STATUS.reject;
        this.value = val;
        //主任务执行完毕 微观任务执行 异步回调给用户
        let run = ()=>{
            let cb;
            while(cb = this.rejectQueue.shift()){
                cb(val);
            }
        }
        let observer = new MutationObserver(run);
        observer.observe(document.body,{
            attributes:true
        });
        document.body.setAttribute('llb',Math.random());
    }
    _isFunction(fn) {
        return (typeof fn) === 'function';
    }
    then(onResolved,onrejected){
        //不考虑链式调用
        // if (this.status == STATUS.resolved) {
        //     onresolved(this.value);
        // }
        // if (this.status === STATUS.reject) {
        //     onrejected(this.value);
        // }
        //链式调用
        // console.log(this);
        return new MPromise((resolve,reject)=>{
            //主任务中添加 then队列
            //val就是new MPromise时调用resolve(val) 传递的值
            this.resolveQueue.push((val)=>{
                if (!this._isFunction(onResolved)) {
                    throw Error('onResolved必须是一个函数!');
                }
                //得到返回结果 注意val是val就是new MPromise时调用resolve(val) 传递的值
                //千万不要重新赋值
                let cb = onResolved && onResolved(val);
                //如果返回一个promise对象则
                if(cb instanceof MPromise){
                    return cb.then(resolve);
                }
                //返回其他值 执行resolve
                //执行this._resolve 改变this.value值 同时开启一个微任务 事件循环
                //当下一个then执行的时候就可以能拿到结果
                resolve(val);
            });
            this.rejectQueue.push((val)=>{
                onrejected && onrejected(val);
                reject(val);
            });

        });
    }
    catch(onrejected){
        return this.then(undefined,onrejected);
    }
    //结束时的回调 在宏任务中执行当微任务执行完毕就会执行宏任务
    finally(cb){
        // setTimeout(cb,this.time+=10);
        // return this;
        // return this.then(cb,cb);
    }
    static resolve(val){
        return new MPromise((resolve)=>{
            resolve(val);
        });
    }
    static reject(err){
        return new MPromise((resolve,reject)=>{
            reject(err);
        });
    }
    //执行多个promise
    static all(list){
        return new MPromise((resolve,reject)=>{
            let arr = [];
            for(let i =0;i<list.length;i++){
                list[i].then(res=>{
                    arr.push(res);
                }).catch(err=>{
                    reject(err);
                });
            }
            resolve(arr);
        })
    }

    static race(list){
        return new MPromise((resolve,reject)=>{
            for(let i =0;i<list.length;i++){
                list[i].then(res=>{
                    resolve(res);
                },err=>{
                    reject(err);
                })
            }
        });
    }
}