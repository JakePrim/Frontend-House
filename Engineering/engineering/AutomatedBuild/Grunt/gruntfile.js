/* Grunt 的入口文件 用于定义一些需要Grunt自动执行的任务
    需要导出一个函数，此函数接收一个Grunt的形参，内部提供一些创建任务时可以用到的API
*/
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');
module.exports = grunt => {
    //grunt 配置选项方法 例如：压缩文件 配置压缩文件的路径
    grunt.initConfig({  
        sass:{
            options:{
                implementation:sass,
                sourceMap:true,//生成对应的映射文件
            },
            main:{//输入文件 输出文件
                files:{
                    'dist/css/main.css':'src/scss/main.scss'
                }
            }
        },
        babel:{
            options:{
                presets:['@babel/preset-env'], //将最新的ES特性加载进来
                sourceMap:true,//生成对应的映射文件
            },
            main:{
                files:{
                    'dist/js/app.js':'src/js/app.js'
                }
            }
        },
        watch: {
            js:{//监视js文件
                files:['src/js/*.js'],
                tasks:['babel'],//当监听到文件变化后执行的任务，这里当js文件变化后执行babel任务
            },
            css:{
                files:['src/scss/*.scss'],
                tasks:['sass'],//当scss文件变化后 执行sass命令转换为 css文件
            }
        },
        //简明
        fooTask:{
            bar:123
        },
        //多目标任务配置
        build:{
            options:{
                foo:'bar'
            },//任务的配置选项
            css:{
                //覆盖外部的options
                options:{
                    foo:'baz'
                }
            },//目标
            js:'2'//目标
        },
        //设置清除的目标路径
        clean:{
            temp:'temp/**'//**所有的文件
        }
    });

    //加载插件
    // grunt.loadNpmTasks('grunt-contrib-clean');//yarn grunt clean  
    //加载sass插件
    // grunt.loadNpmTasks('grunt-sass');

    //加载babel插件 减少load的操作
    loadGruntTasks(grunt);//自动加载所有的Grunt插件的任务

    //同时执行多个命令
    grunt.registerTask('default',['sass','babel','watch']);

    grunt.registerTask('fooTask',()=>{
        console.log(grunt.config('fooTask.bar'),grunt.config('fooTask'));
    });

    //注册任务
    grunt.registerTask('foo', () => {
        console.log('hello grunt~',grunt.config('fooTask'));
    });
    //可以注册多个任务 第一个参数：任务名称 第二个参数：任务描述出现在grunt --help帮助信息中
    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task~');
    });
    //默认任务 只需执行yarn grunt,而且他可以依次执行多个任务
    grunt.registerTask('default',['foo','bar']);

    //异步任务
    grunt.registerTask('async-task', () => {
        //并没有执行
        setTimeout(() => {
            console.log('async-task');
        }, 1000);
    });
    //正确的异步任务执行
    grunt.registerTask('async', function () {
        //使用this.async()得到回调函数 在异步任务执行完毕后执行这个回调函数 标识这个任务完成了
        const done = this.async();
        setTimeout(() => {
            console.log('async-task');
            done();
        }, 1000);
    });
    

    //Grunt 标记任务失败
    // grunt.registerTask('bad', () => {
    //     console.log('bad working~');
    //     return false;
    // });
    // //bar 任务不会执行了 因为bad标记任务失败了
    // grunt.registerTask('default', ['foo', 'bad', 'bar']);
    // //还可以通过yarn grunt default --force 即使任务失败也要强制执行所有任务

    // //异步任务的失败的情况
    // grunt.registerTask('bad-async',function(){
    //     const done = this.async();
    //     setTimeout(() => {
    //         console.log('bad async');
    //         done(false);
    //     }, 1000);
    // });

    // //多目标模式，可以让任务根据配置形成多个子任务
    // grunt.registerMultiTask('build',function(){
    //     console.log('build task');
    //     console.log(this.options());
    //     //获取当前执行目标
    //     console.log(`target:${this.target},data:${this.data}`);
    // });


}