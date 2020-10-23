//作为Generator的核心入口
//需要导出一个继承自Yeoman Generator的类型
//Yeoman Generator 在工作时自动调用我们在此类型的一些生命周期方法

const Generator = require('yeoman-generator');

module.exports = class extends Generator{
    prompting(){
        //接收用户的数据 存储然后在writing中读取用户的输入信息
        return this.prompt([
            {
                type:'input',//用户输入的方式接收用户的信息
                name:'name',//得到结果的一个键
                message:'Your project name',//给用户的提示
                default:this.appname,//appname 为项目生成目录名称
            }
        ]).then(answers=>{
            //得到用户输入信息的对象 在writing中使用它
            console.log(answers);
            this.answers = answers;
        });
    }
    writing(){
        //尝试往项目目录写入文件 高度封装的fs模块
        // this.fs.write(this.destinationPath('temp.txt'),Math.random().toString());

        //加载模板 通过模板方式写入文件到目标目录
        //模板路径
        const tmpl = this.templatePath('bar.html');
        //输出目标路径
        const output = this.destinationPath('bar.html');
        //模板数据上下文
        const context = this.answers;
        //写入到项目的目录
        this.fs.copyTpl(tmpl,output,context);
    }
}