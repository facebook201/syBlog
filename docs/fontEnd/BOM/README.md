# BOM

BOM 简称 （浏览器对象模型），

**这个对象模型定义了一系列API开放给外界，用于访问浏览器相关信息以及控制浏览器的行为。**

**注意不能把JavaScript 和 BOM范畴的内容混淆。javascript 只是一种脚本语言，拥有的是基本语法和处理数据的内置对象。就像 setTimeout函数实现任务的延迟执行 其实它本质上是浏览器开发给JavaSript调用的接口。当运行setTimeout时，会访问浏览器的定时器模块，从而实现延迟执行任务的功能。**

 ## DOM 和 BOM的区别

* 服务对象不同：BOM针对浏览器 DOM针对网页文档
* BOM定义的API多个对象，函数的形式挂载在window对象下面。而DOM定义的所有API统一挂载 在 window.document下
* DOM标准由W3C组织制定。BOM由不同的浏览器产商实现。 有不同的差异





## aJax

Ajax本质是使用XMLHttpRequest来想服务器发送异步请求获取数据。

优点:

- 无刷新更新数据 （页面内部跟服务器通信 体验好）
- 异步通信 （异步与服务器通信 不需要打断用户的操作 处理较快）
- 支持广泛
- 界面与应用分离

缺点

- 安全性 容易暴露比较多的数据
- 不能很好的支持移动设备

### 原生 js实现 ajax

```javascript
function ajax(options = {}) {
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';

  let params = formatParams(options.data);
  // 创建 XHR
  let xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (xhr.readyState == 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  }

  if (options.type === 'GET') {
    xhr.open('GET', options.url + '?' + params, true);
    xhr.send(null);
  } else if (options.type === 'POST'){
    xhr.open('POST', options.url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
}

function formatParams(data) {
  const arr = [];
  for (let name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(('v=' + Math.random()).replace('.'));
  return arr.join('&');
}
```

