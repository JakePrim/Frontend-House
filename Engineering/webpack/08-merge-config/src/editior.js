import './editor.css'

export default ()=>{
    const el = document.createElement('textarea');
    el.classList.add('editor');
    console.log("editor");
    return el
}