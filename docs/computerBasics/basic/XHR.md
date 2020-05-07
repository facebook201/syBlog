

## XMLHttRequest

XHR对象跟服务端交互，可以从URL获取数据，无需让整个页面刷新。


 EventTarget   <===     XMLHttpRequestEventTarget   <===    XMLHttpRequest

XHR 可以获取任何类型的数据。**如果通信流程需要从服务器接收事件或消息数据，全双工的通信建议使用 WebScoket**



**一个HTTP请求由4部分组成：**

* HTTP请求方法
* 正在请求的URL
* 一个可选的请求集合，其中可能包含身份验证信息
* 一个可选的请求主体



**服务器返回的HTTP响应包含3部分：**

* 一个数字和文字组成的状态码 显示请求失败还是成功
* 一个响应头集合
* 响应主体



XMLHttpRequest 不是协议级的 HTTP API 而是浏览器级的API。浏览器需要考虑 cookie、重定向、缓存和代理，但是代码只需要担心请求和响应。



### 指定请求

创建 XHR对象之后，就发起一个HTTP请求，调用 XHR对象的 open方法。他有两个参数：方法和 URL。

目前主流支持的方法有 **GET 、POST、HEAD、OPTIONS、PUT、DELETE、 **

如果有请求头设置，下一个步骤就是设置请求头。在 open 和 send 方法之间调用， POST 请求需要设置 “Content-Type”

```js
request.setRequestHeader('Content-Type', 'text/plain');
```



不能自己指定 下面请求头，XHR会自动添加这些头防止伪造。所以无法向 setRequestHeader() 传递这些

```js
Accept-Charset								Content-Transfer-Encoding					TE
Accept-Encoding								Date															Trailer
Connection										Expect														Transfer-Encoding
Content-Length								Host															Upgrade
Cookie												Keep-Alive												User-Agent
Cookie2												Referer														Via
```





### 顺序问题

HTTP请求的各部分有指定顺序，请求方法和URL首先到达，然后是请求头，最后是请求体。XMLHttpRequest实现通常直到调用 send方法才开始启动网络。 XHR的方法必须要匹配 HTTP请求的架构。



### 取得相应

一个完整的 HTTP 响应由状态码、响应头集合、响应主体组成。 都可以通过XMLHttpRequest对象的属性和方法使用。一般我们发送一个异步请求之后，JavaScript 继续执行而不等待响应。此时 可以检测 XHR 对象的 readyState属性。该属性表示请求 响应过程的当前活动阶段。**之前都是监听 onreadystatechange 事件处理程序才能确保跨浏览器兼容性。但是 XHR2 增加了一个 load事件来替代 readystatechange事件，响应接收完毕,也没有必要去监听 readyState属性，而onload事件处理程序会接收到一个event对象 **



### 编码请求主体

POST请求包括一个请求主体，它包含客户端传递给服务器的数据，一个简单表单的编码对会使用序列化的方式 。**把编码后的名字和值分开，然后使用&符号分开名/值对。一个简单表单的编码像这样。find=pizza&zipcode=12102&radius=1km ** 表单数据格式有一个正式的 MIME 类型：“application/x-www-form-urlencoded”。这种顺序的表单数据时 必须设置 Content-Type。



**enctype 是 form表单数据的编码格式，Content-Type 为 Http传输的数据的编码格式**

| enctype ( 请求的编码类型 )             | Content-Type                                                 | data数据格式                                 | POST 请求提交      |
| -------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- | ------------------ |
| 默认 application/x-www-form-urlencoded | POST 默认application/x-www-form-urlencoded， 如果 表单有上传文件 就是 multipart/form-data | Form Data  key=value&key=value               | form表单           |
| multipart/form-data                    | multipart/form-data 会自己指定                               | Form Data 生成一个 boundary 分割的不同字段， | 如果指定是FormData |
|                                        | application/json                                             | payload 字符串格式 一般 JSON.stringify       | application/json   |

```javascript
// 表单类型 默认 application/x-www-form-urlencoded 把数据以一个key=value对 & 拼接起来。
// FormData 对象可以为序列化表单以及创建与表单格式相同的数据提供了便利， 通过XHR2传输
function encodeFormData(data) {
  if (!data) return '';
  const param = [];
  for (let name in data) {
    if (hasOwnProperty.call(data, name)) {
      let value = data[name].toString();
      name = encodeURIComponent(name.replace('%20', '+'));
      value = encodeURIComponent(value.replace('%20', '+'));

      param.push(`${name}=${value}`);
    }
  }
  return param.join('&');
}

// 一般 POST PUT PATCH 等都是设置默认的 Content-Type
const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

// 如果数据是 FormDatF的 就删除 Content-Type 浏览器会自己设置
if (isFormData(requestData)) {
  delete requesetHeaders['Content-Type'];
}
```















