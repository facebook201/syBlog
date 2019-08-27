<!--
 * @Author: shiyao
 * @Description: 
 * @Date: 2019-08-20 09:30:58
 -->
# nginx

## 入门安装

1、安装更新 brew
```
brew update
```

2、查看是否存在要安装的软件
```
brew search nginx
```

3、查看nginx的信息
```
brew info nginx
```

4、如果没有安装就如果安装好了就打开目录
```javascript
// 安装nginx
brew install nginx 
// 打开安装目录
open /usr/local/etc/nginx/
// 真正的安装目录
open /usr/local/Cellar/nginx
```
nginx 打开的目录，可以看到nginx.conf 的配置文件，

5、修改nginx配置
```
cat /usr/local/etc/nginx/nginx.conf
```
配置文件网站根目录是html（/usr/local/var/www）而索引文件为index.html

## 启动

```
ps -ef|grep nginx
// 或者执行
/usr/local/Cellar/nginx/1.8.0/bin/nginx -c /usr/local/etc/nginx/nginx.conf
```

### 停止 
首先找到启动的进程号，是nginx:master的

```
kill -QUIT 15800 // 慢慢停止
kill -TERM 15800 // 立即停止
```

### 重启
```
cd /usr/local/Cellar/nginx/1.8.0/bin/
./nginx -s reload
```

## nginx 错误

* nginx [emerg] unknow diretive ""
这里是应该编码的问题，默认使用 UTF-8
