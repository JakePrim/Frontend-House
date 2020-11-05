/**
 * 负责编译模板，解析指令、差值表达式
 * 负责页面的首次渲染
 * 当数据变化后重新渲染视图
 * el:挂载点    vm：vue的实例
 * compile(el) 编译模板
 * compilerElement(node) 处理元素节点中的指令
 * compilerText(node) 处理文本节点
 * isDirective(attrName) 处理元素中的指令
 * isTextNode(node) 是否是文本节点
 * isElementNode(node) 是否是元素节点
 */
class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  /**
   * 编译模板处理文本节点和元素节点
   * @param {*} el
   */
  compile(el) {
    //遍历el中的所有节点 childNodes伪数组
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      //注意：箭头函数不会改变this的指向
      //判断节点类型
      if (this.isTextNode(node)) {
        this.compilerText(node)
      } else if (this.isElementNode(node)) {
        this.compilerElement(node)
      }
      //node节点还有子节点继续处理节点
      //判断node节点是否有子节点
      if (node.childNodes && node.childNodes.length) {
        //递归调用处理子节点
        this.compile(node)
      }
    })
  }

  /**
   * 编译元素节点 处理指令
   * @param {元素节点} node
   */
  compilerElement(node) {
    //遍历节点的属性
    //node.attributes 是一个伪数组
    Array.from(node.attributes).forEach((attr) => {
      let attrName = attr.name
      //判断属性是否是指令属性
      if (this.isDirective(attrName)) {
        //判断指令的类型v-text v-model ...
        attrName = attrName.substr(2) //指令的名字变成 text model...
        //拿到指令的值
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  /**
   * 处理所有指令
   * @param {node节点} node
   * @param {响应式数据的key} key
   * @param {指令名称} attrName
   */
  update(node, key, attrName) {
    //存储更新的方法 其匹配处理指令的方法
    let updateFn = this[attrName + 'Updater']
    //判断是否是有效的方法
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  /**??如何实现自定义指令呢？
   * 处理v-text指令
   * @param {node节点} node
   * @param {响应式数据} value
   */
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  /**
   * 处理v-model
   * @param {node节点} node
   * @param {响应式数据} value
   */
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    //实现双向绑定机制：数据发生变化更新视图；视图发生变化更新数据
    node.addEventListener('input', () => {
      //获取表单的值 对响应式数据赋值，当响应式数据发生变化会触发视图更新
      this.vm[key] = node.value
    })
  }

  /**
   * 编译文本节点，处理插值表达式
   * @param {文本节点} node
   */
  compilerText(node) {
    //定义正则匹配插值表达式{{ msg }}
    let reg = /\{\{(.+?)\}\}/
    //获取文本节点内容
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim() //获取第一个分组的内容 去掉空格
      //给文本节点重新赋值 值有Vue实例中的属性进行获取 而Vue中的实例具有响应式数据可以任务改变
      node.textContent = value.replace(reg, this.vm[key])
      //创建观察者 当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  /**
   * 判断元素的属性是否是指令
   * @param {*} attrName
   */
  isDirective(attrName) {
    //判断属性的开头是否以v-开头
    return attrName.startsWith('v-')
  }

  /**
   * 判断节点是否是文本节点
   * @param {}} node
   */
  isTextNode(node) {
    return node.nodeType === 3
  }

  /**
   * 判断节点是否是元素节点
   * @param {*} node
   */
  isElementNode(node) {
    return node.nodeType === 1
  }
}
