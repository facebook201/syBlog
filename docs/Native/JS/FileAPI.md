## File API

### File

File 接口提供有关文件相关的信息，允许网页中的 Javascript 访问其内容。通常情况下，File对象是来自用户在一个 input元素上选择文件后返回的 FileList对象，也可以是来自由拖放操作生成的 DataTransfer对象。**File对象是特殊的Blob，继承自Blob接口。**

**FileReader、URL.createObjectURL 以及 XMLHttpRequest.send() 都可以处理Blob和File。**



### Blob

Blob 对象表示一个不可变、原始数据的类文件对象。从Blob中读取内容的唯一方法的是FileReader。

```javascript
var reader = new FileReader();

reader.readAsArrayBuffer(blob);
```



### FileReader 

FileReader 对象允许web应用程序异步读取存储在用户计算机上的文件的内容。使用File 或 Blob 对象指定要读取的文件或数据。 File对象来自用户一个 input元素上选择文件后返回的FileList对象，也可以来自拖放操作生成的DataTransfer对象。

#### 属性

* FileReader.error 一个DOMExecption 表示读取文件时发生的错误
* FileReader.readyState  状态的数字
  * 0 没有加载任何数据
  * 1 数据正在被加载
  * 2 已经加载完成
* FileReader.result 文件的内容 在读取操作完成之后才有效，数据的格式取决于使用哪个方法来启动读取操作



#### 事件处理

* onabort 处理abort事件 在读取操作被中断时触发
* error 读取操作发生错误时触发
* onload 读取操作完成时
* onloadstart 读取操作开始时触发
* onloadend 读取操作结束时
* onprogress 读取Blob时触发



#### 方法

* **readAsDataURL** 返回URL格式的字符串表示所读取文件的内容
* readAsBinaryString  返回原始二进制数据
* readAsArrayBuffer 返回ArrayBuffer数据对象
* readAsText 字符串表示读取的文件内容





### FileList

FileList对象通常来自一个input 元素的files属性，可以通过这个对象访问到用户所选择的文件，该类型的对象还有可能来自拖放操作。DataTransfer 对象。

```javascript
// <input type="file" id="filename" multiple>
var file = document.getElementById('filename');

var file = document.getElementById('filename');
var preview = document.getElementById('preview');

file.onchange = function() {
  // files 是上传的对象 可以有多个
  var files = this.files;
  // 文件的数量
  var length = files.length;
  // 遍历文件对象
  var imageType = /^image\//;

  for (let i = 0; i < length; i++) {
    let file = files[i];
    if (!imageType.test(file.type)) {
      continue;
    }

    var image = document.createElement('img');
    image.classList.add('obj-img');
    image.file = file;

    preview.appendChild(image);

    var reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(file); // 返回URL格式的字符串表示所读取文件的内容

    // createObjectURL形式
    let url = createObjectUrl(file);
    image.src = url;
  }
};

// URL.createURL
function createObjectUrl(blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob);   
  } else {
    return null;
  }
}

// 拖拽的上传
file.addEventListener('dragenter', dragenter, false);
file.addEventListener('dragover', dragover, false);
file.addEventListener('drop', drop, false);

// 浏览器有一些默认行为 比如新开页打开图片 下载图片等 所以要禁用默认行为和
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFile(files);
}
```

### 处理file的地方可以单独提炼出来
```javascript
function handleFile(files) {
  var imageType = /^image\//;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!imageType.test(file.type)) {
      continue;
    }

    var image = document.createElement('img');
    image.classList.add('obj-img');
    image.file = file;

    preview.appendChild(image);

    let url = createObjectUrl(file);
    image.src = url;
  }
}
```
### formdata 传参数
```javascript
function sendFile(option) {
  let xhr = new XMLHttpRequest();
  let formdata = new FormData();
  let action = option.action;

  // 增加其他参数
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formdata.append(key, option.data[key]);
    });
  }

  formdata.append(option.filename, option.file, option.file.name);
  xhr.onload = function onload() {
    if (xhr.status < 200 && xhr.status > 300) {
      return Option.onError(getError(action, option, xhr));
    }
    return xhr.onSuccess(getBody(xhr));
  }

  xhr.open('post', action, true);
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }
  xhr.send(formdata);
}
```

## XMLHttpRequest
**XMLHttpRequest 对象可以跟服务器交互。从URL获取数据，无需整个页面刷新，不影响用户操作， 一般通过 new XMLHttpRequest来创建一个xhr对象。**
在这里我只会介绍一些常用的属性和方法。

### 属性
* readyState 状态为4的时候表示请求完成
* onreadystatechange 当readyState的值改变的时候 回调函数onreadystatechange 会发生不过现在基本上是使用onload来替代。
* responseText 返回纯文本的值
* responseType 一个枚举类型的属性，返回响应数据的类型。
* status 状态码 200 到300之间是成功
* timeout  请求在被自动终止前所消耗的毫秒数。默认值0.
* withCredentials 属性是一个布尔类型值，指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site `Access-Control`）请求。**在同一个站点下使用`withCredentials属性是无效的。`**

如果在发送来自其他域的XMLHttpRequest请求之前，未设置`withCredentials` 为true，那么就不能为它自己的域设置cookie值。而通过设置`withCredentials` 为true获得的第三方cookies，将会依旧享受同源策略

