const path = require('path');

//自动清理插件 自动清理输出目录的文件
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

//自动帮助我们生成index.html 到dist目录下面 而不在用项目目录下的index.html 因为我们在每次上线打包前都要检查bundle.js的路径是否正确
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

//通过copy-webpack-plugin 来拷贝一些文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

//去除js打包中的没有用的注释
class MyPlugin{
    apply(compiler){
        console.log('MyPlugin 启动');
        compiler.hooks.emit.tap('MyPlugin',compilation=>{
            //此次打包过程的上下文 compilation
            //assets 获取打包的文件信息
            for (const key in compilation.assets) {
                console.log(key);//key资源文件的名称
                
                //拦截.js文件
                if(key.endsWith('.js')){
                    const contents = compilation.assets[key].source();//获取文件内容
                    const withoutComments = contents.replace(/\/\*\*+\*\//g,'');
                    compilation.assets[key] = {
                        source: ()=>withoutComments,
                        size:()=>withoutComments.length
                    }
                }
            }
        })
    }
}

module.exports = {
    mode:'none',
    entry: './src/main.js',
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.png$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        limit:10 * 1024,
                    }
                }
            },
            // {
            //     test: /.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attribute: {
            //                 list: [
            //                     {
            //                         tag: 'img',
            //                         attribute: 'src',
            //                         type: 'src'
            //                     },
            //                     {
            //                         tag: 'a',
            //                         attribute: 'href',
            //                         type: 'src'
            //                     }
            //                 ]
            //             }
            //         }
            //     }
            // },
            {
                test: /.js$/,
                //exclude 表示哪些目录的.js文件不要进行babel-loader
                //include 表示哪些目录的.js文件需要进行babel-loader
                exclude: /(node_modules|bower_components)/,//注意需要添加此配置 如果不添加该配置 使用html-webpack-plugin会报错
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 新版本API 发生变化
        new CopyWebpackPlugin({
            patterns:[
                {from:'public',to:'public'}
            ]
        }),
        // 如果存在html-loader 配置会发生错误？？ why为什么呢？
        new HtmlWebpackPlugin({
            title:'Webpack plugins sample',
            meta:{
                viewport: 'width=device-width'
            },
            //设置一个模板去加载
            template:'./src/template.html'
        }),
        //输出多个页面文件 about
        new HtmlWebpackPlugin({
            filename:"about.html",//默认是index.html
            title:'Webpack plugins sample',
            meta:{
                viewport: 'width=device-width'
            },
            //设置一个模板去加载
            template:'./src/template.html'
        }),
        new MyPlugin()
    ]
}
