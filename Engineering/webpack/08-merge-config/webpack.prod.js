const common = require('./webpack.common')
const {merge} = require('webpack-merge')

//合并配置 覆盖前一个对象的同名属性，但是plugins数组要在原有的基础上添加插件,需要webpack-merge可以实现，而js的Object.
//yarn webpack --config webpack.prod.js
module.exports=merge(common,{
    mode:'production',
    // plugins:[
        
    // ]
})