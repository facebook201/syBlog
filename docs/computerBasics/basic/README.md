---
pageClass: getting-started
---

# HTTP

## HTTP介绍

HTTP（超文本传输协议）是应用层上的一种客户端/服务端模型的通信协议,它由请求和响应构成，且是无状态的。
* 协议
  规定了通信双方必须遵循的数据传输格式，这样通信双方按照约定的格式才能准确的通信。
* 无状态
  两次连接通信之间是没有任何关系的，每次都是一个新的连接，服务端不会记录前后的请求信息。

五层网络模型

**URL的构成**
http://www.xx.com/index.html?name=zhangsan
http: 协议
www.xx.xom: 主机
index.html: 路径
和参数

**协议内容**
请求( request )
客户端发送一个HTTP请求到服务端的格式：
- 请求行
- 请求头
- 请求体

### 响应（Response）

服务端响应客户端格式：

- 状态行
- 响应头
- 响应体


## HTTP状态码

**403 Forbidden**

该状态码表明对请求资源的访问被服务器拒绝了，资源不可用，服务器没有必要给出详细理由。如果想做说明可以在实体的主体部分对原因
进行描述。下面的403的一些原因

* IP 列入黑名单
* 一时间访问很多次网址 被拒绝
* 没有执行权限
* DNS解析错误

<br />

### GET 和 POST 的区别

HTTP最早是被用作浏览器和服务器之间交互HTML和表单的通讯协议，后来被广泛扩从到接口格式的定义。所以讨论POST 和 GET之前，要先确定是浏览器使用的还是HTTP作为接口传输协议的场景。



### 浏览器的GET 和 POST

浏览器用GET请求来获取一个html页面的静态资源， 用POST来提交一个 form表单，得到一个结果的网页。



**副作用是指对服务器上的资源做改变，搜索是无副作用的，注册是副作用的。**

**幂等指的是发送M和N次请求（两者不相同都大于1），服务器上资源的状态一致，比如注册10个和11个账号是不幂等的，对文章进行更改10次和11次是幂等的。**

**GET多用于无副作用，幂等的场景，例如搜索关键字。POST多用于副作用，不幂等的场景 例如注册**



#### GET

读取一个资源， 比如get到一个html文件，反复读取不应该对访问的数据有副作用。比如 get一下，用户就下单了，返回订单受理。没有副作用称为 **幂等** 因为GET因为是读取，就可以对GET请求的数据做缓存，这个缓存可以做到浏览器本身上 也可以做到代理上，或者做到server端（用Etag，至少可以减少带宽消耗）。



#### POST

在页面里 <form> 标签会定义一个表单，点击其中的submit元素会发出一个POST请求让服务器做一件事。这件事往往是有副作用的 不幂等的。



GET 和POST携带的数据格式也有区别。当浏览器发出一个GET请求，意味着用户自己要么在浏览器的地址输入，要么就是点击了a标签的href的url。**所以并不是GET只能用URL，而是浏览器直接发出的GET只能由一个url触发，所以GET上要在url上之外带一些参数就只能依靠url上附带queryString. 但是HTTP协议本身没有这个限制。**



 浏览器的POST请求都来自表单提交，每次提交，表单的数据被浏览器用编码到HTTP请求的Body里。浏览器发出的POST请求的Body主要有两种格式，一种是application/x-www-form-urlencoded 用来传输数据，**大概就是key=value&key1=value1这种格式，另一种是传文件，会采用form-data格式。采用后者是因为前面的那种的编码方式对于文件这种二进制的数据非常低效。**



一般说 GET请求没有body，只有url，请求数据放在url的queryString中，POST请求的数据在body中。但是这种的情况仅限于浏览器发请求的场景。



### 接口中的GET和POST

通过浏览器的Ajax api， postman之类的工具发出来的GET和POST请求。此时 GET/POST不能光用在前端和后端的交互中。尽管RPC有很多协议，但是http本身已经有大量的现成的支持工具可以使用，并且对人类很友好。容易debug。HTTP协议在微服务中的使用是相当普遍的。



当用HTTP实现接口发送请求，就没有浏览器中那么多限制，只要符合HTTP格式的就可以发。

```
<METHOD> <URL> HTTP/1.1
<Header1>:
<Header2>: 
<BODY Data....>
```

但是也不能太自由的使用，所以有了一些接口规范，REST。 GET、POST、PUT、DELETE。获取 创建 替换 删除。同时还推荐使用json格式，这样就通过看method就知道是什么意思。解析格式也得到统一了。

* Json 可以有嵌套结构
* 可以支持更丰富的数据类型 json可以直接被服务器代码映射为业务实体用起来方便
* 如果接口支持上传文件 那么还是form-data 格式更合适





###  REST里面的GET 和 POST

GET 在 资源定位符被用于获取资源或者资源列表。

```
GET http://foo.com/books
GET http://foo.com/books/:bookId
```



>REST 的 POST 和 PUT的区别，PUT的语法实际上是替换 replace。 REST规范里提到PUT的请求体应该是完整的资源，包括id在内。这样服务器就可以根据id去查找，如果存在对应的id元素，就用请求中的数据整体替换已经存在的资源，如果没有就用 把这个id对应的资源从空替换为请求数据，这个看起来就像是 创建。



> 至于到底用PUT还是POST，完全看是不是可以提前知道资源所有的数据，尤其是id。对于那些id是自动生成的场景 POST更加合适。如果提前知道某个id是什么，PUT更加合适。



### 安全性

无论是GET还是POST，都不够安全，因为HTTP本身就是明文协议。每个请求和返回的每个byte都在网络上传播。所以避免传输中数据被窃取，**必须从客户端到服务端的端对端加密，就是https。利用SSL协议协商出的密钥加密明文的http数据。这个加密的协议和HTTP协议本身相互独立。**



安全是一个很大的主题，由很多细节组成的一个完备体系。比如返回私密数据的mask，XSS，CSRF，跨域安全，前端加密，钓鱼，salt。POST和GET在安全这件事是个很小的角色。所以单独讨论没有什么意义。一般私密数据传输用 POST + body；

```javascript
POST http://foo.com/user/login

{
  "username": "duihua",
  "password" : "1230oiss"
}
```



### 编码

URL只能使用英文字母、阿拉伯数字和某些标点符号、不能使用其他文字和符号。

**GET和POST方法的编码使用的是网页的编码。例如百度是GB2321，谷歌使用的是UTF-8**

由于有很多编码，很混乱，所以JavaScript会将其都编码成 unicode字符。



#### encodeURI

对真正的URL编码的函数。着眼于对整个URL进行编码。 对应的解码函数是 decodeURI。



#### encodeURIComponent

与上面的区别是 对URL的组成部分进行个别编码，能对某些不编码的符号进行编码。对应的解码是decodeURIComponent

```javascript
encodeURIComponent('mail@example.com');
// mail%40example.com

encodeURI('mail@example.com');
// main@example.com
```





















