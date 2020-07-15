let data = [
    {
        id: 1,
        name: '小明',
        age: 24,
        gender: '男'
    },
    {
        id: 2,
        name: '小芳',
        age: 30,
        gender: '女'
    },
    {
        id: 3,
        name: '小美',
        age: 31,
        gender: '女'
    },
    {
        id: 4,
        name: '小刚',
        age: 21,
        gender: '男'
    },
    {
        id: 5,
        name: '小琪',
        age: 18,
        gender: '女'
    }
];

let ageIndex=2;
let genderIndex=2;

/**
 * 
 * @param {Array} data 
 */
function render(data) {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach((item) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<th>${item.id}</th>
        <th>${item.name}</th>
        <th>${item.age}</th>
        <th>${item.gender}</th>`;
        tbody.appendChild(tr);
    });
}

let ageSorts = [
    data => data.sort((r1, r2) => r1.age - r2.age),
    data => data.sort((r1, r2) => r2.age - r1.age),
    data => data
];

let ages = document.querySelectorAll('.age_sort a');
ages.forEach((item, index) => {
    item.addEventListener('click', () => {
        //添加样式 首先移除所有样式
        ages.forEach((item)=>{
            item.classList.remove('active');
        });
        item.classList.add('active');
        ageIndex = index;
        //注意:data排序后会改变原有数据 使用深拷贝 ...[] 扩展操作符只能实现浅拷贝
        let res = ageSorts[index](JSON.parse(JSON.stringify(data)));
        //年龄排序完毕后 在根据性别排序
        let newData = genderSorts[genderIndex](JSON.parse(JSON.stringify(res)));
        render(newData);
    });
});

let genderSorts = [
    data => data.filter((value)=>value.gender==='男'),
    data => data.filter((value)=>value.gender==='女'),
    data => data
];

let genders = document.querySelectorAll('.gender_show a');

genders.forEach((item, index) => {
    item.addEventListener('click', () => {
        genders.forEach((item)=>{
            item.classList.remove('active');
        });
        item.classList.add('active');
        genderIndex = index;
        //注意:data排序后会改变原有数据 使用深拷贝 ...[] 扩展操作符只能实现浅拷贝
        let res = genderSorts[index](JSON.parse(JSON.stringify(data)));
        //性别排序完成后 在根据年龄排序
        let newData = ageSorts[ageIndex](JSON.parse(JSON.stringify(res)));
        render(newData);
    });
});


render(data);