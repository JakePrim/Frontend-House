//导入snabbdom 注意当前版本是0.7.4 和1.0以上的版本是由区别的 具体看官方文档
import { init, h, thunk } from 'snabbdom'

let patch = init([])

//h函数创建虚拟dom 第二个参数传递数组设置子元素
let vnode = h('div#container', [
  h('h1', 'hello snabbdom'),
  h('p', '这是一个p标签'),
])

let app = document.querySelector('#app')
//对比两个虚拟DOM 进行对比
let oldVnode = patch(app, vnode)

//两秒之后更新
setTimeout(() => {
  vnode = h('div#container', [h('h1', 'hello world'), h('p', 'hello p')])
  patch(oldVnode, vnode)

  //清空页面元素 -- 下面是错误的
  // patch(oldVnode, null)
  //通过创建注释节点清空页面元素
  patch(oldVnode, h('!'))
}, 2000)
