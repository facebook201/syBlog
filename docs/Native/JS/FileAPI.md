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
**XML**
