import createHeading from './heading.js'//导入js文件
import './main.css'//导入css文件
import icon from './1.jpg';//导入文件资源
import footerHtml from './footer.html';//导入HTML文件 html字符串 需要使用html-loader

const heading = createHeading();

document.body.appendChild(heading);

const img = new Image();
img.src=icon;
img.addEventListener('click',()=>{
    console.log('click');
})
document.body.appendChild(img);

//借助write输出HTML 需要为HTML配置对应的loader否则webpack没有办法认识这个HTML
document.write(footerHtml);


