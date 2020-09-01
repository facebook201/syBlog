---
pageClass: getting-started
---

# JS基础知识

## 数据类型

### null 和 undefined

null 和 undefined 都是js的关键字。 null表示一个空值，typeof 运算符返回的是 object。undefined 表示变量没有初始化。null`是一个表示“空”的对象，转为数值时为`0`；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN



| 区别     | null   | undefined                   |
| -------- | ------ | --------------------------- |
| 值类型   | 空值   | 变量未赋值                  |
|          |        | 函数没有返回就返回undefined |
| typeof   | object | undefined                   |
| == 判断  | 相等   | 相等                        |
| 转为数字 | 0      | NaN                         |



>null`表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入`null`，表示该参数为空。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入`null`，表示未发生错误。



> undefined
>
> 变量未定义 是undefined
>
> 函数没有返回值 返回undefined
>
> 对象没有赋值的属性



### 数值

javascript所有数字都是以64位浮点数形式存储。即使整数也是一样的 1 和 1.0 没有区别。**由于浮点数不是精确的值 所以涉及小数的比较和运算要小心**

```javascript
0.1 + 0.2 === 0.3; // false

0.3 / 0.1; // 2.999999999

(0.3 - 0.2) === (0.2 - 0.1); // false
```
### 数值精度

javascript的数字是 IEEE754标准。

> 第1位：符号位，0表示正 1表示负
>
> 第2位到12：指数部分
>
> 第13到64：小数部分 有效数字



### parseInt 

将字符串转为整数。

```javascript
parseInt('123'); // 123
parseInt(1.23); // 1
parseInt('1.23'); // 1

parseInt('abc'); // NaN
```



### isNaN

方法可以用来判断一个值是否为NaN。但是参数只对数值有效，其他的则会先转成数值。比如传字符串，则先转成NaN，再返回true，所以isNaN为true的值有可能不是NaN，而是一个字符串。



```javascript
isNaN('hello'); // true
isNaN(123); // false
isNaN(NaN); // true
```



### 字符串

字符串虽然看起来像是字符数组，可以使用数组方括号运算符，用来返回某个位置的字符。如果超过了字符串的长度，就返回undefined。**但是字符串与数组的相似性仅此而已 无法改变字符串中的单个字符。**

```javascript
var s = 'hello';
delete s[0];
s // "hello"
s[1] = 'a';
s // "hello"
s[5] = '!';
s // "hello"
```

length 属性返回字符串的长度，该属性也是无法改变的。



### 对象

什么是对象？简单说，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

```javascript
let obj = {
  name: '张三',
  age: 25
};
```
**对象的引用**
如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

**属性的读取**
读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。
```javascript
let obj = {
  p: 'Hello World'
};

obj.p // "Hello World"
obj['p'] // "Hello World"
```
**属性查看**
查看一个对象本身的所有属性，可以使用`Object.keys`方法。

**属性删除 delete**

```javascript
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []
```
上面删除对象的属性之后，再读取就是返回undefined，keys方法也不会返回这个属性。delete只能删除自身属性 无法删除继承属性。

**属性是否存在 in运算符** 

`in`运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回`true`，否则返回`false`。它的左边是一个字符串，表示属性名，右边是一个对象。

