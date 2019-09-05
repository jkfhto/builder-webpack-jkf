const path  = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms',//超时时间
});

//改变工作目录为template
//template：冒烟测试 模板项目
process.chdir(path.join(__dirname, 'template'));

//每次构建前需要删除dist目录 使用rimraf删除dist目录
rimraf('./dist',()=>{
    //获取构建文件
    const prodConfig = require('../../lib/webpack.prod.js');
    //使用webpack运行构建 判断构建是否成功
    webpack(prodConfig, (err, stats) => {
        //构建失败
        if (err) {
            console.error(err);//打印错误
            process.exit(2);//控制台输出错误码
        }
        //打印构建成功的状态
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

        console.log('Webpack build success, begin run test.');

        //添加测试用例 判断基本功能是否正常
        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        //执行测试用例
        mocha.run();
    });
})