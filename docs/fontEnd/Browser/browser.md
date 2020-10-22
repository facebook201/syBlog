# 工作原理



## 多进程架构

**我们平时接触的js主要有两个运行环境，一个是Node，一个是浏览器。平时说的JavaScript是单线程，其实说的是运行在Render 进程的 主线程上。而运行环境是多线程的，你看到的是单线程而已， 现代浏览器主要都是多进程架构**

### 进程分类

### 插件进程（Plugin process)

就是插件运行的进程，每个插件一个进程，单独隔离出是为了防止插件挂了影响用户。

### GPU 进程（GPU process）

负责UI界面渲染

### 网络进程（Network process）

负责网络资源加载

### 浏览器主进程（Browser process）

负责除了Tab标签页外的所有进程，包括界面展示，用户交互，子进程管理，文件存取等。

### 渲染进程 (Renderer process）

主要负责将 HTML, CSS, JavaScript 转换为用户可交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 就运行在渲染进程，默认每个 tab 一个渲染进程（特殊情况下面的进程模式会讲）。

![border](https://pic2.zhimg.com/v2-12dcfec1e4e079c89be0c5fd086c53e5_b.jpg)



### 进程的四种模式

Chromium 提供了四种进程模式，不同的进程模式会对 tab 进程做不同的处理，比如采用某个模式况会给 tab 分配新进程，而采用另外一个模式则不会，下面是四种模式的介绍，Chrome 默认采用第一个模式

- **Process-per-site-instance** (default) - 同一个 **site-instance** 使用一个进程
- **Process-per-site -** 同一个 **site** 使用一个进程
- **Process-per-tab -** 每个 tab 使用一个进程
- **Single process -** 所有 tab 共用一个进程

**Process-per-site-instance** 是最重要的，因为这个是 Chrome 默认使用的模式，也就是几乎所有的用户都在用的模式。当你打开一个 tab 访问 [https://a.baidu.com](https://link.zhihu.com/?target=https%3A//a.baidu.com)，然后再打开一个 tab 访问 [https://b.baidu.com](https://link.zhihu.com/?target=https%3A//b.baidu.com)，这两个 tab 会使用**两个进程**。如果 [https://b.baidu.com](https://link.zhihu.com/?target=https%3A//b.baidu.com) 是通过 [https://a.baidu.com](https://link.zhihu.com/?target=https%3A//a.baidu.com) 页面的 JavaScript 代码打开的，这两个 tab 会使用**同一个进程**，比如下图的例子，可以看到两个 tab 的 processId 是相同的。

同一个进程的多个线程是共享内存的。所以当两个 tab 使用同一个进程的时候，这两个 tab 就是“通的”。比如 A 页面使用 JavaScript 打开 B 页面，那么 B 页面可以通过 `window.opener` 访问 A 页面的 `window` 对象。



### 面向服务的架构

![border](https://pic1.zhimg.com/v2-0ad8ab7b2df126d9ba4c08e627bdcbda_b.webp)



所以开了一个Tab，最少有四个进程。

* 浏览器进程
* GPU进程
* 插件进程
* 渲染进程
  * 主线程：运行JavaScript、DOM、CSS、样式布局计算
  * 工作线程 运行 Web Worker、Service Worker
  * 合成线程 将图层分层 并发送绘制命令给浏览器进程





### 渲染的过程



![border]()

### requestAnimationFrame

这是一个特殊的异步任务，注册的方法不会加入到Task队列。而是加载到渲染的队列中，在渲染的三个步骤之前执行，处理渲染相关的工作。

```javascript
box.style.transform = 'translateX(1000px)'
box.style.tranition = 'transform 1s ease'
```



```js
const b1 = document.body.querySelector('.ball1');
  const b2 = document.body.querySelector('.ball2');

  let i = 0;
  let j = 0

  function moveBoxTenPixel(box) {
    box.style.transform = `translateX(${i * 1}px)`;
    i++;
  }

  function moveBoxTenPixel2(box) {
    box.style.transform = `translateX(${j * 1}px)`;
    j++;
  }

  function moveBall() {
    moveBoxTenPixel(b1);
    setTimeout(moveBall, 0);
  }
  // moveBall();

  function moveBall2() {
    moveBoxTenPixel2(b2);
    requestAnimationFrame(moveBall2);
  }
  // moveBall2();
```

上面的代码执行之后就会发现setTImeout要比animation快的多。

那如果我们使用setTimeout 处理动画和此API有什么不同呢。**setTimeout 每次运行结束时都把自己添加到task 队列。（不是每次执行队列都会进入到渲染循环中），所以渲染部分下一部分会更新很多像素 而不是1px。requestAnimationFrame 只在渲染过程之前运行，严格遵守执行一次渲染一次。**



### Microtasks 

微任务队列，Microtasks 就是在 **当次** 事件循环的 **结尾 立刻执行** 的任务。`Promise.then()` 内部的代码就属于 microtasks。相对而言，之前的异步队列 (Task queue) 就叫做 macrotasks，不过一般还是简称为 tasks。加上requestAnimationFrame队列目前共有三个

- Tasks (in `setTimeout`)
- Animation callbacks (in `requestAnimationFrame`)
- Microtasks (in `Promise.then`)



### 事件循环 Event Loop

[WHATWG](http://link.zhihu.com/?target=https%3A//html.spec.whatwg.org/multipage/webappapis.html%23event-loops) 规范中定义了事件循环，

1、从task队列中取最老的一个task，执行它（如果没有任务队列，直接跳到微任务步骤）；

2、**Microtasks**：执行microtasks任务**[检查点](http://link.zhihu.com/?target=https%3A//html.spec.whatwg.org/multipage/webappapis.html%23perform-a-microtask-checkpoint)**；

3、**Update the rendering**更新渲染

4、判断是否启动**[空闲时间算法](http://link.zhihu.com/?target=https%3A//w3c.github.io/requestidlecallback/%23start-an-idle-period-algorithm)**

5、event loop 重复执行



![border](https://pic3.zhimg.com/80/v2-625308b43e94d35a9a1367cc5ebafe2e_1440w.jpg)



常见的Task任务有：`事件回调`、`XHR回调`、`定时器`。其中setTimeout是多少毫秒**推入task队列**。







### 页面死的几种情况

* Maximum call stack size exceeded 调用栈溢出。典型的 JS stack 溢出了。一般出现递归 没有返回

* 页面卡死 主线程任务队列 比如微任务一直执行，导致task 任务队列没有机会执行 卡死 其他IO设备没有反应 页面无法渲染

  [卡顿监控](https://zhuanlan.zhihu.com/p/39292837)

* 页面直接崩溃 可能是插件问题，被攻击 防火墙等问题

  [崩溃监控](https://link.zhihu.com/?target=http%3A//jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/)

页面卡顿是暂时响应比较慢，JS 可能无法**及时执行**，崩溃就是完全看不了 页面不显示。

::: tip

1、**setTimeout 不卡死是因为它被推到任务队列，会循环调用，不会阻塞页面渲染，页面会固定时间段去渲染，（前提是js不会阻塞它）。**

2、**微任务如果一直循环执行，会导致任务队列无法执行或相应其他的任务，比如I/O、渲染等。所以会卡死**

:::





### 意外代码

```js
button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('microtask 1'))
  console.log('listener 1')
})

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('microtask 2'))
  console.log('listener 2')
})
```

用户直接点击的时候，浏览器先后触发 2 个 listener。第一个 listener 触发完成 (`listener 1`) 之后，队列空了，就先打印了 microtask 1。然后再执行下一个 listener。**重点在于浏览器并不实现知道有几个 listener，因此它发现一个执行一个，执行完了再看后面还有没有。**
 

 而使用 `button.click()` 时，浏览器的内部实现是把 2 个 listener 都同步执行。因此 `listener 1` 之后，执行队列还没空，还要继续执行 "listener 2" 之后才行。所以 listener 2 会早于 microtask 1。**重点在于浏览器的内部实现，`click` 方法会先采集有哪些 listener，再依次触发。**







## 消息队列和事件循环



## V8怎么实现异步编程

