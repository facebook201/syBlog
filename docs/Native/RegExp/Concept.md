---
pageClass: getting-started
---

# 正则的概念



## 基本元字符

| 字符 | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| .    | 匹配除了换行符之外的任何单个字符（一般范围很广的都用这个）   |
| \    | 非特殊字符之前的反斜扛表示下一个特殊字符                     |
| \|   | 逻辑或操作符 选择表达式。123\|456 匹配123 或者 456           |
| [ ]  | 定义一个字符集合，匹配字符集合中的一个字符，但是 . \ 这些字符表示自身 |
| [^]  | 不在字符集合的任意字符                                       |
| -    | 定义一个区间 例如[A-Z] 其首尾字符在ASCII字符集里面           |






## 数量元字符

| 字符   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| {m, n} | 匹配前面一会字符至少m次到至多n次重复 单个{m}表示匹配m次，{m,}至少m次 |
| +      | 匹配前面一个表达式一次或多次 相当于{1,}                      |
| *      | 匹配前面一个表达式零次或者多次。相当于{0,} 可以一次都没有    |
| ？     | 匹配前面零次或一次 {0,1} **如果放在任何量词 * + ？ { } 后面的时候就使得量词变为非贪婪模式 （尽量匹配少的字符）** 比如 '123abc' 应用/\d+/ 会返回 '123',如果是 /\d+?/ 就会只会匹配到'1' 但是有一种情况 'aaab' 应用 /a+?b/匹配到的却是 'aaab' 整个字符串，这是因为正则表达式的模式匹配总会寻找字符串中第一个可能匹配的位置。由于该匹配是从字符串的第一个字符开始 |





## 位置元字符

| 字符    | 描述                              |
| ------- | --------------------------------- |
| ^       | 单独使用匹配表达式的开始          |
| $       | 匹配表达式的结束位置              |
| \b      | 匹配单词边界 \w 和 \W之间的位置。 |
| \B      | 匹配非单词边界                    |
| （?=p） | 匹配p前面的位置                   |
| （?!p） | 匹配不是p前面的位置               |

\b 和 \B 是单词的边界。一般是 \w 和 \W之间的位置。

### 正向肯定预查 ?= 

```javascript
let str = '[JS] Lesson_01.mp4';
let str1 = str.replace(/\b/g, '#');
console.log(str1); // [#JS#] #Lesson_01#.#mp4#

'hello'.replace(/(?=l)/g, '#'); // 结果是 he#l#lo
'hello'.replace(/(?!l)/g, '#'); // 结果是 #h#ell#o#
```



## 只匹配不捕获 ？:

在正则表达式中，可以选择关闭对不需要的内容的捕获，就是不捕获，以此来提高正则表达式的执行速度和节约内存使用。 

**要在一篇文章中查找"program"和"project"两个单词，正则表达式可表示为/program|project/,也可表示为/pro(gram|ject)/，但是缓存子匹配(gramject)没有意义，就可以用/pro(?:gram|ject)/进行非捕获性匹配这样既可以简洁匹配又可不缓存无实际意义的字匹配**。



## 特殊元字符

| 字符 | 描述                                  |
| ---- | ------------------------------------- |
| \d   | 表示一个数字 [0-9]                    |
| \D   | 表示一个非数字 [^0-9]                 |
| \s   | 表示空白字符 包括制表符 tab 回车 换页 |
| \S   | 表示非空白字符                        |
| \w   | 数字 大小写字母 下划线                |
| \W   | 非单词字符 跟\w相反                   |





## 贪婪和非贪婪

正则表达式里面默认是贪婪匹配的。量词后面加？就是非贪婪

```javascript
var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) ); // ["123", "1234", "12345", "12345"]

var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) ); // ["12", "12", "34", "12", "34", "12", "34", "56"]
```







## 分组和分支结构

比如 /(abc)+/ 一个或多个abc字符串，用这些()包起来的地方就叫分组。



#### 引用分组

**提取数据**

比如要用正则来匹配一个日期格式，yyyy-mm-dd，可以写出简单的正则`/\d{4}-\d{2}-\d{2}/`，这个正则还可以改成分组形式的`/(\d{4})-(\d{2})-(\d{2})/`这样可以分别提取出一个日期的年月日，用 String 的 match 方法或者用正则的 exec 方法都可以

 ```javascript
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-08-09";
console.log( string.match(regex) ); 
// => ["2017-08-09", "2017", "08", "09", index: 0, input: "2017-08-09"]
 ```



## 回溯

例如 /ab{1,3}bbc/.test('abbbc'); 这个是怎么匹配的呢。

搜索这种状态触发所能达到的所有"状态"，当第一条路走到尽头，会回退一步或若干步，从另一种可能状态出发继续搜索。直到所有路径都试探过。这种不断“前进”、不断“回溯”寻找解的方法，就称作“回溯法” 。

贪婪和非贪婪的匹配都会产生回溯，不同的是贪婪的是先尽量多的匹配，如果不行就吐出一个然后继续匹配，再不行就再吐出一个，非贪婪的是先尽量少的匹配。如果不行就再多匹配一个，再不行就再来一个 。

分支结构也会产生回溯，比如`/^(test|te)sts$/.test('tests')` 前面括号里面的匹配过程是先匹配到 test 然后继续往后匹配匹配到字符 `s` 的时候还是成功的，匹配到 `st` 的时候发现不能匹配， 所以会回到前面的分支结构的其他分支继续匹配，如果不行的话再换其他分支。



## 怎么读正则

**结构和操作符**

结构：字符字面量、字符组、量词、锚字符、分组、选择分支、方向引用

操作符：

1. 转义符 \
2. 括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
3. 量词限定符 {m}、{m,n}、{m,}、?、*、+
4. 位置和序列 ^ 、$、 \元字符、 一般字符
5. 管道符（竖杠） |

操作符的优先级是从上到下，由高到低的，所以在分析正则的时候可以根据优先级来拆分正则，比如 

/ab?(c|de*)+|fg/

1. 因为括号是一个整体，所以`/ab?()+|fg/`,括号里面具体是什么可以放到后面再分析
2. 根据量词和管道符的优先级，所以`a`, `b?`, `()+`和管道符后面的`f`, `g`
3. 同理分析括号里面的`c|de*` => `c`和`d`, `e*`
4. 综上，这个正则描述的是



![](https://github.com/facebook201/sy-fontend-system/blob/master/img/reg.jpg?raw=true)

### 实用案例

```javascript
let reg = /^([1-9]\d*|0)(\.\d{1,2})?$/; // 最多保留两位小数的数字

let test1 = '1234567890';
let format2 = test1.replace(/(?!^)(?=(\d{3})+$)/g, ',');
let format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/* /\B(?=(\d{3})+(?!\d))/g：正则匹配边界\B，边界后面必须跟着(\d{3})+(?!\d);
(\d{3})+：必须是1个或多个的3个连续数字;
(?!\d)：第2步中的3个数字不允许后面跟着数字;
(\d{3})+(?!\d)：所以匹配的边界后面必须跟着3*n（n>=1）的数字。*/

```