```javascript
let xhr = new XMLHttpRequest();
xhr.timeout = 2000;

xhr.ontimeout = function ontimeout() {
  // to do something when timeout
};
xhr.send(null);
```
### 进度事件

| `onloadstart` | 获取开始                         |
| ------------- | -------------------------------- |
| `onprogress`  | 数据传输进行中                   |
| `onabort`     | 获取操作终止                     |
| `onerror`     | 获取失败                         |
| `onload`      | 获取成功                         |
| `ontimeout`   | 获取操作在用户规定的时间内未完成 |
| `onloadend`   | 获取完成（不论成功与否）         |

### 方法
* abort 终止请求， 当一个请求被终止 它的readyState 属性将被置为0；
* **getAllResponseHeaders** 返回所有的请求头 
* **setRequestHeader** 设置HTTP请求头 该方法必须在 open 和 send直接。

```javascript
var request = new XMLHttpRequest();
request.open("GET", "foo.txt", true);
request.send();

request.onreadystatechange = function() {
  if(this.readyState == this.HEADERS_RECEIVED) {

    // Get the raw header string
    var headers = request.getAllResponseHeaders();

    // Convert the header string into an array
    // of individual headers
    var arr = headers.trim().split(/[\r\n]+/);

    // Create a map of header names to values
    var headerMap = {};
    arr.forEach(function (line) {
      var parts = line.split(': ');
      var header = parts.shift();
      var value = parts.join(': ');
      headerMap[header] = value;
    });
  }
  // 然后我们就可以这样访问
  var contentType = headerMap["content-type"];
```

## 文件夹上传

```javascript

// var file = document.getElementById('filename');
var preview = document.getElementById('preview');

// 拖拽事件
// file.addEventListener('dragenter', dragenter, false);
// file.addEventListener('dragover', dragover, false);
// file.addEventListener('drop', drop, false);

// 浏览器有一些默认行为 比如新开页打开图片 下载图片等 所以要禁用默认行为和
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFile(files);
}

// 点击上传
// file.onchange = function() {
//   // files 是上传的对象 可以有多个
//   var files = this.files;
//   // 遍历文件对象
//   handleFile(files);
// };

function handleFile(files) {
  var imageType = /^image\//;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!imageType.test(file.type)) {
      continue;
    }

    var image = document.createElement('img');
    image.classList.add('obj-img');
    image.file = file;

    preview.appendChild(image);

    let url = createObjectUrl(file);
    image.src = url;
  }
}

// 1、 2、通过ObjectURL方式
// var reader = new FileReader();
// reader.onload = function (e) {
//   image.src = e.target.result;
// };
// reader.readAsDataURL(file);

function createObjectUrl(blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob);   
  } else {
    return null;
  }
}


function sendFile(option) {
  let xhr = new XMLHttpRequest();
  let formdata = new FormData();
  let action = option.action;

  // 增加其他参数
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formdata.append(key, option.data[key]);
    });
  }

  formdata.append(option.filename, option.file, option.file.name);

  xhr.onload = function onload() {
    if (xhr.status < 200 && xhr.status > 300) {
      return Option.onError(getError(action, option, xhr));
    }
    return xhr.onSuccess(getBody(xhr));
  }

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }
  xhr.send(formdata);
}


var fileLoader = document.getElementById('filenamew');
fileLoader.addEventListener('change', uploadFolder);

let root = [];
let set = new Set();
let isImage = /^isImage\//;

function uploadFolder(e) {
  let files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].webkitRelativePath.indexOf('.DS') > -1) {
      continue;
    } else {
      // 上面是苹果会有这样的返回结果
      let path = files[i].webkitRelativePath.split('/');
      transPath(path);
    }
  }
  console.log(root);
  console.log(set);
  bineryTree(root);
}


function transPath(path = []) { 
  // ['A', 'png']
  for (let i = 0; i < path.length; i++) {
    let id = buildId(path.slice(0, i + 1));
    // 如果存在就不加到扁平数组
    if (set.has(id)) {
      continue;
    } else {
      set.add(id);
      if (isImage.test(path[i])) {
        root.push({
        id: id,
        name: path[i],
        level: i,
        parent: findParentId(path, i)
        });
      } else {
        root.push({
        id: id,
        name: path[i],
        level: i,
        parent: findParentId(path, i),
        children: []
        });
      }
    }
  }
}
  
  function buildId(path) {
    let id = '';
    let n = 0;
    let len = path.length;
    while (n < len) {
      id = id + '-' + path[n];
      n++;
    }
    return id.slice(1);
  }

  function findParentId(path, i) {
    let parentId = '';
    let n = 0;
    if (i == 0) {
      return null;
    }
    
    while (n < i) {
      parentId += '-' + path[n];
      n++;
    }
    return parentId.slice(1);
  }
    


function bineryTree(nodeTree = []) {
  let temp = {};
  let tree = {};
  
  for (let i = 0; i < nodeTree.length; i++) {
    temp[nodeTree[i].id] = nodeTree[i];
  }

  for (let i in temp) {
    if (temp[i].parent) {
      if (!temp[temp[i].parent].children) {
        temp[temp[i].parent].children = {};
      }
      temp[temp[i].parent].children[temp[i].id] = temp[i];
    } else {
      tree[temp[i].id] = temp[i];
    }
  }
  console.log(tree);
  return tree;
}
```

