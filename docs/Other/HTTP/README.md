---
pageClass: getting-started
---

# HTTP指南

## Content-Type

Http协议的消息头中，Request Header 里面有一个Content-Type的字段表示请求中的媒体类型信息
主要说一下 application开头的媒体格式类型：

* application/xhtml+xml：XHTML格式 
* application/xml： XML数据格式
* application/atom+xml：Atom XML聚合格式    
* application/json： JSON数据格式
* application/pdf：pdf格式  
* application/msword： Word文档格式
* application/octet-stream： 二进制流数据（如常见的文件下载）
* application/x-www-form-urlencoded 默认encType 表单数据被编码为 key/value格式发送到服务器（表单默认的提交数据的格式）
* multipart/form-data 需要在表单中进行文件上传时，就需要使用该格式（例如图片上传 文本上传配和formData）

::: tip
  application/x-www-form-urlencoded: 数据被编码为 键值对。也就是key/value 这是标准编码格式。一般POST里面会用qs.stringify转一次
  multipart/form-data: 数据以formData的形式   
  text/plain: 数据以纯文本形式（text/json/xml/html）编码。JSON形式的使用json.encode(text)转换
:::

## HTTPS
 **HTTP协议全称Hyper Text Transfer Protocol，翻译过来就是超文本传输协议，位于TCP/IP四层模型当中的应用层。HTTP协议通过请求/响应的方式，在客户端和服务端之间进行通信。** 
但是HTTP传输的信息是明文 容易被恶意截取和篡改，所以需要在后续的通信中，信息发送方都使用密钥对信息加密，而信息接收方通过同样的密钥对信息解密。

**对称加密**：对需要使用加密用过的密钥以及相同算法的逆算法对密文进行解密。

**非对称加密**：为密钥的传输做一层额外的保护。

非对称加密的一组秘钥对中，包含一个公钥和一个私钥。明文既可以用公钥加密，用私钥解密；也可以用私钥加密，用公钥解密。
但是还是可以中间首先截取服务端的公钥，然后恶意篡改公钥，然后发送给客户端一个改过的密钥，然后服务端发送过来一个私钥。这样也不行。所以要引入CA证书。
**CA证书**
主要是通过在HTTP协议的基础上加了SSL安全层。

**HTTPS = HTTP + TLS/SSL**   信息加密 + 完整性校验 + 身份验证

HTTPS 协议的主要功能基本都依赖于 TLS/SSL 协议，TLS/SSL 的功能实现主要依赖于三类基本算法：散列函数 、对称加密和非对称加密，其利用非对称加密实现身份认证和密钥协商，对称加密算法采用协商的密钥对数据加密，基于散列函数验证信息的完整性。

HTTPS 是在HTTP上建立SSL加密层，并对传输层数据进行加密，是HTTP协议的安全版本。现在被广泛用于万维网上安全敏感的通讯，例如交易支付方面。
HTTPS的主要作用：
* 对数据进行加密，并建立一个信息安全通道，来保证传输过程中的数据安全
* 对网站服务器进行真实身份认证。


### HTTP 和 HTTPS 的区别

* HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。
* HTTPS比HTTP更加安全，对搜索引擎更友好，利于SEO,谷歌、百度优先索引HTTPS网页;
* HTTPS需要用到SSL证书，而HTTP不用;
* HTTPS标准端口443，HTTP标准端口80;
* HTTPS基于传输层，HTTP基于应用层;
* HTTPS在浏览器显示绿色安全锁，HTTP没有显示;


## HTTP2的优势

> 二进制传输 HTTP传输的所有内容都转为二进制进行传输，以前的版本只有头部信息会转为二进制，内容体并不会。不统一总会造成额外的麻烦。比如内容是文本，而文本是有多种样式的，这样的话解析它的一方就很麻烦了，要支持你各种样式。

> HTTP1.1 有个长连接，但是多个请求在很多的请求情况下会阻塞。多路复用的形式去解决这个问题。什么是多路复用呢？就是一个通道可以让多条线路同时占用而不搞混。这里的作法是为每一个请求带一个编号，它样服务器方就能为请求的回应对上号了。如果一个请求时间过长，那么服务器就可以先暂停这个请求，先处理下一个请求，处理完再回来处理这个长请求，如果找回这个长请求呢，那就靠这个编号了。

> Header 压缩  在 HTTP 1.X 中，我们使用文本的形式传输 header，在 header 携带 cookie 的情况下，可能每次都需要重复传输几百到几千的字节。在 HTTP 2.0 中，使用了 HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。并在两端维护了索引表，用于记录出现过的 header ，后面在传输过程中就可以传输已经记录过的 header 的键名，对端收到数据后就可以通过键名找到对应的值。

> 服务端 Push 在 HTTP 2.0 中，服务端可以在客户端某个请求后，主动推送其他资源。可以想象以下情况，某些资源客户端是一定会请求的，这时就可以采取服务端 push 的技术，提前给客户端推送必要的资源，这样就可以相对减少一点延迟时间。当然在浏览器兼容的情况下你也可以使用 prefetch 。




