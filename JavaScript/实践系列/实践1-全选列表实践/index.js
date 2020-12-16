//模拟数据
let data = [
    {
        id: 1,
        title: "残酷月光 - 费启鸣",
        checked: true,
        collect: true
    }, {
        id: 2,
        title: "兄弟 - 艾热",
        checked: true,
        collect: false
    }, {
        id: 3,
        title: "毕生 - 夏增祥",
        checked: true,
        collect: true
    }, {
        id: 4,
        title: "公子向北去 - 李春花",
        checked: false,
        collect: false
    }, {
        id: 5,
        title: "战场 - 沙漠五子",
        checked: true,
        collect: false //是否收藏 true 收藏 false 没有收藏
    }
]

/**
 * 渲染数据
 * @param {Array} data 
 */
function render(data) {
    let list = document.querySelector('#list');
    list.innerHTML = '';
    data.forEach((item, index) => {
        let el = document.createElement('li');
        el.innerHTML = `<input type="checkbox" ${item.checked ? 'checked' : ''} />
        <span>${item.title}</span>
        ${item.collect ? '<a href="javascript:;" class="uncollect">取消收藏</a>'
                : '<a href="javascript:;" class="collect">收藏</a>'}
        <a href="javascript:;" class="remove">删除</a>`;
        list.appendChild(el);
    });
    //判断是否全部选中
    let allCheck = data.length && data.every(value => value.checked);
    document.querySelector('#all').checked = allCheck;
    initEvent();
}

/**
 * 初始化事件
 */
function initEvent() {
    let items = document.querySelectorAll('li');
    items.forEach((item, index) => {
        //添加收藏事件
        let collect = item.querySelector('.collect');
        collect && collect.addEventListener('click', function () {
            data[index].collect = true;
            render(data);
        });
        //取消收藏事件
        let uncollect = item.querySelector('.uncollect');
        uncollect && uncollect.addEventListener('click', () => {
            data[index].collect = false;
            render(data);
        });
        //添加删除事件
        let remove = item.querySelector('.remove');
        remove.addEventListener('click', () => {
            data.splice(index, 1);
            render(data);
        });
        //checkbox 点击事件
        let checkbox = item.querySelector('input');
        checkbox.addEventListener('click', () => {
            let checked = checkbox.checked;
            console.log(checked);
            data[index].checked = checked;
            render(data);
        });
    });
}

function init() {
    //全选/全不选 按钮
    let allOrCancel = document.querySelector('#all');
    allOrCancel.addEventListener('click', () => {
        let checked = allOrCancel.checked;
        data.map((value) => value.checked = checked);//通过map来转换数组内部的值
        render(data);
    });
    //删除按钮
    document.querySelector('#removeChecked').addEventListener('click', function () {
        data = data.filter(value => !value.checked);
        render(data);
    });
    //添加按钮
    document.querySelector('#add').addEventListener('click', function () {
        let info = document.querySelector('.addInfo').value;
        if (info != undefined && info !== '') {
            data.push({
                id: data.length,
                title: info,
                checked: false,
                collect: false
            });
            render(data);
            document.querySelector('.addInfo').value = '';
        }
    });
}


init();
render(data);