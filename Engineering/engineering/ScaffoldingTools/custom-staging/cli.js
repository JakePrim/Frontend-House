#!/usr/bin/env node
/* Node CLI 应用入口文件必须要有一个这样的文件头 如果是Linux或者MacOS系统还需要
修改此文件的读写权限755 具体使用：chmod 755 cli.js 实现修改 */

// console.log('cli working');
//脚手架的工作过程：
//1 通过命令行交互询问用户问题 需要安装inquirer 模块 yarn add inquirer  
//2 根据用户回答的结果生成文件

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

//通过命令行交互询问用户问题
inquirer.prompt([
    {
        type:"input",
        name:'name',
        message:'Project name?'
    }
]).then(answer=>{
    // console.log(answer);
    //模板路径
    const tmplDir = path.join(__dirname,"templates");
    //目标目录
    const destDir = process.cwd();
    
    //将模板下的文件全部转换到目标目录
    fs.readdir(tmplDir,(err,files)=>{
        if (err) {
            throw err;
        }
        files.forEach(file=>{
            //通过模板引擎渲染文件  添加模板引擎模块 yarn add ejs   
            ejs.renderFile(path.join(tmplDir,file),answer,(err,result)=>{
                if (err) {
                    throw err;
                }
                // console.log(result);
                //将渲染的结果写入目标文件路径
                fs.writeFileSync(path.join(destDir,file),result);
            })  
        });
    });
});

