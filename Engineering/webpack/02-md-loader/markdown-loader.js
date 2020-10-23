const marked = require('marked');

module.exports = source => {
    console.log('??',source);
    //只能返回一个 javascript代码 / 下一个loader处理 other-loader
    // return 'console.log("hello ~")'
    const html = marked(source);
    // return `module.exports=${JSON.stringify(html)}`
    // ES Module导出
    // return `export default ${JSON.stringify(html)}`

    //返回HTML字符串 交给下一个html-loader处理
    return html
}