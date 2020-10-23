import Koa from "koa";
import KoaRouter from 'koa-router';
import KKB from './kkb/index';

(async function() {
    const app = new Koa();
    const router = new KoaRouter();

    new KKB({
        controllersPath: __dirname + '/controllers/**/*.ts',
        router,
    });

    // router.get('/', fn);

    app.use( router.routes() );

    app.listen(8081, () => {
        console.log('Server is running on 8081 : http://localhost:8081')
    });
})()