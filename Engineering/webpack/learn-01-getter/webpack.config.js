/* webpack配置 webpack是基于node环境的 */
const path = require('path');
module.exports = {
    mode:'development',//打包模式
    entry:'./src/index.js',//入口文件
    output:{
        //绝对路径
        path:path.resolve(__dirname,'dist'),
        //[name] 映射entry中的对应的key
        filename:'[name].js'
    },//输出
    module:{
        //不同的模块解析规则
        rules:[
            //
            {
                //正则匹配模块载入的规则
                test:/\.txt$/,
                use:'raw-loader',
            }
        ]
    }
}