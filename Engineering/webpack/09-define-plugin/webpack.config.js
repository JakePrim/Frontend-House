const path = require('path');
const webpack = require('webpack');
module.exports={
  mode:'none',
  entry:'./src/main.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new webpack.DefinePlugin({
      BASE_API:JSON.stringify('http:www.baidu.com')
    })
  ]
}