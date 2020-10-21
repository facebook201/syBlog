# javascript 专题



## 函数防抖

前端开发过程中经常有一些事件触发。但是在触发事件的过程中触发的回调是非常惊人的，所以我们要想办法控制，要做的是控制调用的频率。比如300ms一次。这种控制函数执行的频率在前端有个专业名词叫：**函数节流**



> 函数节流：让一个函数不要执行的太频繁 减少一些过快的调用来节流。
>
> 函数去抖：对于一定时间段的连续的函数调用，只让其执行一次。



#### throttle应用场景

* DOM元素的拖拽功能实现

* 射击游戏的事件

* 计算鼠标移动的距离

* Canvas模拟功能

* 搜索联想（keyup）

* 监听滚动事件判断是否到页面底部自动加载更多 给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次  

  

throttle 和 debounce 的应用场景应该是分的很清楚的

- 按一个按钮发送 AJAX：给 click 加了 debounce 后就算用户不停地点这个按钮，也只会最终发送一次；如果是 throttle 就会间隔发送几次
- 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次



#### debounce 

函数去抖有哪些应用场景？哪些时候对于连续的事件响应我们只需要执行一次回调？

- 每次 resize/scroll 触发统计事件
- 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）



#### 防抖 debounce实际场景

例如鼠标mousemove事件触发，如果我们在页面上触发这个事件来执行一些操作，这样会不断地执行这个事件函数。

> 防抖的原理：你随便怎么触发事件 但是一定在事件触发的n秒时候才执行，如果你在一个事件触发的n秒以内再次触发了这个事件，那么就以新的事件的时间为准，n秒之后才执行。总之就是要等到触发事件n秒以内不再触发事件才执行。



第一种可以使用定时器来做 当在固定时间内再次触发就清除定时间重新生成定时器。

```javascript
  var con = doc.getElementById('container');
  var count = 0;
  con.onmousemove = debounce(getUserAction, 200);
  function getUserAction() {
    console.log(this);
    con.innerHTML = count++;
  }

  /**
   * @param { func } 去抖要执行的函数
   * @param { time } 控制的时间频率
   */
    /**
   * @param { func } 去抖要执行的函数
   * @param { time } 控制的时间频率
   */
  function debounce(func, time) {
    var timeout;
    return function() {
      // 保存this上下文
      var context = this;
      // 如果要传event对象 就传args
      var args = Array.prototype.slice.call(arguments);
      clearTimeout(timeout);
      timeout = setTimeout(_ => {
        func.apply(context, args);
      }, time);
    }
  }
```

如果我们加上一个立即执行的需求，就是立即执行，然后等触发的n秒之后才能重新触发执行。加一个immediate参数判断是否立即执行。

```javascript
  function debounce(func, time, immediate) {
    var timeout;
    var debounced = function() {
      // 保存this上下文
      var context = this;
      // 如果要传event对象 就传args
      var args = Array.prototype.slice.call(arguments);
      if (timeout) {
        clearTimeout(timeout);
      }
      // 如果要立即执行
      if (immediate) {
        // 如果已经执行过了 不在执行
        var callNow = !timeout;
        timeout = setTimeout(_ => {
          timeout = null
        }, time);
        if (callNow) {
          result = func.apply(context, args);
        }
      } else {
        timeout = setTimeout(_ => {
          func.apply(context, args);
        }, time);
      }
      return SpeechRecognitionResult;
    };
    // 主动取消
    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  }
```



## 函数节流

> 如果你持续触发事件，每隔一段时间，只执行一次事件。固定的时间内肯定执行一次。

#### 使用时间戳来计算

设置一个初始时间0，然后当前的时间戳 跟初始时间减大于设置的时间，才执行。然后更新时间戳为当前的时间戳 如果小于 就不执行。

```javascript
  /**
   * @param { func } 去抖要执行的函数
   * @param { time } 控制的时间频率
   */
  function throttle(func) {
    let timestrap = 0;
    let context, args;

    return function() {
      context = this;
      args = arguments;
      // + new Date() 把日期对象先转为Number 调用其valueOf 方法 得到就是时间戳
      let now = +new Date();
      if (now - timestrap > time) {
        func.apply(context, this);
        timestrap = now;
      }
    }
  }
```

#### 定时器

```javascript
  // 定时器版本
  function throttleTimer(func, time) {
    let arg, context;
    let timeout;
    let previous = 0;
    
    return function() {
      context = this;
      args = arguments;

      if (!timeout) {
        timeout = setTimeout(_ => {
          // 立即设置null
          timeout = null;
          func.apply(context, args);
        }, time);
      }
    }
  }
```

下面是underscore的版本 考虑鼠标移入就立即执行 停止的时候还触发一次。

