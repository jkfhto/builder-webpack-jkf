//单元测试入口文件

const path = require('path');

//改变工作目录为template
process.chdir(path.join(__dirname, 'smoke/template'));

describe('builder-webpack test case', () => {
    require('./unit/webpack-base-test');
});