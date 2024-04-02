
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

## json
json跟XML相比有两个优点 

* 书写简单、一目了然。
* 符合JavaScript原生语法

JSON 值的类型和格式有严格的规定

* 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
* 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
* 字符串必须使用双引号表示，不能使用单引号。
* 对象的键名必须放在双引号里面。
* 数组或对象最后一个成员的后面，不能加逗号。

## JSON.parse
该方法用来解析JSON字符串，构造有字符串描述的JavaScript值或对象。如果解析错误会报异常。建议放在try catch代码块


## JSON.stringify
将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，如果指定了replacer是一个函数，则可以选择性的替换值，或者如果指定了replacer是一个数组，可选择性的仅包含数组指定的属性。

json.stringify() 将值转换成相应的JSON格式：

* 转换值如果有toJSON()方法，该方法定义什么值将被序列化。
* 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
* 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
* undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined被单独转换时，会返回undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
* 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
* Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
* NaN和Infinity格式的数值及null都会被当做null。
* 其他类型的对象，包括Map/Set/weakMap/weakSet，仅会序列化可枚举的属性。