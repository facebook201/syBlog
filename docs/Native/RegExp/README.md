---
pageClass: getting-started
---

# 正则表达式

正则表达式 是一种表达文本模式（字符串结构）的方法。常用来按照 给定模式匹配文本。

* 字面量表示 
* 另一种是使用RegExp构造函数  

```javascript
let reg = /xyz/;
let reg2 = new RegExp('xyz');
```



### 正则教程

[JS 进阶 test, exec, match, replace](<https://segmentfault.com/a/1190000003497780> )

[javascript正则之路](<https://github.com/jawil/blog/issues/20> )



## 标志进行高级搜索

正则有四个可选参数进行全局和不分大小写搜索。这些参数可以单独使用也可以一起使用在任何顺序和包含正则表达式的部分中。

| 标志   | 描述       |
| ---- | -------- |
| g    | 全局搜索     |
| i    | 不区分大小写搜索 |
| m    | 多行搜索     |



## 实例方法



### RegExp.prototype.test

正则对象的test方法返回一个布尔值。表示当前模式是否能匹配参数字符串。返回 true 或 false。

当如果想知道一个模式是否存在于一个字符串中，就可以使用test()。类似String.prototype.search()，差别在于test会返回布尔值，search返回索引（如果找到）或者-1（没有找到）；

```javascript
let reg = /^hello/;
let str = 'hello world';
reg.test(str); // true
```

### RegExp.prototype.exec

方法在一个指定字符串中执行一个搜索匹配，返回**一个结果数组或者null**

如果单个匹配成功会返回一个数组，如果正则表达式包含圆括号（有组匹配），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。整个数组的length属性等于组匹配的数量再加一

如果正则加上g修饰符，可以多次使用exec。下一次搜索的位置是上一次匹配结束的位置开始

```javascript
let s = '-x-xx';
let reg = /-(x)-(x)/;
reg.exec(s); // ['-x-x', x, x]

var reg = /a/g;
var str = 'abc_abc'

var r1 = reg.exec(str);
r1 // ["a"]
r1.index // 0
reg.lastIndex // 1

var r2 = reg.exec(str);
r2 // ["a"]
r2.index // 4
reg.lastIndex // 5

var r3 = reg.exec(str);
r3 // null
reg.lastIndex // 0
```



## 字符串的实例方法

### String.prototype.match

返回一个数组，成员是所有匹配的子字符串。

字符串的match跟正则对象的exec非常类似，匹配成功返回一个数组 失败返回null。

如果加上g修饰符会一次性返回所有匹配成功的结果。

```javascript
let s = '_x_x';
let r = /x/;
let rg = /x/g;

s.match(r); // ['x']
s.match(rg); // 全局匹配会一次性返回所有 ['x', 'x']
```



### String.prototype.search

字符串对象的search方法。返回第一个满足条件的匹配结果在整个字符串中的位置，如果没有匹配就返回-1

```javascript
'_x_x'.search(/x/); // -1
```



### String.prototype.replace

字符串对象的replace方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换内容。 **返回一个部分或者全部被替换模式取代的新字符串** 该方法不会改变字符串本身

模式可以是一个字符串或者一个正则，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。

> str.replace(reg|substr, newstr|function )

**参数**

regexp（pattern）

  一个RegExp对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。

substr（pattern）

  一个将被newStr替换的字符串 仅第一个匹配项会被替换掉 

newStr

  用于替换掉第一个参数在原字符串中匹配部分的字符串

function

  一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果

```javascript
'aaa'.replace('a', 'b'); // 'baa'
'aaa'.replace(/a/, 'b'); // 'baa'
'aaa'.replace(/a/g, 'b'); // 'bbb'
```

> 使用字符串作为第二个参数

| 变量名                 | 代表的值             |
| ------------------- | ---------------- |
| $$     | 插入一个美元符号 $ |                  |
| $&                  | 匹配的子字符串          |
| $`                  | 匹配结果前面的文本        |
| $’                  | 匹配结果后面的文本        |
| $n                  | 匹配成功的第n组内容 n从1开始 |

```javascript
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// "world hello"

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"
```

> 指定一个函数作为参数

当用函数作为参数，当匹配执行之后 函数的返回值会作为替换字符串。另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。 

函数参数

| 变量名    | 代表的值                                     |
| :----- | ---------------------------------------- |
| match  | 匹配到的每一项子串                                |
| p1, p2 | 如果replace方法的第一个参数是正则对象，则代表的n个括号匹配的字符串， 例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`。 |
| offset | 匹配到的子字符串在原字符串中的偏移量                       |
| string | 被匹配的原字符串                                 |

下面这段来自JavaScript高程三 P146

replace方法的第二个参数也可以是一个函数。只有一个匹配项的情况下。会传三个参数 **模式的匹配项、模式匹配项在字符串中的位置和原始字符串 **

```javascript
 let str = '-wqewq-abc';

 let ret = str.replace(/-\w/g, function(match, p1, str) {
  console.log(match); // 匹配项 -w 和 -a
  console.log(p1); // 位置 0 6
  console.log(str); // 原字符 -wqewq-abc
  return match.charAt(1).toUpperCase();
 });
 console.log(ret); // WqewqAbc
```

如果在正则表达式中定义了多个捕获组，传递给函数的参数依次是 **模式的匹配项、第一个捕获组的匹配项、第二个、... 依次类推 匹配项在字符串中的位置和原始字符串**

```javascript


```















