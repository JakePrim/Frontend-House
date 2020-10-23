// 实现这个项目的构建任务
//yarn add load-grunt-tasks --dev  减少loadNpm的操作 自动加载插件
//yarn add grunt-babel @babel/core @babel/preset-env --dev babel编译js
//yarn add grunt-contrib-clean --dev  清除文件     
//grunt-contrib-uglify 压缩js的插件
//grunt-contrib-cssmin 压缩css文件
//grunt-contrib-htmlmin 压缩html文件
//grunt-useref 处理html文件引入文件路径的问题 grunt-contrib-concat grunt-css
//yarn add grunt-contrib-watch --dev 监视文件变化 
//npm install grunt-browser-sync --save-dev 热更新开发服务器
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');
const { data } = require('./data');
module.exports = grunt => {
    //Grunt sass 处理样式文件
    //grunt 配置选项方法 例如：压缩文件 配置压缩文件的路径
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,//生成对应的映射文件
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['assets/styles/*.scss'],
                    dest: 'dist/',
                    ext: '.css'
                }]
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env'], //将最新的ES特性加载进来
                sourceMap: true,//生成对应的映射文件
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['assets/scripts/*.js'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },
        swig: {
            options: {
                data: data,
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    dest: 'dist/',
                    src: ['**/*.html'],
                    ext: '.html',
                }]
            }
        },
        useref: {
            // specify which files contain the build blocks
            html: 'dist/**/*.html',
            // explicitly specify the temp directory you are working in
            // this is the the base of your links ( "/" )
            temp: 'dist'
        },
        uglify: {
            dist: {//任务1
                files: [{
                    expand: true,//表示分开压缩/混淆下面的每一个文件
                    cwd: 'dist',//js目录下
                    //src:'**/*.js',//所有js文件
                    src: ['assets/scripts/*.js', '!**/*.min.js'],//所有js文件,不包含某个min.js
                    //src:['**/*.js','!**/libscript/**'],//忽略文件夹
                    dest: 'dist'//输出到此目录下
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['assets/styles/*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },
        htmlmin: {                                     // Task
            dist: {
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true
                },                                 // Another target
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['dist/**/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },
        copy: {
            test: {
                files: [
                    { expand: true, cwd: 'src/assets/images/', src: ['**'], dest: 'dist/assets/images/' },
                    { expand: true, cwd: 'src/assets/fonts/', src: ['**'], dest: 'dist/assets/fonts/' },
                    { expand: true, cwd: 'public', src: ['**'], dest: 'dist/' },
                ]
            }
        },
        watch: {
            js: {//监视js文件
                files: ['src/assets/scripts/*.js'],
                tasks: ['babel'],//当监听到文件变化后执行的任务，这里当js文件变化后执行babel任务
            },
            css: {
                files: ['src/assets/styles/*.scss'],
                tasks: ['sass'],//当scss文件变化后 执行sass命令转换为 css文件
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/**/*.css',
                        'dist/*.html',
                        'dist/**/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        },
        //设置清除的目标路径
        clean: {
            dist: 'dist'//所有的文件
        }
    });
    loadGruntTasks(grunt);//自动加载所有的Grunt插件的任务

    //同时执行多个命令 线上环境
    grunt.registerTask('build', ['clean', 'sass', 'babel', 'swig', 'useref', 'uglify', 'cssmin', 'htmlmin', 'copy']);
    //执行清理任务
    grunt.registerTask('clean', ['clean']);
    //开发环境执行的任务
    grunt.registerTask('start', ['sass', 'babel', 'swig', 'useref', 'copy','browserSync','watch']);
    //开发服务器
    grunt.registerTask('serve',['browserSync','watch']);
}