/**
 * 当数据发生变化触发依赖，dep通知所有的Watcher实例更新视图
 * 自身实例化的时候往dep对象中添加
 * vm:Vue的实例
 * key:属性key
 * cb:回调函数 更新视图
 * oldValue: 数据变化之前的值
 * update:观察者更新
 */
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    //data中的属性名称
    this.key = key
    //回调函数负责更新视图
    this.cb = cb
    //把当前的watcher对象记录到Dep类的静态属性target中
    //触发get方法，在get方法中调用addSub
    Dep.target = this
    //保存老的数据 触发get方法将watcher添加到addSub中收集当前的watcher
    this.oldValue = vm[key]
    //注意添加到Dep后置为空 防止重复调用 重复添加依赖 只需要添加一次即可优化性能
    Dep.target = null
  }
  /**
   * 数据发生变化更新视图
   */
  update() {
    //获取到新的值
    let newValue = this.vm[this.key]
    //如果旧值和新值相同则不会更新视图
    if (this.oldValue === newValue) {
      return
    }
    //数据发生变化 回调函数更新视图
    this.cb && this.cb(newValue)
  }
}
