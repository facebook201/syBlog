# 深入理解ES6

## Let + Const

const 定义的是 **不可重新赋值**的值，与不可变的值不同，const 定义的 Object，在定义之后仍可以修改其属性。其实他的使用场景很广，包括常量、配置项以及引用的组件、定义的 “大部分” 中间变量等，都应该以const做定义。反之就 let 而言，他的使用场景应该是相对较少的，我们只会在 loop(for，while 循环)及少量必须重定义的变量上用到他。

> 猜想：就执行效率而言，const 由于不可以重新赋值的特性，所以可以做更多语法静态分析方面的优化，从而有更高的执行效率。

## Template Strings （字符串模板）

``` javascript
// 1 与引号混用
const wantToSay = `I'am a "boy"`;

// 2支持多行文本
const slogan =
`
I have a pen!
`;

// 比较适合写 html
const resultTpl = 
`
  <section>
    <div>...</div>
  </section>
`;
```

## 解构赋值

```javascript
let arr = [1, 2, 3];
let [first, , third] = arr;

// ... 是剩下的值组成的数组
let [first, ...ret] = arr;
ret; //[2, 3]

first; // 1
third; // 3

let obj = {
  a: 'a',
  b: 1,
  c: [1, 2]
};

let {a, ...retObj} = obj;
retObj; // { b: 1, c: [1, 2] }

// 可以重新命名 newName就是 'a' newNameB 就是1 了
let {a: newName, b: newNameB} = obj;

let newName = obj.a;
let newNameB = obj.b;

const bookSet = ['UED', 'TB fed', 'Not find'];
const bookCollection = () => {
  return {book1: 'UED', book2: 'TB fed'};
};
  
// 1. 解构也可以设置默认值
const {book1, book3 = 'Not find'} = bookCollection();
  
// 2. 解构数组时候是可以跳过其中某几项的
const [book1,,book3] = bookSet;  // book1 = 'UED', book3 = 'Not find'
  
// 3. 解构可以取到指定对象的任何属性，包括它包含的方法
const {length: setLength} = bookSet;  // setLength = 3
```


## Symbol


## 集合 Set Map WeakMap WeakSet


### 默认值

```javascript
function f({a, b = 0} = {a: ''}): void {}

f();
f({a: ''});
```



## Proxy Reflect

* **Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。**

* **Reflect 内置对象 拦截 JavaScript 操作的方法**

```js
// Reflect 会返回一个结果 表示设置是否成功
const res = Reflect.set(target, key, value);
// 两个的意思是一样的
target[key] = value;
```



```js
const get = createGetter();
const set = createSetter();

function createGetter () {
  return function get(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver);
    console.log('响应式获取');
    return res;
  };
}

function createSetter () {
  return function set(target, prop, value, receiver) {
    const res = Reflect.set(target, prop, value, receiver);
    console.log('响应式设置');
    return res;
  };
}

const mutableHandler = {
  get,
  set
};

function reactive (target) {
  return createReactiveObject(target, mutableHandler);
}

function createReactiveObject (target, baseHandler) {
  const observer = new Proxy(target, baseHandler);
  return observer;
}

/**
 * shared 工具 方法
 */
function isObject (value) {
  return typeof value === 'object' && value !== null;
}

let obj = { name: '李四' };

const state = reactive(obj);

state.name;
state.name = '李四啊';
```







## 迭代器 Iterable

展开运算符 和 for of 语句遍历 iterable对象定义要遍历的数据。Array 和 Map是默认具有迭代行为的内置迭代器。对象是不可迭代的。

但是可以通过iterable 和 协议使他们变为可迭代的。当需要对一个对象进行迭代时（比如开始用于一个for..of循环中），它的@@iterator方法都会在不传参情况下被调用，返回的迭代器用于获取要迭代的值。一些内置类型拥有默认的迭代器行为，其他类型（如 Object）则没有。



### 迭代器的协议

为了变成可迭代对象， 一个对象必须实现 @@iterator 方法, 意思是这个对象（或者它原型链 prototype chain 上的某个对象）必须有一个名字是 Symbol.iterator 的属性，

当一个对象需要被迭代的时候（比如开始用于一个for..of循环中），它的@@iterator方法被调用并且无参数，然后返回一个用于在迭代中获得值的迭代器。

当一个对象只有满足下述条件才会被认为是一个迭代器：它实现了一个 next() 的方法并且拥有以下含义



#### 实现

```javascript

obj[Symbol.iterator] = function() {
  // iterator 是一个具有next方法的对象 它返回至少有一个对象 两个属性： value & done
  return {
    next: function() {
      if (this._countDown === 3) {
        const lastValue = this._countDown;
        return { value: this._countDown, done: true };
      }
      this._countDown = this._countDown + 1;
      return { vaulue: this._countDown, done: false };
    },
    _countDown: 0
  };
};
```

next方法的对象：

* done
  * true 迭代器超过了可以迭代的次数，这样 value的值可以被忽略
  * 如果迭代器可以产生序列中的下一个值，则为false。

next 方法必须要返回一一个对象，该对象有两个必要的属性： done和value，如果返回一个非对象值（比如false和undefined) 会展示一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) ("iterator.next() returned a non-object value") 的错误