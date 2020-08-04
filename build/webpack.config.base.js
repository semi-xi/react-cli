const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env === 'development'
module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, '../src/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '..dist'), // output目录对应一个绝对路径
    // webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径(publicPath)。
    publicPath: '/',  // 打包后的静态资源访问路径 publicPath + 文件路径 如果是/ 则访问路径为 localhost:xxx/dist/xx/xx
    filename: '[name].js', // 输出文件名称 [id] [name] [hash]构建hash  [chunkhash]chunk hash [contenthash]内容hash，也可以是一个函数
    chunkFilename: 'chunk/[name].[chunkhash].js', // 非入口chunk文件的名称
    // chunkLoadTimeout: 120000, // chunk请求到期之前的毫秒数
    // chunkCallbackName: 'webpackChunkwebpack', // 回调函数的名称在 Web Workers 环境中 webpack 加载 chunks 时使用
    // crossOriginLoading: 'use-credentials', // 'anonymous' | 'use-credentials' 启用 cross-origin 属性 加载 chunk,target为web时生效
    // jsonpScriptType: 'module' | 'text/javascript', // 注入 DOM 中的 script 标签的 type 属性
    // jsonpFunction: 'webpackJsonp',  // 使用 JSONP 来实现按需加载模块
    // library: 'MyLibrary', // 取决于libraryTarget的值
    // libraryTarget: 'umd', // 模块暴露模式
  },
  module: {
    // 从右到左，从下到上
    rules: [
      {
        test: /\.(scss|css)$/,
        use:  [
          devMode ? MiniCssExtractPlugin.loader : 'style-loader', 
          'css-loader', 
          'postcss-loader', 
          'sass-loader'] // 解析import 以及生成到style里面
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // 配置模块如何解析
  resolve: {
    // alias: {// 路径别名
    // Utilities: path.resolve(__dirname, 'src/utilities/'),
    // Templates: path.resolve(__dirname, 'src/templates/'),
    // },
    // 尝试按顺序解析这些后缀名
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.jsx', '.json']
  },
  // 优化
  optimization: {
    //parent chunk中解决了的chunk会被删除 生产环境默认true
    removeAvailableModules:true,
    //删除空的chunks  默认就是true
    removeEmptyChunks:true,
    //合并重复的chunk 默认就是true
    mergeDuplicateChunks:true
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',// 源html文件
        filename: 'index.html', //打包后的文件名
        hash: true, //是否加上hash，默认是 false
        minify: devMode
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            html5: true,
            minifyCSS: true,
            removeComments: true,
            removeEmptyAttributes: true
          },
      cache: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "style/[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "style/[id].[hash].css"
    }),
  ]
  // mode: 'development' //  环境
}