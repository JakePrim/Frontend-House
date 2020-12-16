{
    let topId = 0;//顶层id

    let currentId = 0;//当前选中项的ID
    /**
     * 数据操作
     */
    /**
     * 根据id获取对应的当前项
     * @param {number} id 
     */
    function getSelf(id){
        return data.filter((item)=>id === item.id)[0];
    }

    /**
     * 获取子级
     * @param {*} pid  父级ID
     */
    function getChild(pid){
        return data.filter((item)=>pid===item.pid);
    }

    
    /**
     * 根据当前项id找到父级
     * @param {*} id 
     */
    function getParent(id){
        let item = getSelf(id);//拿到当前项
        return getSelf(item.pid);
    }

    /**
     * 获取所有父级
     * @param {*} id 
     */
    function getAllParent(id){
        let parent = getParent(id);
        let allParent = [];
        while (parent) {
            allParent.unshift(parent);
            parent = getParent(parent.id);
        }
        return allParent;
    }

    // console.log(getSelf(0));
    // console.log(getChild(0));
    // console.log(getAllParent(244444));
    
    /**视图渲染 */
    let treeMenu = document.querySelector('#tree-menu');
    let breadNav = document.querySelector('.bread-nav');
    let folders = document.querySelector('#folders');

    renderBreadNav();
    renderFolders();
    /**
     * 渲染路径导航
     */
    function renderBreadNav(){
        //获取它自己的内容
        let currentSelf = getSelf(currentId);
        //获取当前项的所有父级
        let allParent = getAllParent(currentId);
        let inner = '';
        allParent.forEach((item)=>{
            inner += `<a>${item.title}</a>`;
        });
        inner += `<span>${currentSelf.title}</span>`;
        breadNav.innerHTML = inner;
    }

    /**
     * 文件夹视图渲染
     */
    function renderFolders(){
        //拿到所有子级
        let child = getChild(currentId);
        let inner = '';
        child.forEach((item)=>{
            inner += `
            <li class="folder-item">
                <img src="img/folder-b.png" alt="">
                <span class="folder-name">${item.title}</span>
                <input type="text" class="editor" value="js程序设计">
                <label class="checked">
                    <input type="checkbox" />
                    <span class="iconfont icon-checkbox-checked"></span>
                </label>   
            </li>`;
        });
        folders.innerHTML = inner;
    }

    /**
     * 树状菜单的渲染
     */
    function renderTreeMenu(){
        
    }
}