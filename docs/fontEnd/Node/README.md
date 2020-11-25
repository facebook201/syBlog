# Node 开篇

Node 给我们的印象的几个关键字 **事件驱动、非阻塞I/O、高效、轻量，是单线程且支持高并发**的脚本语言。

为什么单线程的nodejs 可以支持高并发呢？

首先抛出几个问题



> * 为什么js 能够与操作系统进行底层交互？
> * node真的是单线程的吗？
> * 单线程是怎么处理高并发的？
> * node的事件驱动是怎么实现的？





### Node架构

![border](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter1/a9e67142615f49863438cc0086b594e48984d1c9.jpeg)



* Nodejs 标准库，这里是JavaScript编写的，跟我们使用过程中直接能调用API，在源码中的lib目录
* Node  bindings 是 JavaScript与 C/C++ 沟通的关键，前者通过 bindings 调用后者，相互交换数据。（**这一层是支撑 Node.js 运行的关键，由 C/C++ 实现。**）
* V8 Google 推出的 Javascript VM，它为Javascript 提供了在非浏览器端运行的环境，它的高效是 Node.js 之所以高效的原因之一。
* **Libuv**：它为 Node.js 提供了跨平台，线程池，事件池，异步 I/O 等能力，是 Node.js 如此强大的关键。
* **C-ares**：提供了异步处理 DNS 相关的能力。
* **http_parser、OpenSSL、zlib** 等：提供包括 http 解析、SSL、数据压缩等其他的能力。





> 操作系统的互动

```js
const fs = require('fs');
// 我们的业务层
fs.open('./test.txt', 'w', (err, fd) => {
  // DOSomething
});

// Node API lib/fs.js
// https://tc39.es/ecma262/
async function open(path, flags, mode) {
  //卧槽这个 0o666 是什么
  mode = modeNum(mode, 0o666);
  path = getPathFormURL(path);

  validatePath(path);
  validateUint32(mode, 'mode');
  return new FileHandle(
    await binding.openFileHandle(pathModule.toNamespacedPath(path),
      stringToFlags(flags),
      mode,
      kUsePromises
    )
  );
}
```

当我们调用 fs.open 时，Node.js 通过 process.binding 调用 C/C++ 层面的 Open 函数，然后通过它调用 Libuv 中的具体方法 uv_fs_open，最后执行的结果通过回调的方式传回，完成流程。在 Javascript 中调用的方法，最终都会通过 process.binding 传递到 C/C++ 层面，最终由他们来执行真正的操作。Node.js 即这样与操作系统进行互动。



**单线程**

传统web 服务模型中，大多都使用多线程来解决并发的问题，因为I/O 是阻塞的，单线程就意味着用户要等待，显然这是不合理的，所以创建多个线程来响应用户的请求。

Node.js的单线程指的是主线程是“单线程”，由主要线程去按照编码顺序一步步执行程序代码，假如遇到同步代码阻塞，主线程被占用，后续的程序代码执行就会被卡住。



**阻塞/非阻塞/异步**

* 拿快递，如果没有就一直等 有了就拿走
* 如果没快递 就先去干其他事情，有了就拿走。（这里会循环来访问一下）
* 没有快递就告诉他们你的地址，有了之后他们送上来，异步回调。



阻塞和非阻塞状态都是在同步调用时产生，异步天生就是非阻塞。



**高效率的原因在于事件驱动，**

Nodejs 事件模型中，所有的I/O请求都会生成一个成功或失败的事件或其他的触发器，叫事件（event），这些I/O请求都会被放在一个等待处理的队列中，这个队列又叫事件队列。

当队列中有可以处理的事件，会按照接收他们的顺序去循环执行，直到队列为空。

如果事件队列中没有事件或者没有请求，程序会完成，否则就继续第一步。



**Node的设计中就是将耗时长的操作代理给操作系统或者多线程，这部分操作就是磁盘I/O和网络I/O。所以Node中异步非常常见，因为要将耗时的操作从主线程上脱离。但是这些I/O线程并不怎么耗费CPU。无法利用多核CPU是指Node的主线程无法利用上硬件上额外的CPU。这就需要用到cluster来在机器上启动多个Node实例，将额外的CPU也使用上。**





### 前端学习 Node 难？

其实nodejs难地方不是node API本身，而是很多其他的知识。比如下面几个问题？



* https、http、net 模块长得一样，API也差不多，他们是什么关系？
* 配置项里有一项是证书，这是个干嘛的？照着指引配好证书了，为什么浏览器会报错？
* server本地跑得好好的，怎么部署到云服务器上就访问不了，明明可以ping通，端口也启动了，为什么提示拒绝访问？

