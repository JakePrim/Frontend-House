const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 模板文件的处理
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//构建目录清理
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//把CSS单独的提取到一个文件中去
module.exports = {
    mode: 'development',
    devtool:'source-map',//用于错误定位 可以定位到原始文件 方便调试
    devServer:{
        port:8081,
    },
    entry: {
        //生成key index.js
        index: "./src/index.js"
    },
    output: {
        // path 一定要是绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "[name]_[hash].[ext]",
                        //打包后的存放位置
                        outputPath: "./images",
                        //打包后的文件URL
                        publicPath: './images',
                        limit: 100
                    }
                },
            },

            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: "style-loader",
                    //     options: {}
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                            import: true,
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: 'index.html',
            title: 'hello world'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
    ]
}