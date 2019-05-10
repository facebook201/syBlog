---
pageClass: getting-started
---

# JSON

## 序列化
说JSON之前先说说序列化。 

> 序列化是指将对象的状态转为字符串形式。百科上面解释的是将对象状态信息转换为可以存储或传输的形式的过程。

前端给后端传数据的时候，POST一般有两种格式，一种是JSON字符串，使用JSON.stringify(obj) 格式化的字符串，还有一种是类似FormData表单数据的序列化数据。表单数据和json字符串（Form Data和Request Payload)。从下面可以看到他们两者完全不一样。

```javascript
let obj = {
  name: 'java',
  age: 25
};

JSON.stringify(obj); // "{"name":"java","age":25}"
qs.stringify(obj); // name=java&age=25 将key和value拼接起来 多个之间有个&符号
```

## FormData 
FormData是XHR2里面定义的类型，为序列化表单以及创建与表单相同的数据（用于通过XHR传输）提供方便。 使用FormData 的方便之处体现在不必明确地在XHR 对象上设置请求头部。XHR 对象能够识别传
入的数据类型是FormData 的实例，并配置适当的头部信息。

下面是饿了么Vue组建库的ajax.js的代码 封装的上传方法
```javascript
export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const xhr = new XMLHttpRequest();
  const action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
```
