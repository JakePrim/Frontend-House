/* Plop日寇文件 需要导出一个函数 */

module.exports = plop=>{
    plop.setGenerator('component',{
        description:"create a component",
        prompts:[
            {
                type:'input',
                name:'name',
                message:'component name',
                default:'My Component',
            }
        ],
        actions:[
            {
                type:'add',
                path:'src/component/{{name}}/{{name}}.js',
                templateFile:'plop-templates/component.hbs',
            },
            {
                type:'add',
                path:'src/component/{{name}}/{{name}}.css',
                templateFile:'plop-templates/component.css.hbs',
            },
            {
                type:'add',
                path:'src/component/{{name}}/{{name}}.test.js',
                templateFile:'plop-templates/component.test.hbs',
            }
        ]
    });
}