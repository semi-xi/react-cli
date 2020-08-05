const webpack = require('webpack')
const open = require('open')
const config = require('./webpack.config.base')
const webpackDevServer = require('webpack-dev-server')

// 获取ip
const getIPAddress = function (){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
      var iface = interfaces[devName];
      for(var i=0;i<iface.length;i++){
          var alias = iface[i];
          if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
              return alias.address;
          }
      }
  }
}

const PORT = process.env.PORT || 8000
const HOST = getIPAddress() + ':' + PORT

// 增加自动刷新以及热更新
config.entry.main = (config.entry.main || []).concat([
  // 自动刷新
  // `webpack-dev-server/client/http://${HOST}`,
  `webpack-dev-server/client?http://localhost:${PORT}/`,
  // 配置热更新 还需要在plugins 增加webpack.HotModuleReplacementPlugin插件才可以用
  `webpack/hot/dev-server`
])


config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin()
])

config.devtool = 'eval'
config.cache = true //缓存模块, 避免在未更改时重建它们。
config.module.unsafeCache = true // 缓存已解决的依赖项, 避免重新解析它们。
config.output.pathinfo = true

// 优化这里会有问题
// config.optimization = Object.assign({}, config.optimization, {
//   providedExports:true, // 在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
//   splitChunks:false,  // 找到chunk中共享的模块,取出来生成单独的chunk
//   runtimeChunk:true, // 为webpack 运行时代码创建单独的chunk
//   noEmitOnErrors:true, // 编译错误时不写入到输出
//   namedModules:true, // 给模块有意义的名称代替ids
//   namedChunks:true // 给模chunk有意义的名称代替ids
// })


config.mode = 'development'

const compiler = webpack(config)


const server = new webpackDevServer(compiler, {
  hot: true, // 开启wbepack HMR
  quiet: true, // 启用 devServer.quiet 后，除了初始启动信息外，什么都不会写入控制台。 这也意味着来自webpack的错误或警告是不可见的
  historyApiFallback: true, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。 将 devServer.historyApiFallback 设为 true开启
  filename: config.output.filename, // 此选项可以减少在 lazy 模式中的编译操作
  publicPath: config.output.publicPath, // 捆绑的文件将在此路径下的浏览器中可用
  stats: { // 日志状态 需要彩色
    colors: true
  }
})


server.listen(PORT, 'localhost', () => {
  console.log(`server started at localhost:${PORT}`)
})


open(`http://localhost:${PORT}`)