const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/main.js',
    mode:'none',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    devServer:{
        // 设置webpack-dev-server 可以访问的文件
        contentBase:[path.join(__dirname,'dist'),'./public'],
        proxy:{//开发阶段代理服务配置
            '/api':{
                //http://localhost:8080/api/users => https://api.github.com/api/users
                target:'https://api.github.com',
                pathRewrite:{
                    '^/api':''
                },
                secure:false,//?? 不加上就无法请求了
                //不能使用localhost:8080作为请求Github的主机名 changeOrigin true=>实际以代理的请求去请求服务器
                changeOrigin:true, 
            },//代理请求前缀
        }
    },
    module:{
        rules:[
            { 
                test:/.css$/,
                use:[
                    'style-loader',//然后添加到style标签上
                    'css-loader',//先编译css文件
                ]
            },
            {
                test:/.png$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10 * 1024
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'Webpack dev server',
            template:'./src/index.html',
            meta:{
                viewport:'width=device-width'
            }
        })
        //copy-webpack-plugin 在开发阶段最好不要使用 文件的读写开销比较大
    ]
}