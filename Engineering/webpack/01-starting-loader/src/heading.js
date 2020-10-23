import './heading.css';//导入css文件

function createHeading(){
    const heading = document.createElement('h1');
    heading.innerText="Hello World";
    heading.classList.add('heading');
    heading.addEventListener('click',()=>{
        alert('hello world');
    })
    return heading;
}

export default createHeading;