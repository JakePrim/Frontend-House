import { Post} from '../kkb/index';

export default class UserController {

    @Post('/login')
    public login(ctx) {
        console.log('login');
        ctx.body = '登陆';
    }

}