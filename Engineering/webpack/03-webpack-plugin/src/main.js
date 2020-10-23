import createHeading from './heading.js'
import './main.css'
import icon from './icon.png'
import { last } from 'lodash'

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)

//热更新 js模块
if (module.hot) {
    const lastElement = heading;
    module.hot.accept('./heading', () => {
        console.log('heading 模块更新了');
        document.body.remove(lastElement);
        const newElement = createHeading();
        document.body.appendChild(newElement);
    })
}

