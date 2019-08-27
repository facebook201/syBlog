<!--
 * @Author: shiyao
 * @Description: 
 * @Date: 2019-08-05 07:49:39
 -->

# 深入理解ES6

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
```

### 默认值

```javascript
function f({a, b = 0} = {a: ''}): void {}

f();
f({a: ''});
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