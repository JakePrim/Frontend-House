const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');

module.exports={
    entry:'./src/main.js', 
    mode:'none',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    devtool: 'cheap-module-eval-source-map',//开启source-map配置
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
        })
    ]
}