```javascript
/**
   * 函数节流 underscore源码
   * 执行函数
   * 执行频率
   * 设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:
   * leading：false 表示禁用第一次执行
   * trailing: false 表示禁用停止触发的回调
   */
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;

    // 标记时间戳
    var previous = 0;

    options = options || {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
    };

    return function() {
      var now = _.now();
      if (!previous && options.leading === false)
      previous = now;

      // 距离下次触发 func 还需要等待的时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
      // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
      // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
      // 之后便会把 previous 值迅速置为 now
      // ========= //
      // remaining > wait，表示客户端系统时间被调整过
      // 则马上执行 func 函数
      // @see https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs
      // ========= //

      // console.log(remaining) 可以打印出来看看
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          // 解除引用，防止内存泄露
          timeout = null;
        }

        // 重置前一次触发的时间戳
        previous = now;

        // 触发方法
        // result 为该方法返回值
        // console.log('A')
        result = func.apply(context, args);

        // 引用置为空，防止内存泄露
        // 感觉这里的 timeout 肯定是 null 啊？这个 if 判断没必要吧？
        if (!timeout)
          context = args = null;
      } else if (!timeout && options.trailing !== false) { // 最后一次需要触发的情况
        // 如果已经存在一个定时器，则不会进入该 if 分支
        // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
        // 间隔 remaining milliseconds 后触发 later 方法
        timeout = setTimeout(later, remaining);
      }

      // 回调返回值
      return result;
    }
```



## 类型判断

类型判断在web开发中有很广泛的应用。

### typeof

typeof是一元操作符。放在操作数的前面 操作数可以是任意类型 返回的值是一个表示操作数类型字符串。

```javascript
typeof 'yayu'; // string
```

Undefined、Null、Boolean、Number、String、Object。使用typeof 对上面的值操作返回的结果不会是一一对应的 **undefined、object、boolean、number、string、object** 而且typeof却能检测出函数类型：

```javascript
function a() {}

typeof a; // 'function'
```

但是很多其他类型 比如 Date、Error 都不能区分 都是object类型的。所以引入另一个方法。

### object.prototype.toString

调用Object.prototype.toString 方法会返回一个由"[object]"和class和"]"组成的字符串，而class是要判断的对象的内部属性。

```javascript
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(new Date()); // [object Date]
```

这种方法最多可以识别12中类型 **Number、String、Boolean、Undefined、Null、Object、Array、Date、Error、RegExp、Function、Math、JSON、Arguments **

但是有一种情况在 IE6中null和undefined会被Object.prototype.toString都是 [object Object]！

```javascript
let classType = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(item, index) {
  classType["[object " + item + "]"] = item.toLowerCase();
});

function type(obj) {
  if (obj == null) {
    return obj + '';
  }

  return typeof obj === 'object' || typeof obj === 'function' ?
    classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
}

// 使用
function a() {};
function isFunction(fun) {
  return type(fun) === 'function';
}
function isNull(n) {
  return type(n) === 'null';
}
console.log(isFunction(a));
console.log(isNull(null));
```



## plainObject 纯对象 

纯粹的对象 每个框架的理解不一样。jquery里面的有一个plainObject的方法。现在来看看它是怎么写的

```javascript
var classType = {};
var toString = classType.toString;
var hasOwn = classType.hasOwnProperty;

function isPlainObject(obj) {
  var proto, Ctor;

  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }

  proto = Object.getPrototypeOf(obj);
  // 没有原型的对象 Object.create(null)
  if (!proto) {
    return true;
  }

  /**
   * 判断 proto 是否有 constructor 属性。
   */
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

  // 这里判断Ctor构造函数是不是Object构造函数 用于区分自定义构造函数和Object构造函数
  return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}
```

### 判断是不是空对象

```javascript
function isEmptyObject( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }

       return true;
}
```

## 深拷贝

 ::: tip 深拷贝和浅拷贝

JS的变量类型分为值类型（基本类型）和引用类型；对值类型进行复制操作会对值进行一份拷贝，而对引用类型赋值 则会对地址进行拷贝，最终两个变量指向同一份数据。如果修改引用类型，则会影响到另一个。**浅拷贝是进行一层拷贝，深拷贝就是无限层级拷贝**。

:::



#### 数组的浅拷贝

数组里面的slice、concat返回一个新数组来实现浅拷贝。但是如果数组里面有对象，那么只能拷贝引用，无论是修改新老数组还是会改变内部的对象值。



#### 深拷贝

JSON.parse(JSON.string(arr)) 这个方法大部分情况是可以的。但是有些是无法克隆的。

