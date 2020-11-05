/**
 * Observer 数据劫持
 * 负责把data选项中的属性转换成响应式数据
 * data中的某个属性也是对象，把该属性转换成响应式数据
 * 数据变化发送通知更新视图
 */
class Observer {
  constructor(data) {
    this.walk(data)
  }
  /**
   * walk 遍历对象的所有属性
   * @param {data对象} data
   */
  walk(data) {
    //1 判断data是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    //2 遍历data对象的所有属性
    //箭头函数不会改变this的指向
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }

  /**
   * 把属性转换成get和set调用defineProperty
   * obj:目标对象
   * key:对象属性
   * val:属性值
   */
  defineReactive(obj, key, val) {
    const that = this
    //负责手机依赖并发送通知
    let dep = new Dep()
    //判断val是否是对象 如果是对象继续遍历对象属性转换成响应式数据
    this.walk(val)
    //劫持数据
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target) //收集依赖添加观察者
        //为什么要用到val 而不用obj[key]呢？ 如果使用obj[key]就会触发get方法导致死递归了
        //由于闭包不会导致val被释放掉
        return val
      },
      set(value) {
        if (value === val) {
          return
        }
        val = value
        //要判断属性重新赋值后，如果是一个对象那么就需要把对象属性进行遍历转换成响应式数据
        that.walk(value)
        //发送通知更新视图
        dep.notify()
      },
    })
  }
}
