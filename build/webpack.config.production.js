const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.base')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


//性能相关配置
config.performance = Object.assign({}, config.performance, {hints:"error"})
config.optimization = Object.assign({}, config.optimization, {
  flagIncludedChunks: true, // 某些chunk的子chunk以一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
  occurrenceOrder: true, // 给经常使用的ids更短的值
  usedExports: true, // 确定每个模块下被使用的导出
  sideEffects: true, //识别package.json or rules sideEffects 标志
  concatenateModules: true, //尝试查找模块图中可以安全连接到单个模块中的段。
  minimize: true, //使用uglify-js压缩代码
  // 将webpack运行时生成代码打包到runtime.js
  runtimeChunk: {
    name: "runtime"
  },
  // 动态导入模块
  splitChunks: {
    chunks: "all",
    // minChunks: 1, // what means about minChunks ?
    name: "common"
    // chunks: "initial",         // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载） 
    // minSize: 0,                // 最小尺寸，默认0
    // minChunks: 1,              // 最小 chunk ，默认1
    // maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    // maxInitialRequests: 1,     // 最大初始化请求书，默认1
    // name: () => {},            // 名称，此选项课接收 function
    // cacheGroups: {                // 缓存组会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
    //   priority: "0",              // 缓存组优先级 false | object |
    //   vendor: {                   // key 为entry中定义的 入口名称
    //     chunks: "initial",        // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
    //     test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
    //     name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
    //     minSize: 0,
    //     minChunks: 1,
    //     enforce: true,
    //     reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
    //   }
    // }
  },
})

config.mode = 'production'
config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(),
  new webpack.HashedModuleIdsPlugin()
])

config.performance = {
  hints: false
};

module.exports = config