* 对函数 、RegExp等特殊对象的克隆
* 会抛弃对象的constructor,所有的构造函数会指向Object
* 对象有循环引用,会报错

```javascript
// 构造函数
function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

// 函数
function say() {
  console.log('hi');
};

const oldObj = {
  a: say,
  b: new Array(1),
  c: new RegExp('ab+c', 'i'),
  d: Messi
};

const newObj = JSON.parse(JSON.stringify(oldObj));

// 无法复制函数
console.log(newObj.a, oldObj.a); // undefined [Function: say]
// 稀疏数组复制错误
console.log(newObj.b[0], oldObj.b[0]); // null undefined
// 无法复制正则对象
console.log(newObj.c, oldObj.c); // {} /ab+c/i
// 构造函数指向错误
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: Object] [Function: person]
```



### 深拷贝

```javascript
var deepCopy = function(obj) {
  if (typeof obj !== 'object') return obj;
  var newObj = obj instanceOf Array ? [] : {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
        newObj[key] = typeof obj[k] === 'object' ? deepCopy(obj[k]) : obj[k];
    }
  }
  return newObject;
}
```



## 纯函数

满足下面两个条件就是纯函数：

* 传入的参数相同时 函数总返回相同的结果
* 函数执行不产生副作用



:::tip 副作用 Side Effects

**副作用简单来说就是，对所处环境有改变，多次改变或调用有副作用的语句或函数，结果不一定保持一致。相反如果多次调用的结果是一致的，那纯函数就是这样的。在函数编程中如果有如下行为则称之为副作用**

* **修改一个变量**
* **修改一个对象的字段值**
* **抛出异常**
* **读写文件、网络、数据库**

:::





## 柯里化函数

柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

```javascript
function add(a, b) {
  return a + b;
}

// curyy 假设是一个柯里化函数
var curryAdd = curry(add);
curryAdd(2)(3); // 5
```



### 用途

* 参数可以复用 我们如果把多个参数 换成一个个传进去，这样就有可能说某些参数 是可以复用的 不用每次都传。
* 

```javascript
function curry(fn, args) {
    var length = fn.length;
    args = args || [];
    return function() {
        var _args = args.slice(0),
            arg, i;
        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            _args.push(arg);
        }
      	// 根据预定的参数个数跟 实际传的参数对比
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}
var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});
fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
```



## 偏函数

局部应用是固定一个函数的一些参数，然后产生另一个更小元的函数(**元指的是函数的参数个数 两个参数称为二元函数**)

* 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
* 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。

```javascript
var _ = {};

function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var position = 0, len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while(position < arguments.length) {
      args.push(arguments[position++]);
    }
    return fn.apply(this, args);
  }
}

var subtract = function(a, b) { return a - b };
sub = partial(subtract, _, 20); // [5, 20]
console.log(sub(5)); // -15
```



## 惰性函数

当一个函数被大量调用，且这个函数里有许多判断来检测函数，这样对于一个调用会浪费时间和浏览器资源，所有当第一次判断完成之后，直接把这个函数改写不需要再判断。

```javascript
function foo() {
    if (foo.t) return foo.t;
    foo.t = new Date();
    return foo.t;
}
// 上面的代码 每次都要去判断foo.f 这样也是多余的步骤
var foo = function() {
  var t = +new Date();
 	// 当第一次调用foo 后 得到new Date。然后立即改写这个函数 那么后面的就会调用下面的代码
  foo = function() {
    return t;
  }
  return foo();
}

foo();
foo();
```

**惰性函数的原理就是重写函数 就是这样简单**

### 其他应用

* DOM事件添加

```javascript
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function(type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  } else if (window.attachEvent) {
    addEvent = function(type, el, fn) {
      el.attachEvent('on' + type, fn);
    }
  }
  addEvent(type, el, fn);
}
```

* 创建 XHR对象

```javascript
function createXHR() {
  var xhr;
  if (typeof XMLHttpRequest != void 0) {
    xhr = new XMLHttpRequest();
    createXHR = function() {
      return new XMLHttpRequest();
    }
  } else {
    xhr = new ActiveXObject("Msxml2.XMLHTTP");
    createXHR = function(){
    	return new ActiveXObject("Msxml2.XMLHTTP");
    }
  } 
}
```



## 组合函数

假设现在有一个需求，我们根据输入的数字( 1- 7) 来判断是周几。来返回周几应该吃什么？

```javascript
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Saturday', 'Sunday'];

const whatDay = x => weekdays[x - 1];
const doSome = x => 'Today is ' + x;
const greet = x => doSome(whatDay(x));

console.log(greet(1)); // Today is Monday
```

我们首先获取周几，然后拼接字符串得到 Today is xxx;

如果可以实现一个 compose函数。类似

