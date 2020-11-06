//导入snabbdom 注意当前版本是0.7.4 和1.0以上的版本是由区别的 具体看官方文档
import { init, h, thunk } from 'snabbdom'

// 1. hello world
/**
 * init:参数：数组，模块
 * 返回值:patch函数 作用：对比两个虚拟dom的差异更新到真实DOM
 */
let patch = init([])

// 创建vnode虚拟dom
// 第一个参数：标签+选择器
// 第二个参数: 如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls', 'Hello Wrold')

//获取挂载点
let app = document.querySelector('#app')
console.log(app)
/**
 * 参数1: 真实的DOM(内部会把DOM元素转换成vnode)/vnode
 * 参数2: vnode
 * 返回值vnode
 */
let oldVnode = patch(app, vnode)

/**
 * 假设 vnode更新了
 */
vnode = h('div', 'Hello Snabbdom')
//对比两个虚拟dom的差异
patch(oldVnode, vnode)
// 2. div中放置子元素 h1,p
