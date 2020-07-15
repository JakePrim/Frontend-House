/**
 * 封装dialog组件
 */
class Dialog {
    constructor(props) {
        //默认配置
        let opts = {
            width: "30%",
            height: "250px",
            title: "测试标题",
            content: "测试内容",
            dragable: true,//是否可以拖拽
            maskable: true,//是否有遮罩
            isCancel: false,//是否有取消
            cancel:function () {  },
            success:function () {  }
        };
        //合并配置
        this.newOpts = Object.assign(opts, props);
        console.log(this.newOpts);
        this.init();
    }

    init() {
        this.createHtml();
        if (!this.newOpts.maskable) {
            //隐藏遮罩层
            this.dialogEle.querySelector('.k-wrapper').style.display = 'none';
        }
        //绑定关闭事件注意一定要用this 否则只通过document会绑定所有的k-close
        //通过事件委托来实现
        let kdialog = this.dialogEle.querySelector('.k-dialog');
        kdialog.addEventListener('click', e => {
            let className = e.target.className;
            switch (className) {
                case 'k-close':
                    this.close();
                    this.newOpts.cancel();
                    break;
                case 'k-default':
                    this.close();
                    this.newOpts.cancel();
                    break;
                case 'k-primary':
                    this.close();
                    this.newOpts.success();
                    break;
                default:
                    break;
            }
        });
    }

    createHtml() {
        let dialogEle = document.createElement('div');
        dialogEle.innerHTML = `<div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.newOpts.width};height:${this.newOpts.height}">
            <div class="k-header">
                <span class="k-title">${this.newOpts.title}</span>
                <span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.newOpts.content}</span>
            </div>
            <div class="k-footer">
                ${this.newOpts.isCancel ? '<span class="k-default">取消</span>' : ''}
                <span class="k-primary">确定</span>
            </div>
        </div>`;
        dialogEle.style.display = "none";
        this.dialogEle = dialogEle;
        //添加到body中
        document.querySelector('body').appendChild(dialogEle);
    }

    show() {
        this.dialogEle.style.display = "block";
    }

    close() {
        this.dialogEle.style.display = "none";
    }

}