---
pageClass: getting-started
---

# Object

Object
从上面的输出中挑选出一些常用方法和属性，会得到下面的列表：

- create⑤
- defineProperty⑤
- defineProperties⑤
- getPrototypeOf⑤
- getOwnPropertyDescriptor⑤
- keys⑤
- getOwnPropertyNames⑤
- preventExtensions⑤
- isExtensible⑤
- seal⑤
- isSealed⑤
- freeze⑤
- isFrozen⑤
- assign⑥
- getOwnPropertySymbols⑥
- is⑥
- setPrototypeOf⑥
- values⑧
- entries⑧
- getOwnPropertyDescriptors⑧

注解：⑤为ES5新增的方法；⑥为ES6(ES2015)新增的方法；⑧为ES8(ES2017)新增的方法

## create
该方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

**Object.create(proto, [propertiesObject])**

- proto 为新创建对象的原型对象，设置为null可创建没有原型的空对象。
- propertiesObject 包涵若干个属性的描述符和defineProperties的第二个参数一样。

```javascript
// 创建一个继承自Object.prototype的对象，有一个属性a，其可写，可配置，不可枚举，值为1。
Object.create(Object.prototype, {
	a: {
		value: 1,
		writable: true,
		configurable: true
	}
});

// 模拟实现create
if (typeof Object.create !== 'function') {
  Object.create = function(proto, propertiesObject) {
    function F() {}
    F.prototype = proto;

    return new F();
  }
}
```


## defineProperty 

Javascript 有一个用来描述属性的数据结构(属性描述对象)，控制它的行为。
```javascript
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
ECMAScript 中有两种属性：数据属性和访问器属性。
1. 数据属性
数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4 个描述其行为的特性。

 [[Configurable]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特
性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的
这个特性默认值为true。

 [[Enumerable]]：表示能否通过for-in 循环返回属性。像前面例子中那样直接在对象上定
义的属性，它们的这个特性默认值为true。

 [[Writable]]：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的
这个特性默认值为true。

 [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，
把新值保存在这个位置。这个特性的默认值为undefined。
对于像前面例子中那样直接在对象上定义的属性，它们的[[Configurable]]、[[Enumerable]]
和

[[Writable]]特性都被设置为true，而[[Value]]特性被设置为指定的值

2. 访问器属性
访问器属性不包含数据值；它们包含一对儿getter 和setter 函数（不过，这两个函数都不是必需的）。
在读取访问器属性时，会调用getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用
setter 函数并传入新值，这个函数负责决定如何处理数据。访问器属性有如下4 个特性。

 [[Configurable]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特
性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为true。

 [[Enumerable]]：表示能否通过for-in 循环返回属性。对于直接在对象上定义的属性，这
个特性的默认值为true。

 [[Get]]：在读取属性时调用的函数。默认值为undefined。

 [[Set]]：在写入属性时调用的函数。默认值为undefined。

## getPrototypeOf 

**getPrototypeOf** 方法返回指定对象的原型 

**Object.getPrototypeOf(obj)**
> obj 要返回其原型的对象。
> 返回值 给定对象的原型。如果没有继承属性，则返回 null 。

```javascript
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true

Object.getPrototypeOf( Function );             // ƒ () { [native code] }
Object.getPrototypeOf( Object ) === Function.prototype;        // true
Object.prototype === Object.getPrototypeOf( {} );               // true
```

Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
返回的当然是函数对象的原型，也就是 Function.prototype。

## getOwnPropertyDescriptor 
该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
Object.getOwnPropertyDescriptor(obj, prop)

> obj 需要查找的目标对象
> prop 目标对象内属性名称

如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

```javascript
let obj = {
  a: 12
};
let desc = Object.getOwnPropertyDescriptor(obj, 'a');
// { value: 12,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

## keys
该方法会返回一个由一个给定对象的**自身可枚举属性**组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致。


## getOwnPropertyNames
方法返回一个由指定对象的所有**自身属性的属性名**（**包括不可枚举属性但不包括Symbol值作为名称的属性**）组成的数组。

所以keys和getOwnPropertyNames的最大区别就是不可枚举的属性

```javascript
let obj = {
  a: 12
};

Object.defineProperty(obj, 'name', {
  writable: true,
  configurable: true,
  enumerable: false,
  value: 'zhangsan'
});

console.log(Object.keys(obj)); // ['a']
console.log(Object.getOwnPropertyNames(obj)); // ['a', 'name']
console.log(Object.getOwnPropertyNames(['hello', 'world'])); // ['0', '1', 'length']
```

## preventExtensions
Object.preventExtensions() 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

> 需要注意的是不可扩展的对象的属性通常仍然可以被删除。 只能阻止一个对象不能再添加新的自身属性，仍然可以为该对象的原型添加属性。


## freeze

Object.freeze() 方法可以冻结一个对象。冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。

## Object.assign(target, ...sources)
用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

> target 目标对象。 sources 源对象。

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。

## isPrototypeOf(obj)
方法用于测试一个对象是否存在于另一个对象的原型链上。**objA.isPrototypeOf(objB)** 表示objA是否在objB的原型链上。

```javascript
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

## propertyIsEnumerable
方法返回一个布尔值，表示指定的属性是否可枚举。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false

obj.propertyIsEnumerable(prop)

```javascript
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```

## setPrototypeOf
Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。


## valueOf
valueOf方法返回**指定对象的原始值**。
JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。

默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。

JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。

不同类型对象的valueOf()方法的返回值

| 对象     | 返回值                                                 |
| -------- | ------------------------------------------------------ |
| Array    | 返回数组对象本身。                                     |
| Boolean  | 布尔值                                                 |
| Date     | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC |
| Function | 函数本身                                               |
| Number   | 数字值。                                               |
| Object   | 对象本身。这是默认情况                                 |
| String   | 字符串值                                               |

你可以在自己的代码中使用valueOf将内置对象转换为原始值。 创建自定义对象时，可以覆盖Object.prototype.valueOf()来调用自定义方法，而不是默认Object方法。

## toString

返回一个表示该对象的字符串。
每个对象都有一个toString()方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString()方法被每个Object对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中type是对象的类型


## valueOf 和 toString 的区别

```javascript

let test = {
  age: 20,
  // 重写 toString
  toString() {
    return this.age - 10;
  },
  // 重写 valueOf
  valueOf() {
    return this.age + 40;
  }
};

console.log(test > 20);
console.log(+test);
```

* valueOf 应用于运算 toString应用于显示
* 在进行对象转换成字符串的时候 优先调用toString，如果没有toString 就使用valueOf方法 如果都没有就使用Object的toString方法输出
* 在进行强制转字符串类型的时候优先调用toString方法，转数字优先调用valueOf
* 有运算符的情况下 valueOf的优先级高于toString


