import fn from './fn.js';
import image from './images/logo.png';
import css from './css/css.css';

console.log(fn);

let img = new Image();
img.src = image;

document.body.appendChild(img);

document.onclick = fn;