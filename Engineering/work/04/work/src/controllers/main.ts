import { Get} from '../kkb/index';

export default class MainController {

    // Get 搜集（方法与url）
    @Get('/')
    public index(ctx) {
        console.log('index');
        ctx.body = 'index';
    }

    @Get('/hello')
    public hello(ctx) {
        ctx.body = 'Hello';
    }

}