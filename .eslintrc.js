module.exports = {
    "parser": "babel-eslint",//指定babel-eslint作为解析器
    "extends": "airbnb-base",//继承airbnb-base规范
    //指定环境
    "env": {//一个环境定义了一组预定义的全局变量
        "browser": true,
        "node": true
    },
}
