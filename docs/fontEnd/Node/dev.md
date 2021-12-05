

### 前后开发

> 前端如何搭建全栈开发环境。 React + Node

一般情况下，前端使用有一套自己的工程体系，webpack 方便我们开发、打包、进行一系列的配置。其中 webpack 有一个devServer 模块。
里面有一个 proxy 代理配置。**方便我们在除了 server A 之外，还能运行另一个 server B, 我们希望通过serverA 的相对路径来访问到 Server B上的东西。**

```javascript
// 如果你访问 http://localhost:8090/api/user 相当于访问 http://localhost:8088/api/user 
// 这样就可以 在当前项目 新建一个server文件夹 用 koa 启动一个node服务 
devServer: {
    contentBase: path.join(__dirname, "src/html"),
    prot: 8090,
    hot: true,
    proxy: {
        "/api": "http://localhost:8088",
    }
}
```



