# 浏览器


## URL 输入到回车发生了什么

* URL解析
* DNS解析
* TCP连接
* 处理请求
* 接受响应
* 渲染页面

### GPU渲染页面

* **当改变一个元素的尺寸位置属性时，会重新布局 绘制 以及后面所有的流程，这个称之为重排，**
* **当改变颜色属性，不会重排 但还是会触发样式计算和绘制，这个就是重绘**

**页面以每秒60帧刷新率（16ms）才不会卡顿，所以如果页面绘制和布局完成还有剩余时间，js就拿到主线程的使用权，如果js执行时间过长，就会导致下一帧js没有归还主线程给页面重绘，导致下一帧动画没有按时渲染，就会产生卡顿**

> 可以通过 requesetAnimationFrame() API 来优化 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行



## 性能

### 网络相关

* DNS域解析

### 强缓存

实现强缓存可以通过两种响应头实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，`state code` 为 200。

```bash
Expires: Wed, 22 Oct 2018 08:41:00 GMT
Cache-control: max-age=30
```

`Expires` 是 HTTP / 1.0 的产物，表示资源会在 `Wed, 22 Oct 2018 08:41:00 GMT` 后过期，需要再次请求。并且 `Expires` 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。

`Cache-Control` 出现于 HTTP / 1.1，优先级高于 `Expires` 。该属性表示资源会在 30 秒后过期，需要再次请求。

### 协商缓存

如果缓存过期了，我们就可以使用协商缓存来解决问题。协商缓存需要请求，如果缓存有效会返回 304。

协商缓存需要客户端和服务端共同实现，和强缓存一样，也有两种实现方式。

##### [#](https://yuchengkai.cn/docs/frontend/performance.html#last-modified-和-if-modified-since)Last-Modified 和 If-Modified-Since

`Last-Modified` 表示本地文件最后修改日期，`If-Modified-Since` 会将 `Last-Modified` 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。

但是如果在本地打开缓存文件，就会造成 `Last-Modified` 被修改，所以在 HTTP / 1.1 出现了 `ETag` 。

##### [#](https://yuchengkai.cn/docs/frontend/performance.html#etag-和-if-none-match)ETag 和 If-None-Match

`ETag` 类似于文件指纹，`If-None-Match` 会将当前 `ETag` 发送给服务器，询问该资源 `ETag` 是否变动，有变动的话就将新的资源发送回来。并且 `ETag` 优先级比 `Last-Modified` 高。







* HTTP / 2 多路复用，多个请求使用同一个TCP连接，极大加快了网页的加载速度

   

### 减少请求数

* JavaScript CSS 打包 压缩

* JavaScript控制图片 图片本身

* 尽量使用 SVG 替代图片

  

### 文件优化

* 减少图片的数量
* 小图片使用 base64
* 能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好
* 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替
* 照片使用 JPEG



## Webpack

#### 优化输出 压缩文件

* production 模式会自动开启代码压缩模式
* 压缩 JS  去掉无效js、日志、缩短变量名、压缩CSS 

* 开启 Tree shaking 移除没有用的代码，ES6 依赖 import export 模块化语法。**它正常工作的前提是代码必须采用ES6的模块化语法** 因为ES6模块化语法是静态的。
* 优化图片
* 按照路由拆分代码 实现按需加载
* 给打包出来的文件名添加哈希，实现浏览器缓存文件



### 分析工具

**webpack-bundle-analyzer**

可视化分析工具，比Webapck Analyse更直观。使用也很简单：

1. npm  i -g webpack-bundle-analyzer安装到全局
2. 按照上面方法生成stats.json文件
3. 在项目根目录执行`webpack-bundle-analyzer` ，浏览器会自动打开结果分析页面。





## 安全

### XSS

