# pages-boilerplate-grunt

## Grunt 自动化构建流程
grunt不支持并行执行任务，只能进行串行任务
线上环境：先执行清理clean -> 然后编译sass -> babel编译JS -> swig编译html模板 -> useref修改文件引入的路径 -> uglify压缩js文件 -> cssmin压缩css文件 -> htmlmin压缩html文件 -> copy 是将图片、字体已经public/**文件拷贝到dist目录下面
```javascript
    //同时执行多个命令 线上环境
    grunt.registerTask('build', ['clean', 'sass', 'babel', 'swig', 'useref', 'uglify', 'cssmin', 'htmlmin', 'copy']);
```
开发环境下不需要压缩css与js、html文件，提高构建速度
开发环境：编译sass -> babel编译JS -> swig编译html模板 -> useref修改文件引入的路径 -> copy 是将图片、字体已经public/**文件拷贝到dist目录下
```javascript
     //开发环境执行的任务
    grunt.registerTask('start', ['sass', 'babel', 'swig', 'useref', 'copy','browserSync','watch']);
```

## Getting Started

```shell
yarn / npm i 安装必要的插件
```

## Usage

```shell
$ yarn <task>
```

### e.g.

```shell
# Runs the app in development mode
$ yarn start
# Builds the app for production to the `dist` folder
$ yarn build
# Clean 'dist' folder
$ yarn clean
```

#### `yarn build` or `npm run build`

Builds the app for production to the `dist` folder. It minify source in production mode for the best performance.


## Folder Structure

```
└── my-awesome-pages ································· project root
   ├─ public ········································· static folder
   │  └─ favicon.ico ································· static file (unprocessed)
   ├─ src ············································ source folder
   │  ├─ assets ······································ assets folder
   │  │  ├─ fonts ···································· fonts folder
   │  │  │  └─ pages.ttf ····························· font file (imagemin)
   │  │  ├─ images ··································· images folder
   │  │  │  └─ logo.png ······························ image file (imagemin)
   │  │  ├─ scripts ·································· scripts folder
   │  │  │  └─ main.js ······························· script file (babel / uglify)
   │  │  └─ styles ··································· styles folder
   │  │     ├─ _variables.scss ······················· partial sass file (dont output)
   │  │     └─ main.scss ····························· entry scss file (scss / postcss)
   │  ├─ layouts ····································· layouts folder
   │  │  └─ basic.html ······························· layout file (dont output)
   │  ├─ partials ···································· partials folder
   │  │  └─ header.html ······························ partial file (dont output)
   │  ├─ about.html ·································· page file (use layout & partials)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .csscomb.json ·································· csscomb config file
   ├─ .editorconfig ·································· editor config file
   ├─ .gitignore ····································· git ignore file
   ├─ .travis.yml ···································· travis ci config file
   ├─ CHANGELOG.md ··································· repo changelog
   ├─ LICENSE ········································ repo license
   ├─ README.md ······································ repo readme
   ├─ gruntfile.js ···································· gulp tasks file
   ├─ package.json ··································· package file
   └─ yarn.lock ······································ yarn lock file
```


