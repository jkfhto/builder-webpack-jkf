const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // watch:true,//开启文件监听
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only', // 优化构建时命令行的显示日志 只在发生错误时输出
  },
  devtool: 'cheap-source-map', // 使用sourcemap
};

// 组合基础配置+开发环境配置
module.exports = merge(baseConfig, devConfig);
