import heading from './heading.js'
//导入样式
import './main.css'
//导入图片
import icon from './icon.png'

const headEle = heading();
document.body.appendChild(headEle);

//添加图片
const img = new Image();

img.src=icon;

document.body.appendChild(img);

//跨域请求
const ul = document.createElement('ul');
document.body.appendChild(ul);
fetch('/api/users')
    .then(res=>res.json())
    .then(data=>{
        data.forEach(item=>{
            const li = document.createElement('li');
            li.textContent = item.login;
            ul.appendChild(li)
        })
    })