### 解析

* http为应用层模块，主要按照特定协议编解码数据；net为传输层模块，主要负责传输编码后的应用层数据；https是个综合模块（涵盖了http/tls/crypto等），主要用于确保数据安全性。
* 安全证书是PKI体系的重要一环，主要用于身份校验。本地调试用的证书如果是自己签署的话，浏览器会视为不安全并报错。

* 这种情况大概率是请求被防火墙拦截。ping走的是ICMP协议，由操作系统内核处理，能够ping通不代表TCP连接就能够建立成功









### Node 的缺陷

没有最好的语言 只有最合适的语言。

* Node性能并不好

* Web开发的性能瓶颈

* 不适合密集型CPU计算情况

* 主线程不能阻塞

  



> **语言层面处理高并发，本质上是对资源共享和互斥的解决方案，高并发的三种方式，负载均衡、单机性能、硬件提升。**
>
> * 解决单机性能先从代码层面来，90％的问题都是程序员写代码导致的问题。过去一些不好的代码习惯伴随终生，没有认真想过测试过一行代码写下去需要的时间占用的资源分别有多少，不会量化。
> * 最常见的就是用数据库扛压力，你这么干了，用什么语言都没用，因为你的性能瓶颈在数据访问上。一个sql执行3个小时，又是子查询又是循环又是视图又是分组，几百万的数据被你搞成上亿次访问，不慢才怪。
> * 其次是业务逻辑复杂 多次读一次写的场景没做好 DB设计，该合并读写没合并，循环访问数据库，该冗余数据没冗余，这些都是写代码过程中常见的问题。
> * 缓存设计不合理，命中率太低，跟没有一样。
>
> 语言本质是对服务器资源的调用，服务器的资源包含哪些？
>
> 常见的就是内存，CPU，io，带宽，数据库链接池等。如果你的tps上不去，一定是其中的某一项到了硬件的限制瓶颈。还有就是锁。就是什么都没到瓶颈，就是因为逻辑上加了锁，导致后续的访问需要等待。解决锁的问题是语言层面的区别，Erlang经典的乒乓模型演示的就是如何靠协程之前的通信告别互斥，本质上还是空间换时间的解决方案。nodejs的协程和go的协程有一些区别，主要在是否支持多核上。
>
> 





## export、module.exports

* 为何有的地方使用 require 去引用一个模块时需要加上 default？ require('xx').default
* 经常在各大UI组件引用的文档上会看到说明 import { button } from 'xx-ui' 这样会引入所有组件内容，需要添加额外的 babel 配置，比如 babel-plugin-component？
* 为什么可以使用 es6 的 import 去引用 commonjs 规范定义的模块，或者反过来也可以又是为什么？
* 我们在浏览一些 npm 下载下来的 UI 组件模块时（比如说 element-ui 的 lib 文件下），看到的都是 webpack 编译好的 js 文件，可以 使用 import 或 require 再去引用。但是我们平时编译好的 js 是无法再被其他模块 import 的，这是为什么？
* babel 在模块化的场景中充当了什么角色？以及 webpack ？哪个启到了关键作用？
* 听说 es6 还有 tree-shaking 功能，怎么才能使用这个功能？


### webpack 模块化原理



### babel 的作用

babel专门用于处理 ES6转换 ES5。webpack 跟 babel差不多，不过 webpack原生转换多做一步静态分析，使用 tree-shaking 技术。

:::tip
 babel 能提前将 ES6的 import 等模块关键字转换成 commonjs 规范，这样 webpack就无需再处理，直接运行webpack定义的 __webpack_require__ 处理
:::




:::tip exports 和 module.exports的区别
一句话来说明就是，require方能看到的只有module.exports这个对象，它是看不到exports对象的，而我们在编写模块时用到的exports对象实际上只是对module.exports的引用。
我们可以给exports上面添加属性、修改属性 但是不能直接赋值。如果直接赋值 那么两者直接就没有联系
:::

<br />





### 阻塞和非阻塞

在 Node.js 标准库中的所有 I/O 方法都提供异步版本，**非阻塞**，并且接受回调函数。某些方法也有对应的 **阻塞** 版本，名字以 `Sync` 结尾。

> "I/O" 主要指由[libuv](https://libuv.org/)支持的，与系统磁盘和网络之间的交互。 Libuv 主要是专注于异步I/O的库

### 并发和吞吐量

在Nodejs中JavaScript的执行是单线程的，因此并发性是指事件循环在完成其他工作后执行 JavaScript 回调函数的能力。任何预期以并行方式运行的代码必须让事件循环能够在非 JavaScript 操作（比如 I/O ）执行的同时继续运行。







