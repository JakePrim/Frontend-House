const STATUS = {
    pending:'pending',
    resolved:'resolved',
    rejected:'rejected'
}
class TestPromise{
    constructor(handle) {
        if (!this._isFn(handle)) {
            throw Error('构造方法参数必须传入一个函数');
        }
        this.status = STATUS.pending;
        this.value = undefined;
        //resolve 队列
        this.resolveQueue = [];
        //reject 队列
        this.rejectQueue = [];
        handle(this._resolve.bind(this),this._reject.bind(this));
    }
    _isFn(fn){
        return (typeof fn) === 'function';
    }
    _resolve(val){
        //1 判断状态
        if(this.status !== STATUS.pending){
            return;
        }
        this.status = STATUS.resolved;
        this.value = val;
        //开启一个微任务
        let run = ()=>{
            let cb;
            while(cb = this.resolveQueue.shift()){
                cb && cb(val);
            }
        }
        let observer = new MutationObserver(run);
        observer.observe(document.body,{
            attributes:true
        });
        document.body.setAttribute('t',Math.random());
    }
    _reject(err){
        //1 判断状态
        if(this.status !== STATUS.pending){
            return;
        }
        this.status = STATUS.rejected;
        this.value = err;
        //开启一个微任务
        let run = ()=>{
            let cb;
            while(cb = this.rejectQueue.shift()){
                cb && cb(err);
            }
        }
        let observer = new MutationObserver(run);
        observer.observe(document.body,{
            attributes:true
        });
        document.body.setAttribute('t',Math.random());
    }
    then(resolved,rejected){
        return new TestPromise((resolve,reject)=>{
            //在主任务中将回调函数添加到队列中,待主任务结束 执行微任务时
            //在_resolve _reject 中执行回调函数并将value返回
            this.resolveQueue.push((val)=>{
                let cb = resolved && resolved(val);
                //返回对象是一个promise 则返回这个promise
                if(cb instanceof TestPromise){
                    return cb.then(resolved,resolved);
                }
                //执行resolve方法 开启一个新的微任务 可链式调用再
                //次调用then方法后 值还会返回
                resolve(val);
            });
            this.rejectQueue.push((err)=>{
                rejected && rejected(err);
                reject(err);
            });
        });
    }
    catch(err){
        return this.then(undefined,err);
    }
    finally(cb){
        //开启新的宏任务执行
        setTimeout(cb,0);
        return this;
    }

    static resolve(val){
        return new TestPromise((resolve)=>{
            resolve(val);
        });
    }

    static reject(val){
        return new TestPromise((resolve,reject)=>{
            reject(val);
        })
    }

    /**
     * 执行多个promise
     * @param {TestPromise} list 
     */
    static all(list){
        return new TestPromise((resolve,reject)=>{
            let arr = [];
            for(let i = 0;i<list.length;i++){
                list[i].then(res=>{
                    arr.push(res);
                }).catch(err=>{
                    reject(err);
                    throw Error('出现错误:'+err);
                });
            }
            resolve(arr);
        });
    }
    /**
     * 哪个执行快回调显示哪个的值
     * @param {*} list 
     */
    static race(list){
        return new TestPromise((resolve,reject)=>{
            for(let i = 0;i < list.length;i++){
                list[i].then(res=>{
                    resolve(res);
                }).catch(err=>{
                    reject(err);
                });
            }
        });
    }
}