const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode:"development",
    entry:{
        index:"./src/main.ts"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].js"
    },
    resolve:{
        extensions:[".ts",".tsx",".js"]
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader:"ts-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./template/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    devServer:{
        port:8080
    }
}