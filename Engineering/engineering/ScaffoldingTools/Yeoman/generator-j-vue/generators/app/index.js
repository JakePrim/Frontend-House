const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    //监听用户的输入
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: "name",
                message: "Your project name",
                default: this.appname,
            }
        ])
            .then(answers => {
                this.answers = answers;
            });
    }
    writing() {

        const templates = [
            'babel.config.js',
            'package.json',
            'postcss.config.js',
            'README.md',
            'public/favicon.ico',
            'public/index.html',
            'src/App.vue',
            'src/main.js',
            'src/router.js',
            'src/assets/logo.png',
            'src/components/HelloWorld.vue',
            'src/store/actions.js',
            'src/store/getters.js',
            'src/store/index.js',
            'src/store/mutations.js',
            'src/store/state.js',
            'src/utils/request.js',
            'src/views/About.vue',
            'src/views/Home.vue'
        ];
        templates.forEach(item=>{
            const template = this.templatePath(item);

            const outpath = this.destinationPath(item);
    
            const context = this.answers;
    
            this.fs.copyTpl(template, outpath, context);
        });
    }
}