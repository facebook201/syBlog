# Webpack



## Webpack打包原理



### 基本概念

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。



### 流程概括



Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。





### 流程细节

Webpack 的构建流程可以分为以下三大阶段：

1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
2. 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
3. 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

如果只执行一次构建，以上阶段将会按照顺序各执行一次。但在开启监听模式下，流程将变为如下：

![border](http://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/img/5-1%E7%9B%91%E5%90%AC%E6%A8%A1%E5%BC%8F%E7%9A%84%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B.png)





### 初始化阶段

| 事件名          | 解释                                                         |
| --------------- | ------------------------------------------------------------ |
| 初始化参数      | 从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。 这个过程中还会执行配置文件中的插件实例化语句 `new Plugin()`。 |
| 实例化 Compiler | 用上一步得到的参数初始化 Compiler 实例，Compiler 负责文件监听和启动编译。Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。 |
| 加载插件        | 依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点。同时给插件传入 compiler 实例的引用，以方便插件通过 compiler 调用 Webpack 提供的 API。 |
| environment     | 开始应用 Node.js 风格的文件系统到 compiler 对象，以方便后续的文件寻找和读取。 |
| entry-option    | 读取配置的 Entrys，为每个 Entry 实例化一个对应的 EntryPlugin，为后面该 Entry 的递归解析工作做准备。 |
| after-plugins   | 调用完所有内置的和配置的插件的 apply 方法。                  |
| after-resolvers | 根据配置初始化完 resolver，resolver 负责在文件系统中寻找指定路径的文件。 |







## 项目优化

1. 自动构建HTML，可压缩空格，可给引用的js加版本号或随机数：html-webpack-plugin

2. 处理CSS：css-loader与style-loader

3. 处理LESS：less-loade与less

4. 提取css代码到css文件中： extract-text-webpack-plugin

5. 开发环境下的服务器搭建：webpack-dev-server

6. 解析ES6代码：babel-core babel-preset-env babel-loader

7. 解析ES6新增的对象函数：babel-polyfill

8. 解析react的jsx语法：babel-preset-react

9. 转换相对路径到绝度路径：nodejs的path模块

10. 给文件加上hash值：[chunkhash],[hash]

11. 清空输出文件夹之前的输出文件：clean-webpack-plugin

12. 模块热替换：NamedModulesPlugin和HotModuleReplacementPlugin

13. 环境变量

14. 跨平台使用环境变量: cross-env

15. 处理图片路径: file-loader和html-loader

16. 图片压缩：image-webpack-loader

17. 定位源文件代码：source-map

18. 分离生产环境和开发环境的配置文件

19. webpack输出文件体积与交互关系的可视化：webpack-bundle-analyzer

    

**链接：https://www.cnblogs.com/vvjiang/p/8571983.html**



**优化链接：https://juejin.im/post/6844904071736852487#heading-14** 



### webpack-bundle-analyzer



**首先最重要的点是在于，打包之后对打包的文件进行分析，才好下手优化。**

* **安装webpack 文件体积和依赖关系可视化的图 webpack-bundle-analyzer**
* **配置好，打包之后会自动展示打包的结果**



```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  // ...
  plugins: [
    new BundleAnalyzerPlugin({ analyzerPort: 8919 })
  ],
});
```

  如果有很多公共的文件，可以提取通用的模块文件**commonsChunkPlugin**





### CommonsChunkPlugin 提取通用模块文件

所谓通用模块，就是如react，react-dom，redux，axios几乎每个页面都会应用到的js模块。

将这些js模块提取出来放到一个文件中，不仅可以缩小主文件的大小，在第一次下载的时候能并行下载，提高加载效率，更重要的是这些文件的代码几乎不会变动，那么每次打包发布后，仍然会沿用缓存，从而提高了加载效率。

而对于那些多文件入口的应用更是有效，因为在加载不同的页面时，这部分代码是公共的，直接可以从缓存中应用。这个东西不需要安装，直接修改webpack的配置文件即可：

```javascript
const webpack = require('webpack');

module.exports = {
  entry: {
    main: ['babel-polyfill', './src/app.js'],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-router-dom',
      'react-redux',
      'redux-actions',
      'axios'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'common.bundle.[chunkhash].js',
    })
  ]
}
```



### 压缩 js、CSS、图片

image-webpack-loader



### 去掉开发环境的配置

webpack中的devtool改为false，不需要热加载这类只用于开发环境的东西。对于在开发环境下才有用的东西在打包到生产环境时通通去掉。



### 提取 manifest： 公共js的hash值不要改变



webpack中的hash值时，一般都会看到[hash]和[chunkhash]两种hash值的配置。

其中hash根据每次编译的内容计算得到，所以每编译一次所有文件都会生成一个新的hash，也就完全无法利用缓存。所以我们这里用了[chunkhash]，chunkhash是根据内容来生成的，所以如果内容不改变，那么生成的hash值就不会改变。chunkhash适用于一般的情况，但是，对于我们以上的情况是不适用的。

我去改变主文件代码，然后生成的两个公共js代码的chunkhash值却改变了，它们并没有使用到主文件。



### webpack-parallel-uglify-plugin



之前常见的 UglifyJs 插件来压缩js，但是在生产环境打包的时候很慢，这时候其实在压缩代码，由于压缩 JavaScript 代码需要先把代码解析成用 Object 抽象表示的 AST 语法树，再去应用各种规则分析和处理 AST，导致这个过程计算量巨大，耗时非常多。

[ParallelUglifyPlugin](https://github.com/gdborton/webpack-parallel-uglify-plugin) 就做了这个事情。 当 Webpack 有多个 JavaScript 文件需要输出和压缩时，原本会使用 UglifyJS 去一个个挨着压缩再输出， 但是 ParallelUglifyPlugin 则会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，每个子进程其实还是通过 UglifyJS 去压缩代码，但是变成了并行执行。 所以 ParallelUglifyPlugin 能更快的完成对多个文件的压缩工作。

```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

plugins: [
  //
  new ParallelUglifyPlugin({
     // 传递给 UglifyJS 的参数 如果解压ES6 使用 uglifyES
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      },
  })
]
```



> [UglifyES](https://github.com/mishoo/UglifyJS2/tree/harmony) 是 UglifyJS 的变种，专门用于压缩 ES6 代码，它们两都出自于同一个项目，并且它们两不能同时使用。
>
> UglifyES 一般用于给比较新的 JavaScript 运行环境压缩代码，例如用于 ReactNative 的代码运行在兼容性较好的 JavaScriptCore 引擎中，为了得到更好的性能和尺寸，采用 UglifyES 压缩效果会更好。
>
> ParallelUglifyPlugin 同时内置了 UglifyJS 和 UglifyES，也就是说 ParallelUglifyPlugin 支持并行压缩 ES6 代码。

