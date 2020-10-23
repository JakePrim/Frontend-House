const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//构建目录清理
module.exports = {
    mode: "development",
    devtool: 'source-map',//用于错误定位 可以定位到原始文件 方便调试
    devServer: {
        port: 8080,
        contentBase: "./dist",
        // 自动开启浏览器
        open: true,
        // 开启热更新
        hot: true,
        // 即使 HMR 不生效，也不去刷新整个页面(选择开启)
        hotOnly: true,
    },
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            sourceMap: false
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./template/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        })
    ]
}