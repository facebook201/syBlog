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

symbol 是一种基本数据类型，Symbol() 函数 会返回 symbol类型的值。**一个symbol 值一般作为对象属性的标识符，这是该数据类型仅有的目的**

```js
let id = Symbol('id'); // 参数是一个描述符 也叫 Symbol名

```

Symbol 保证是唯一的，即使我们创建了许多具有相同描述的Symbol，但是值不同。



### 隐藏的属性

Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。

例如，如果我们使用的是属于第三方代码的 `user` 对象，我们想要给它们添加一些标识符。

```js
let user = { // 属于另一个代码
  name: "John"
};

let id = Symbol("id");
user[id] = 1;
alert( user[id] ); // 我们可以使用 Symbol 作为键来访问数据

//
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // 而不是 "id"：123
};
```

> 使用symbol比字符串来做键值有什么好处呢？

* 第三方代码看不到 不会被意外访问

* 每个symbol 不一样，所以不会被篡改

* ### Symbol 在 for…in 中会被跳过



## 集合 Set Map WeakMap WeakSet

### Map

是一个带键的数据项的集合，允许任何类型的键。

应该使用Map 提供的 get set方法来添加和删除值。



### Map 迭代

- `map.keys()` —— 遍历并返回所有的键（returns an iterable for keys），
- `map.values()` —— 遍历并返回所有的值（returns an iterable for values），
- `map.entries()` —— 遍历并返回所有的实体（returns an iterable for entries）`[key, value]`，`for..of` 在默认情况下使用的就是这个。



### Set

`Set` 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。



### WeakMap

WeakMap 和 Map的第一个区别是 WeakMap 键必须是对象，不能是原始值。

weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用
// john 被从内存中删除了！
```

`WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。所以没有办法获取 `WeakMap` 的所有键或值。

`WeakMap` 只有以下的方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`



### 哪里会用到

`WeakMap` 的主要应用场景是 **额外数据的存储**。



### weakSet

- 与 `Set` 类似，但是我们只能向 `WeakSet` 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 set 中。
- 跟 `Set` 一样，`WeakSet` 支持 `add`，`has` 和 `delete` 方法，但不支持 `size` 和 `keys()`，并且不可迭代。

变“弱（weak）”的同时，它也可以作为额外的存储空间。但并非针对任意数据，而是针对“是/否”的事实。`WeakSet` 的元素可能代表着有关该对象的某些信息。



`WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问它们，便会将它们与其关联值一同删除。

`WeakSet` 是类似于 `Set` 的集合，它仅存储对象，并且一旦通过其他方式无法访问它们，便会将其删除。

它们都不支持引用所有键或其计数的方法和属性。仅允许单个操作。

`WeakMap` 和 `WeakSet` 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 `WeakMap` 或 `WeakSet` 的键，那么它将被自动清除。



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