```javascript
const compose = function(f,g) {
    return function(x) {
        return f(g(x));
    };
};
```

如果我们要支持多个参数的传递呢

```javascript
// 来自underscore的compose方法
function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};
```



## 函数记忆(缓存)

函数记忆是指将上次的计算结果缓存起来，下次调用的时候 如有相同的参数直接返回缓存中数据。

```javascript
function add(a, b) {
  return a + b;
}

var memoizedAdd = memoize(add);

memoizedAdd(1, 2); // 3
memoizedAdd(1, 2); // 3

function memoize(fn, hasher) {
  const memoize = function(key) {
    let cache = memoize.cache;
    // 如果没有传hasher函数生成hash属性 就使用第一个参数当做属性key
    let address = '' + (hasher ? hasher.apply(this, arguments) : key);
    // 如果没有命中缓存 就存起来
    if (!cache[address]) {
      cache[address] = fn.apply(this, arguments);
    }
    // 命中缓存 返回命中的结果
    return cache[address];
  }
  memoize.cache = Object.create(null);
  return memoize;
}
```



## 递归

递归(recursion) 指的是**程序调用自身的一种技巧**

```javascript
function factorial(n) {
  if (n == 1) return n;
  return n * factorial(n - 1);
}
```

递归的特点：

* 子问题须与原始问题为同样的事，且更为简单
* 不能无限调用自己 必须有个出口 化简为非递归状况处理



### 执行上下文栈

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。 那么递归调用的话就会有很大的性能开销，**尾调用可以进行优化**

**尾调用是指函数内部的最后一个动作是函数调用。该函数的返回值、直接返回给函数。**



### 尾递归函数

普通的递归会在展开的时候产生非常大的中间缓存，每一个中间缓存都会占用我们的栈上时间，如果n很大的话 就会产生爆栈的情况。

**若函数在尾位置调用自身（或是一个尾调用本身的其他函数等等），则称这种情况为**尾递归**。尾递归也是[递归](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E9%80%92%E5%BD%92)的一种特殊情形。尾递归是一种特殊的尾调用，即在尾部直接调用自身的递归函数。对尾递归的优化也是关注尾调用的主要原因。尾调用不一定是递归调用，但是尾递归特别有用，也比较容易实现**

1、尾部调用的是函数自身

2、可以通过优化 使得计算仅占用常量栈空间



### 手动优化尾递归

**任何可以被定义的函数 都可以被改为迭代的程序 《javascript数据结构与算法》里面说过**

那么怎么把一个递归函数优化成迭代循环：

* 首先把尾递归代码先写出来
* 将参数提取出来 成为迭代变量 原来的参数则用来初始化迭代变量
* 创建一个迭代函数 迭代函数只用来更新迭代变量
* 将原来函数里面所代码( 不包括我们上面的迭代函数和迭代变量初始化 ) 包在一个while(true) 迭代循环里面 加上一个 label用于标识循环
* 递归终止的return 不变，尾递归的return 替换换成迭代函数 并且continue掉上面的迭代循环 

```javascript
function fact_iter(_n, _r) { // <= _n, _r 用作初始化变量
  var n = _n;
  var r = _r; // <= 将原来的 n, r 变量提出来编程迭代变量
  function _fact(_n, _r) { // <= 迭代函数非常简单,就是更新迭代变量而已
      n = _n;
      r = _r;
  }
  _fact_loop: while (true) { // <= 生成一个迭代循环
      if (n <= 0) {
          return r;
      } else {
          _fact(n - 1, r * n); continue _fact_loop; // <= 执行迭代函数，并且进入下一次迭代
      }
  }
}
```



## 乱序排序

乱序就是把数组打乱。

```javascript
const values = [1, 2, 3, 4, 5];
values.sort(_ => Math.random() - 0.5);
console.log(values);
```

Math.random() - 0.5 随机得到一个正数，负数 或者0。如果是正数降序排列，负数升序。0不变。但是这个方法是概率不均等的。

```javascript
let test = new Array(10).fill(0);
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let i = 0;

const shuffle = nums => nums.sort(_ => Math.random() - 0.5);

for (; i < 10000; i++) {
  let ret = shuffle(arr.slice(0));
  ret.forEach((el, i) => {
    test[i] += el;
  });
}

test = test.map(el => el / 10000);
console.log(test);
// [3.8579, 3.8811, 4.569, 4.6564, 4.7021, 4.3306, 4.3895, 4.7192, 4.8053, 5.0889]
```

结果发现**越大的数字出现在越后面的概率越大**。因为 **V8 在处理sort方法的时候当数据长度小于10的时候 使用插入排序 否则就是快速排序和插入排序的混合排序**