> **跨网站指令码**（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程式的安全漏洞攻击，是[代码注入](https://www.wikiwand.com/zh-hans/代碼注入)的一种。它允许恶意使用者将程式码注入到网页上，其他使用者在观看网页时就会受到影响。这类攻击通常包含了 HTML 以及使用者端脚本语言。



XSS 通过修改 HTML 节点或者执行 JS 代码来攻击网站。**把常用的符号进行转义，最普遍的做法是转义输入输出的内容，对于引号，尖括号，斜杠进行转义**



### CSP

内容安全策略 ([CSP](https://developer.mozilla.org/en-US/docs/Glossary/CSP)) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 ([XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS)) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。



### CSRF

**跨站请求伪造**（英语：Cross-site request forgery），也被称为 **one-click attack** 或者 **session riding**，通常缩写为 **CSRF** 或者 **XSRF**， 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。[[1\]](https://www.wikiwand.com/zh/跨站请求伪造#citenoteRistic1) 跟[跨網站指令碼](https://www.wikiwand.com/zh/跨網站指令碼)（XSS）相比，**XSS** 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

1. Get 请求不对数据进行修改
2. 不让第三方网站访问到用户 Cookie
3. 阻止第三方网站请求接口
4. 请求时附带验证信息，比如验证码或者 token



#### [#](https://yuchengkai.cn/docs/frontend/safety.html#samesite)SameSite

可以对 Cookie 设置 `SameSite` 属性。该属性设置 Cookie 不随着跨域请求发送，该属性可以很大程度减少 CSRF 的攻击，但是该属性目前并不是所有浏览器都兼容。

#### [#](https://yuchengkai.cn/docs/frontend/safety.html#验证-referer)验证 Referer

对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。

#### [#](https://yuchengkai.cn/docs/frontend/safety.html#token)Token

服务器下发一个随机 Token（算法不能复杂），每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。



## session

服务端生成,存储于服务端的内存中,长时间不使用会过期,服务端会通过session判断请求是否来自同一个客户端

## cookie

一般也由服务端生成,存储在客户端,每次请求都会自动附上这个值

- 请求同域下的静态资源也会附上,会损耗资源

## token

服务端生成,服务端可以不做存储,也可以做存储

### 不做存储

在 token中加入用户身份识别信息,过期时间,时间戳等等内容,然后进行过加密传输给客户端,
需要身份校验的接口,服务端就判断请求头是是否附带有token,如果有取出来解密然后执行后续操作

### 做存储

生成一段不重复的加密字符串token作为key,然后存放在服务端(通常是用redis,服务端重启也不会丢失用户的登录状态)使用key-value形式,value是用户信息,然后将token(key)发给客户端



## 跨域

**默认情况下，使用 API 的 Web 应用程序只能从加载应用程序的同一个域请求 HTTP 资源。如果域名、协议、端口号有一个不一致 这个请求就是跨域请求。**

目前来看，同源策略会让三种行为受限：

- Cookie、LocalStorage 和 IndexDB 访问受限
- 无法操作跨域 DOM（常见于 iframe）
- Javascript 发起的 XHR 和 Fetch 请求受限



### 为什么存在跨域？

如果你能让其他域跨域访问你的网站，甚至是操作你的DOM 是非常不安全的，所以为了不让我们自己在网站里面的内容随便被访问，这个策略保证我们只能访问同一站点的资源。



### 服务端 CORS

HTTP 响应添加一些响应字段 Access-Control-* 来表明是否允许跨域请求，根据这些 CORS 响应字段，浏览器可以允许一些被同源策略限制的跨源响应。

* 一个字段是**必加**的，那就是 `Access-Control-Allow-Origin`。这个头字段的值指定了哪些站点被允许跨域访问资源。
* 另一个常见的响应头字段是 `Access-Control-Allow-Methods`。其指明了跨域请求所允许使用的 HTTP 方法。



### withCredentials

CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。开发者必须在AJAX请求中打开`withCredentials`属性。

如果要发送Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。





### 跨域预检请求

CORS 有两种类型的请求：简单请求和 预检请求。

**如果满足下面两个大条件就是简单请求**

（1) 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`



> **非简单请求的 CORS请求，会在正式通信之前，增加一次 域检请求 请求方法是 OPTIONS**
>
> * 浏览器会先询问服务器，当前网页所在的域名是否在服务器的许可名单中，以及可以使用哪些HTTP头信息字段，只有得到答复 才会正式开始请求。
> * 服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。
> * 如果预检响应没有检验通过，CORS 会阻止跨域访问，实际的请求永远不会被发送。预检请求是一种很好的方式，可以防止我们访问或修改那些没有启用 CORS 策略的服务器上的资源。



### 认证

一般而言，对于跨域 XHR 或 Fetch 请求，浏览器**不会**发送身份凭证信息。尽管 CORS 默认情况下不发送身份凭证，但我们可以通过添加 `Access-Control-Allow-Credentials` CORS 响应头来更改它。



如果要在跨域请求中包含 cookie 和其他授权信息，我们需要做以下操作：

- XHR 请求中将 `withCredentials` 字段设置为 `true`
- Fetch 请求中将 `credentials` 设为 `include`
- 服务器把 `Access-Control-Allow-Credentials: true` 添加到响应头中



```js
// fetch 请求
fetch('https://api.mywebsite.com/users', {
  credentials: 'include'
});

// 浏览器 XHR 请求
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// 服务器添加认证字段
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
```



## webscoket

早期为了网站长连接，传统模式使用的都是轮询来做。浏览器需要不断向服务器请求，而HTTP请求里面带的信息真正能被使用的只有一小部分，如果轮询请求会造成带宽资源的浪费。**Comet虽然可以双向通信 但是还是要反复请求。** HTML5 定义了新的协议 WebScoket协议，能更好的节省服务器资源和带宽。而且能够实时进行通信，**Websocket 使⽤ ws 或 wss 的统⼀资源标志符（URI），其中 wss 表示使⽤了 TLS 的Websocket**

WebScoket 也是基于TCP连接，默认80端口，如果是运行在TLS之上就是 443端口。

WebScoket是网络传输协议，在单个TCP连接上进行全双工通信，在应用层。标准化为 RFC 6455，后由 RFC 7936 补充规范。**允许服务端主动想客户端推送数据，浏览器只要和服务器完成一次握手，就可以创建持久化的连接，进行双向数据传输。**



### 优点

* 较少的控制开销 连接创建之后，服务端和客户端之间交换数据时，用于协议控制的数据包头部相对较小
* 更强的实时性，协议是全双工，所以服务器可以随时主动给客户端下发数据。相对于HTTP请求需要等待客户端发起请求服务端才能响应
* 保持连接性
* 更好的二进制支持，轻松处理二进制内容
* 支持扩展 可以扩展协议，实现部分自定义的子协议





## Socket

网络上两个程序通过一个双向的通信连接实现数据的交换，连接的一端称为一个 socket（套接字），因此建立网络通信连接至少要一对端口号，**socket本质上是对 TCP/IP 协议栈的封装，提供了一个针对TCP或者UDP编程的接口，并不是另一种协议。**

* 它可以实现底层通信，几乎所有的应用层都是通过 socket进行通信的
* 对TCP/IP 协议进行封装，便于应用层协议调用，属于二者之间的中间抽象层
* TCP /IP 协议中，UDP、TCP 两种协议都不同，不同参数的socket实现过程也不一样。



### ArrayBuffer

ArrayBuffer 对象表示固定长度的二进制数据缓冲区。ArrayBuffer不能直接操作，而是要**通过类数组对象或者 DataView 对象来操作**，**ArrayBuffer是一片内存，不能直接使用，需要装换可以使用的实际类型。这就是TypeArray的作用，**

> **const buffer = new ArrayBuffer(length); // length 创建的大小 字符是字节**
>
> **const typeArray = new UInt16Array(buffer)**
>
> **这里有两个几个注意的地方**
>
> * ArrayBuffer 的参数length指定的是字符大小，会根据这个参数在内存开辟多大的空间
> * TypeArray不同的类型 每个元素占用的字符数是不一样的，比如Int16Array 每个元素占两个字节，32占4个字节
> * typeArray的元素赋值，如果超过了这个字符数，超过的位会置零 如下代码

```js
const myArray = new ArrayBuffer(4);
const buffer = new Uint8Array(myArray);

buffer[0] = 32;
// 越界的值会直接切断
buffer[1] = 549; 
// 549的二进制表示 100100101 一个元素占一个字节，那么第一个1会置零 就是 00100101 => 37
console.log(buffer[1]); // 37
```









