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


<!-- 
::: warning
  ssad 
 ::: -->
