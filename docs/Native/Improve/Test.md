<!--
 * @Author: shiyao
 * @Description: 
 * @Date: 2019-08-26 22:03:40
 -->
# JS 基础题

## 变量定义

```javascript
var array = [];
for (var i = 0; i < 3; i++) {
    // 三个函数体的i都指向一个相同的绑定 如果是let 就是各自的绑定
    array.push(() => i);
}
var newArray = array.map(el => el());
```
var 没有块级作用域，它声明的变量 不是函数范围就是全局的。他们在块是可见的。所以上面的var定义的i 在循环后是可见的，它是全局
变量。如果使用let声明一个具有块级作用域的变量，则为每一个循环迭代创建一个新的绑定。


## JS运行机制

```javascript
function foo() {
  setTimeout(foo, 0); // 是否存在堆栈溢出错误?
}
```
JS的并发模型基于 "事件循环"。让我们说 "浏览器是JS的家" 我们真正的意思是浏览器提供运行时环境来执行我们的JS代码。
浏览器的主要组件包括**调用堆栈，事件循环、任务队列、Web API** setTimeout、Promise 这样的全局函数不是 js的一部分，是WebAPI的一部分。

### JavaScript的运行环境

下面这个图来自Fundebug的图片
![border](https://raw.githubusercontent.com/facebook201/sy-fontend-system/master/img/js.png)

JS调用栈是后进先出(LIFO), 引擎每次从堆栈中取出一个函数，然后从上到下依次运行代码。每当它遇到一些异步代码，都会交给
Web API，每当事件被触发时，callback都会被发送到任务队列。

事件循环 不断地监视任务队列（Task Queue）, 并且按他们排队的顺序一次处理一个回调。每当调用堆栈为空时。Event Loop 获取
回调将其放入堆栈中进行处理，**如果堆栈不是空的，则事件循环不会将任何回调推入堆栈。**


```javascript
function foo() {
  return Promise.resolve().then(foo);
} 
```

下面这个微任务(Promise)跟setTimeout(宏任务)的区别是执行方式，宏任务在单个循环周期中一次一个地推入堆栈，但是微任务队列总是在执行后返回到事件循环之前清空。因此如果你以处理条目的速度向这个队列添加条目，那么你就永远在处理微任务 只有当微任务为空 事件循环才会重新渲染页面。

### 可迭代对象
**在数组或函数参数中使用展开语法时, 该语法只能用于可迭代对象**
```javascript
const obj = { x: 1, y: 2 };
const arr = [...obj]; // TypeError obj is not iterable
```
展开运算符 和 for of 语句遍历 iterable对象定义要遍历的数据。Array 和 Map是默认具有迭代行为的内置迭代器。对象是不可迭代的。
但是可以通过iterable 和 协议使他们变为可迭代的。

当需要对一个对象进行迭代时（比如开始用于一个for..of循环中），它的@@iterator方法都会在不传参情况下被调用，返回的迭代器用于获取要迭代的值。
一些内置类型拥有默认的迭代器行为，其他类型（如 Object）则没有。下表中的内置类型拥有默认的@@iterator方法：

* Array.prototype[@@iterator]()
* TypedArray.prototype[@@iterator]()
* String.prototype[@@iterator]()
* Map.prototype[@@iterator]()
* Set.prototype[@@iterator]()

```javascript
const obj = { x: 'x', y: 'y' };
obj[Symbol.iterator] = function() {
  return {
    next() {
      if (this._countDown === 3) {
        const lastValue = this._countDown;
        return {
          value: this._countDown,
          done: true
        };
      }
      this._countDown = this._countDown + 1;
      return { value: this._countDown, done: false };
    },
    _countDown: 0
  };
}

```



