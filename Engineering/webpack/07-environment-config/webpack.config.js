const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports= (env,argv)=>{
    //env 环境参数 argv 其他参数
    const config = {
        entry:'./src/main.js', 
        mode:'none',
        output:{
            filename:'bundle.js',
            path:path.join(__dirname,'dist')
        },
        devtool: 'cheap-module-eval-source-map',//开启source-map配置
        devServer:{
            hotOnly:true
        },
        module:{
            rules:[
                {
                    test:/.css$/,
                    use:['style-loader','css-loader']
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
                title:'Source Map'
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    }

    //生产环境下的配置 yarn webpack --env production 
    if (env === 'production') {
        config.mode = 'production'
        config.devtool=false
        config.plugins=[
            ...config.plugins,
            new CleanWebpackPlugin()
        ]
    }

    return config
}