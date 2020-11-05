/**
 * 收集依赖。通知更新视图
 * 为每一个响应式数据添加依赖
 */
class Dep {
  constructor() {
    this.subs = []
  }
  /**
   * 收集依赖
   * @param {观察者} sub
   */
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  /**
   * 发送更新
   */
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
