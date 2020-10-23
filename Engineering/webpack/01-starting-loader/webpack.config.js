const path = require('path')
/* webpack 配置 */
module.exports={
    mode:'none',
    //指定打包入口文件路径
    entry: './src/main.js',
    //指定输出文件的路径-就是编译后的js
    output: {
        filename:'bundle.js',
        path:path.join(__dirname,'dist'),
        publicPath:'dist/'//网站的根目录 用于资源目录 否则无法找到资源文件
    },
    //添加loader配置 处理其他类型资源文件
    module:{
        rules:[
            {
                test:/.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/.css$/,//匹配文件
                use:[//配置多个loader是从后往前执行 一定要先执行css-loader
                    'style-loader', // 把css-loader编译后的结果 通过style标签的形式追加到界面上
                    'css-loader' //
                ],//该文件使用的加载器  yarn add style-loader --dev  
            },
            {
                test:/.jpg$/,
                use:['file-loader'] //文件资源加载器
            },
            {
                //Data url 的方式表示文件
                test:/.jpg$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10 * 1024 //限制10KB一下的文件交给url-loader 大于10KB的文件使用file-loader 一定要安装file-loader模块
                    }
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader',
                    options:{
                        // attrs: ['img:src','a:href']//对HTML的属性处理 此处是老版本的写法 由于新版本升级不再是这个写法了
                        //1.2.1 版本
                        //如果传递boolean True 值允许处理所有默认元素和属性，false 禁用处理所有属性。
                        //如果传递object则进行处理
                        attributes:{
                            list:[
                                {
                                    tag:'img',
                                    attribute:'src',
                                    type:'src'
                                },
                                {
                                    tag:'a',//对应的标签名
                                    attribute:'href',//对应的属性名
                                    type:'src'//对应的属性类型
                                }
                            ]
                        }
                    }
                }
            }
        ]
    }
}