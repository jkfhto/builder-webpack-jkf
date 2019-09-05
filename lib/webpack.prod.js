const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    // 压缩css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // 将react，react-dom分离成基础包
    // new HtmlWebpackExternalsPlugin({
    //     externals: [
    //         {
    //             module: 'react',
    //             entry: 'https://cdn.bootcss.com/react/15.6.1/react.js',
    //             global: 'React'
    //         },
    //         {
    //             module: 'react-dom',
    //             entry: 'https://cdn.bootcss.com/react/15.6.1/react-dom.js',
    //             global: 'ReactDOM'
    //         },
    //     ],
    // })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          // 将react，react-dom分离成基础包
          test: /(react|react-dom)/,
          // 分离出的基础包的名称
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          name: 'default',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

// 组合基础配置+生产环境配置
module.exports = merge(baseConfig, prodConfig);
