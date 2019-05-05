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

## Object.create
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


## Object.defineProperty 
该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

ECMAScript 中有两种属性：数据属性和访问器属性。

1. 数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4 个描述其行为的

特性。

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

和[[Writable]]特性都被设置为true，而[[Value]]特性被设置为指定的值



2. 访问器属性

访问器属性不包含数据值；它们包含一对儿getter 和setter 函数（不过，这两个函数都不是必需的）。

在读取访问器属性时，会调用getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用

setter 函数并传入新值，这个函数负责决定如何处理数据。访问器属性有如下4 个特性。

 [[Configurable]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特

性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为

true。

 [[Enumerable]]：表示能否通过for-in 循环返回属性。对于直接在对象上定义的属性，这

个特性的默认值为true。

 [[Get]]：在读取属性时调用的函数。默认值为undefined。

 [[Set]]：在写入属性时调用的函数。默认值为undefined。










