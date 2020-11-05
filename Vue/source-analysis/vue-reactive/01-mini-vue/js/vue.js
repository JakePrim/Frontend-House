/**
 * 模拟Vue响应式系统
 */
class Vue {
  constructor(options) {
    //new Vue实例需要初始化的数据
    //1. 通过属性保存选项的数据
    //记录初始化的参数
    this.$options = options || {}
    //记录data
    this.$data = options.data || {}
    //记录载入点 可能是选择器或者DOM对象
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el
    //2. 把data中的成员转换成getter和setter注入到Vue实例中
    this._proxyData(this.$data)
    //3. 调用observer对象，监听数据的变化
    new Observer(this.$data)
    //4. 调用compiler对象，解析指令和插值表达式
    new Compiler(this)
  }

  /**
   * 把data的属性注入到Vue实例中
   * @param data
   * @private
   */
  _proxyData(data) {
    //遍历data所有属性
    Object.keys(data).forEach((key) => {
      //把data的所有属性注入到vue实例中 注意：this就是Vue的实例
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          //当vue调用vm.key会调用data.key,而data由Observer来管理 会调用到Observer中的方法
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        },
      })
    })
  }
}
