---
pageClass: getting-started
---

# Object

## for...in... Object.keys 和 Object.getOwnPropertyNames

**for in** 是以任意顺序遍历一个对象 自有、可继承、可枚举的非Symbol的属性。如果仅想输出自身的属性可以借助 hasOwnProperty。可以过滤掉原型链上的属性。for in是ES3就有的特性，ES3我们不能定义属性的枚举性，后来ES5可以定义枚举之后，就新增了 Object.keys、getOwnPropertyNames。所以现在基本用不到for in，可以用其他的方案替代。

```javascript
// 其实要注意有一种对象 Object.create(null) 出来的对象 是没有hasOwnProperty方法的
function hasOwnProp(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

for (let key in target) {
    if (hasOwnProp(target, key)) {
        console.log(key);
    }
}
```

**Object.keys** 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致。
**Object.getOwnPropertyNames** 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

```javascript
let parent = Object.create(Object.prototype, {
    a: {
        value: 'a',
        enumerable: true,
        writable: true,
        configurable: true
    }    
});

let child = Object.create(parent, {
    b: {
        value: 'b',
        enumerable: true,
        writable: true,
        configurable: true
    },
    c: {
        value: 'c',
        enumerable: false,
        writable: true,
        configurable: true
    }
});

for (let k in child) {
    // 会输出 b a 
    console.log(k);
}
console.log(Object.keys(child)); // ['b']
console.log(Object.getOwnPropertyNames(child)); // ['b', 'c']
```

## for..of 和迭代器 Iterator

**Iterator** 是一种接口, 各种不同的数据结构提供统一的访问机制,任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。
JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构。

### Iterator 的作用
* 一是为各种数据结构，提供一个统一的、简便的访问接口；
* 二是使得数据结构的成员能够按某种次序排列
* 三是ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

for ... of 循环在集合中先调用 [Symbol.iterator]() 方法。然后返回一个新的迭代器对象。 **(迭代器)** 就是一个具有 next() 方法的对象，每次调用 next() 都会返回一个结果对象，该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。

```javascript
// 创建一个迭代器
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        }
    };
}

var iter = createIterator([1, 2, 3]);

console.log(iter.next()); // { done: false, value: 1 }
console.log(iter.next()); // { done: false, value: 2 }
console.log(iter.next()); // { done: false, value: 3 }
console.log(iter.next()); // { done: true, value: undefined }
```
凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象

**for…of** 是ES6新增的遍历方式, 为了解决不需要索引、声明多余的变量、长度等不需要的数据。为了消除这种复杂度以及减少循环中的错误。所以引入了 for of。**ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是"可遍历的"（iterable** 

我们直接 for of 遍历一个对象，会报错，然而如果我们给该对象添加 Symbol.iterator 属性：
```javascript
const obj = {
    value: 1
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}
```
可以发现 for of 遍历的其实是对象的 Symbol.iterator 属性。

### 默认可遍历对象

ES6里面有的数据结构自己默认部署了Symbol.iterator属性吗，但是我们也可以手动修改这个属性:
```javascript
var colors = ["red", "green", "blue"];

colors[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (let color of colors) {
    console.log(color);
}
```
总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。
- 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
- 不同于forEach方法，它可以与break、continue和return配合使用。
- 提供了遍历所有数据结构的统一操作接口。

<br />
