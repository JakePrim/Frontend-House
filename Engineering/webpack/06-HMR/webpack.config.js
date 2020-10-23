const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports={
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