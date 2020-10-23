
import glob from 'glob';
import KoaRouter from 'koa-router';
interface KKBOptions{
    //设置控制器目录
    controllersPath:string;
    // 路由对象
    router: KoaRouter;
}

export default class KKB {
    private options:KKBOptions;

    constructor(options){
        this.options = options;

        //加载controller文件
        this.loadController();
    }
    private loadController(){
        let controllerFiles = glob.sync(this.options.controllersPath);
        console.log('controllerFiles', controllerFiles);
        controllerFiles.forEach( controllerFile => {
            let Controller = require(controllerFile).default;
            let controller = new Controller();
            if (controller.__controllers) {
                controller.__controllers.forEach( __controller => {
                    this.options.router[__controller.verb](
                        __controller.url, 
                        controller[__controller.name]
                    );
                } );
            }
            
        } );

    } 
}

export function Get(url: string) {
    return function(target: any, name: string, descriptor: PropertyDescriptor) {
        // __controllers 存储的就是当前 target 中的所有 方法 与 对应的url
        if (!target.__controllers) {
            target.__controllers = [];
        }
        target.__controllers.push({
            verb: 'get',
            url,
            name
        });
    }
}

export function Post(url:string) {
    // 你们的代码就写在这里面，记得这里的代码要截图 - 赠小乐！
    return function(target: any, name: string, descriptor: PropertyDescriptor) {
        // __controllers 存储的就是当前 target 中的所有 方法 与 对应的url
        if (!target.__controllers) {
            target.__controllers = [];
        }
        target.__controllers.push({
            verb: 'post',
            url,
            name
        });
    }
}