const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const projectRoot = process.cwd();// 返回运行当前脚本的工作目录的路径
// 动态设置entry和htmlWebpackPlugins 实现多页面打包
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  // 获取入口文件
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  // console.log('entryFiles', entryFiles)

  // Object.keys兼容 采用基本方案entry是对象的情况
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      // 获取页面名称
      const pageName = match && match[1];
      // 设置entry
      entry[pageName] = entryFile;
      // 设置htmlWebpackPlugins
      return htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(projectRoot, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', pageName], // 需要将提取的公共代码vendors添加到chunks
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true, // 压缩内联css
            minifyJS: true, // 压缩内联js
            removeComments: false,
          },
        }),
      );
    });

  // 返回entry和htmlWebpackPlugins
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader', // 使用babel-loader解析ES6
          // 'eslint-loader'
        ],
      },
      {
        test: /\.css$/, // 解析css
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 用于加载 .css 文件，并且转换成 commonjs 对象
        ],
      },
      {
        test: /\.less$/, // 解析css
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 用于加载 .css 文件，并且转换成 commonjs 对象
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                // 自动补齐CSS3前缀
                autoprefixer({
                  overrideBrowserslist: ['last 2 version', '> 1%', 'iOS 7'],
                }),
              ],
            },
          },
          'less-loader', // less-loader ⽤用于将 less 转换成 css
          { // px 自动转换成 rem
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 一个rem等于75px
              remPrecision: 8, // px转rem小数点的位数
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 解析图片
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]', // 设置图片资源的文件指纹
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 解析字体
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]', // 设置字体资源的文件指纹
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 将css资源提取到一个独立的文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css', // 设置css资源的文件指纹
    }),
    // 自动清理构建目录
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(), // 优化命令⾏的构建日志
    function doneErrorPlugin() {
      this.hooks.done.tap('done', (stats) => { // this.hooks.done.tap：webpack4写法 this.plugin：webpack3写法
        // 主动捕获并处理构建错误 进行相关处理 比如错误上报等
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('- watch') === -1) {
          console.log('build error');//eslint-disable-line
          // 手动抛出错误码
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only', // 优化构建时命令行的显示日志 只在发生错误时输出
};
