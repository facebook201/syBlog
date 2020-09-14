# 深入应用场景

## 解码 PNG 图片
解码 PNG 图片就是把一张图片从二进制数据装换成包含像素数据的 ImageData。

[PNG规范](http://www.libpng.org/pub/png/spec/1.2/PNG-Contents.html)



### 图像转换

> **图像可以用多种不同的类型数据表示，DOM、URI、File、ImageData、Buffer**



#### DOM

* img 元素从 URL 来加载图像
* canvas 通过 drawImage 来获取 <img> 元素上的图像数据



#### URL

* Data URL 带有base64编码的图像数据。可以从Data URL 数据中解码出图像的二进制数据。Data URL 数据的大小比原始数据的二进制数据大一些。
* HTTP URL 代表存储在服务器上的图像，HTTP URL 用于服务器端获取图像数据
* Object URL 代表存储在浏览器内存中的 File 或 Blob对象，Object URL 可以由 createObjectURL API 来创建，并由 revokeObject URL API释放



#### 文件

* Blob 带有二进制数据的类文件对象，包含一个只读的size属性和 一个只读的 type属性，可以通过 slice、stream、text 等方法来读取二进制数据

* File 对象是一个特殊的 Blob对象，除了Blob的熟悉和方法，File对象还包含 lastModified name 等属性

* Buffer

  * [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 是在浏览器中唯一一种访问二进制数据的方法。`ArrayBuffer` 代表图像的原始二进制数据缓冲区。我们无法读取和写入 `ArrayBuffer` ，只能将 `ArrayBuffer` 转换为 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 或 [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 来读取和写入二进制数据。
  * [`Buffer`](https://nodejs.org/api/buffer.html) 是 Node.js 中特殊的一种 `Uint8Array`，Node.js 对其进行了一些优化。

  



![border](https://vivaxyblog.github.io/assets/2019-11-06-comprehensive-image-processing-on-browsers/ArrayBuffer-TypedArray-Buffer-DataView.svg)



```js
const upload = document.getElementById('upload');

upload.addEventListener('change', function(e){
  const file = this.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e) {
      let file = e.target.result;
      let blob = file.slice(0, 8);
      let fileBuffer = new Uint8Array(blob);
      // PNG 图片文件的签名
      // Uint8Array(8) [137, 80, 78, 71, 13, 10, 26, 10]
      console.log(fileBuffer);
    }
  }
}, false);
```



### TypedArray

TypedArray对象描述了一个**二进制数据缓冲区的一个类数组视图** 实际上是没有这个构造函数的，它是下面的类型之一

```bash
Int8Array(); 
Uint8Array(); 
Uint8ClampedArray();
Int16Array(); 
Uint16Array();
Int32Array(); 
Uint32Array(); 
Float32Array(); 
Float64Array();
```

U表示 unsigned, 无符号（都是正值）。8表示8位。里面的数据值不能超过 255。Int8Array是 可以带符号的，所以可以为负数。



### 签名文件

一张 PNG 图片二进制数据的开头必须是这 8 字节：`0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a`。

`0x` 代表这个数字是 16 进制表示的，`0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a` 转换为 10 进制是 `137, 80, 78, 71, 13, 10, 26, 10`。

| 0 ~ 3                    | 4 ~ 7                    |
| ------------------------ | ------------------------ |
| `137, 80, 78, 71`        | `13, 10, 26, 10`         |
| `0x89, 0x50, 0x4e, 0x47` | `0x0d, 0x0a, 0x1a, 0x0a` |

