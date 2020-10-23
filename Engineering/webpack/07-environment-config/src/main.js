import createHeading from './heading.js'
import editior from './editior.js'
import './main.css'
import icon from './icon.png'

const heading = createHeading()

document.body.appendChild(heading)

const img = new Image()
img.src = icon

document.body.appendChild(img)

const edit = editior()

document.body.appendChild(edit)

// =========== 处理依赖模块的热替换 ======================
if (module.hot) {
    let lastEdit = edit;
    module.hot.accept('./editior', () => {
        console.log("editior 模块更新了");
        //保留之前的状态
        const value = edit.value;

        document.body.removeChild(lastEdit);
        const newEditor = editior();
        newEditor.value = value;
        document.body.appendChild(newEditor);
        lastEdit = newEditor;
    })

    //图片模块热替换
    module.hot.accept('./icon.png', () => {
        img.src = icon;
    })
}

// ======================== fetch proxy api example ========================

// const ul = document.createElement('ul')
// document.body.append(ul)

// // 跨域请求，虽然 GitHub 支持 CORS，但是不是每个服务端都应该支持。
// // fetch('https://api.github.com/users')
// fetch('/api/users') // http://localhost:8080/api/users
//   .then(res => res.json())
//   .then(data => {
//     data.forEach(item => {
//       const li = document.createElement('li')
//       li.textContent = item.login
//       ul.append(li)
//     })
//   })