```javascript
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

`in`运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。就像上面代码中，对象`obj`本身并没有`toString`属性，但是`in`运算符会返回`true`，因为这个属性是继承的。



### 二进制运算符
* | 或操作符 只要有1就是1

  ```javascript
  let ret = 25 | 3; // 27
  ```

* & 按位与操作符 同为1的才为1

  ```java
  let res = 25 & 3; // 1
  ```

* ~ 按位非操作符 返回数值的反码，就是0返回1 1返回0。本质也是 原来的数值变负 再减去1 

  ```javascript
  let num = 25;
  ~num; // -26
  ```

* > let num = 25;
  >
  > ~num = -26;

* ^ 异或运算符 相同为0 不相同为1

  | 第一个数 | 第二个数 | 结果 |
  | -------- | -------- | ---- |
  | 1        | 1        | 0    |
  | 1        | 0        | 1    |
  | 0        | 1        | 1    |
  | 0        | 0        | 0    |

  ```javascript
  let res = 25 ^ 3; // 26
  ```

  

* 》左移运算符 将所有位向左移动指定的位数

  ```javascript
  let old = 2; // 二进制的 10
  let new = old << 5; // 二进制的 1000000 十进制的 64
  ```

* 《 右移运算符 将所有位向右移动指定的位数

  ```javascript
  let old = 64; // 二进制的 1000000
  let new = old >> 5; // 二进制的 10 十进制的 2
  ```

  

* \>>> 无符号右移

  这个操作符会将数值的所有32 位都向右移动。对正数来说，无符号右移的结果与有符号右移相同。

  ```javascript
  let old = 64; // 二进制的 1000000
  let new = old >>> 5; // 二进制的 10 十进制的 2
  ```



### 布尔操作符

* 逻辑非 !

  可以应用于ECMAScript中的任何值。都会返回一个布尔值。逻辑非操作符首先将操作数转为一个布尔值，然后再对其求反。

   如果操作数是一个对象，返回false；

   如果操作数是一个空字符串，返回true；

   如果操作数是一个非空字符串，返回false；

   如果操作数是数值0，返回true；

   如果操作数是任意非0 数值（包括Infinity），返回false；

   如果操作数是null，返回true；

   如果操作数是NaN，返回true；

   如果操作数是undefined，返回true。

  

* 逻辑与 && 

  | 第一个操作数 | 第二个操作数 | 结果  |
  | ------------ | ------------ | ----- |
  | true         | true         | true  |
  | true         | false        | false |
  | false        | false        | false |
  | false        | true         | false |

  也可以应用于任何类型

   如果第一个操作数是对象，则返回第二个操作数；

   如果第二个操作数是对象，则只有在第一个操作数的求值结果为true 的情况下才会返回该

  对象；

   如果两个操作数都是对象，则返回第二个操作数；

   如果有一个操作数是null，则返回null；

   如果有一个操作数是NaN，则返回NaN；

   如果有一个操作数是undefined，则返回undefined。

  它属于短路操作符。只要第一个是fase 无论第二个是什么都是false。

  

* 逻辑或 ||

  | 第一个操作数 | 第二个操作数 | 结果  |
  | ------------ | ------------ | ----- |
  | true         | true         | true  |
  | true         | false        | true  |
  | false        | true         | true  |
  | false        | false        | false |

   如果第一个操作数是对象，则返回第一个操作数；

   如果第一个操作数的求值结果为false，则返回第二个操作数；

   如果两个操作数都是对象，则返回第一个操作数；

   如果两个操作数都是null，则返回null；

   如果两个操作数都是NaN，则返回NaN；

   如果两个操作数都是undefined，则返回undefined。

  与逻辑与操作符相似，逻辑或操作符也是短路操作符。也就是说，如果第一个操作数的求值结果为

​       true，就不会对第二个操作数求值了



### 相等操作符 ==

相等操作符不会比较两个操作数的类型，所以存在隐式转换的问题。

在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则：

 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为0，而

true 转换为1；

 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值；

 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类

型值按照前面的规则进行比较；

这两个操作符在进行比较时则要遵循下列规则。

 null 和undefined 是相等的。

 要比较相等性之前，不能将null 和undefined 转换成其他任何值。

 如果有一个操作数是NaN，则相等操作符返回false，而不相等操作符返回true。重要提示：

即使两个操作数都是NaN，相等操作符也返回false；因为按照规则，NaN 不等于NaN。

 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，

则相等操作符返回true；否则，返回false。



### switch case



switch … case 结构要求。在每一个case的最后一行必须是break语句。否则会接着运行下一个case。这样太冗长。而且不使用大括号 不利于代码形式的统一。

```javascript
function doSomething(action) {
  switch(action) {
    case 1:
      return 1;
    break;
    
    case 2:
      return 2;
    break;
    
    case 3:
      return 3;
    break;

    default:
      throw new Error('Invalid action');
  }
}

// 可以把上面的结构改成 对象结构
function doSomething(action) {
  var action = {
  	'1': function() {
      return 1;
    },
    '2': function() {
      return 2;
    },
    '3': function() {
      return 3;
    }
  };
  if (typeof action[action] !== 'function') {
  	throw new Error('Invalid action');
  }
}
```



## 事件循环

> JS 执行流程和 Nodejs中的流程都是基于事件循环的
>
> 一个在 JavaScript 引擎等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无限循环。



#### 宏任务和微任务

微任务仅来自于我们的代码。它们通常是由 promise 创建的：对 `.then/catch/finally` 处理程序的执行会成为微任务。微任务也被用于 `await` 的“幕后”，因为它是 promise 处理的另一种形式。

还有一个特殊的函数 `queueMicrotask(func)`，它对 `func` 进行排队，以在微任务队列中执行。

**每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他的宏任务，或渲染，或进行其他任何操作。**



- 队列（queue）是先进先出的：首先进入队列的任务会首先运行。
- 只有在 JavaScript 引擎中没有其它任务在运行时，才开始执行任务队列中的任务。

