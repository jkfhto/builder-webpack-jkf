module.exports = {
    "parser": "babel-eslint",//指定babel-eslint作为解析器
    "extends": "airbnb",//继承airbnb规范
    //指定环境
    "env": {//一个环境定义了一组预定义的全局变量
        "browser": true,
        "node": true
    },
    "rules": {//自定义规则进行扩展
        "indent": ["error", 4]
    },
}
