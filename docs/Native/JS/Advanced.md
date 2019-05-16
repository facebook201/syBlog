
# Javascript深入系列
**这里更像是结合冴羽大大的博客和我自己的理解**



## 原型到原型链

**Javascript跟传统的类继承不同，而是通过原型对象prototype实现的**

构造函数创建对象

```javascript
function Foo() {}

let f = new Foo();
f.name = '张三';
```

这里Foo 就是一个构造函数，使用new创建了一个实例对象f；

**prototype，每个函数都有prototype属性，就是我们经常在例子中看到的prototype**

```javascript
function Foo() {}
Foo.prototype.name = 'zhangsan';

let f1 = new Foo();
let f2 = new Foo(); 
f1.name === f2.name; // true 都是zhangsan
```

**prototype属性指向了一个对象，这个对象就是调用构造函数而创建的实例的原型，那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。**

> Foo.prototype 表示实例的原型。 那么怎么表示 f 和 Foo.prototype 的联系。那么就有第二个属性 \__proto__



\### __proto__

这是所有的javascript对象(除了null)都具有的一个属性，称之为隐式原型 这个属性会指向该对象的原型(显示原型)。

```javascript
function Foo() {}
let f = new Foo();
console.log(f.__proto__ === Foo.prototype); // true
```

### constructor

一个构造函数可以生成多个实例，但是每个原型都有一个constructor属性指向关联的构造函数。

```javascript
function Foo() {}
console.log(Foo.prototype.constructor === Foo); // true

// 最终可以得出
function Foo() {}
let f = new Foo();

console.log(f.__proto__ === Foo.prototype); // true
console.log(Foo.prototype.constructor === Foo); // true
// ES5的方法 getPrototypeOf 获得对象的原型
console.log(Object.getPrototypeOf(foo) === Foo.prototype);
```

### 原型链

当读取实例的属性，如果找不到就查找与对象关联的原型中的属性，如果还查不到就去原型的原型 一直到顶层为止。知道Object.prototype.\__proto__ === null。



### Function.prototype

Function 构造函数创建一个新的Function对象，每个函数实际上都是一个 Function对象。在ECMA-262标准上

> The Function prototype object is itself a Function object ( its [[Class]] is "Function" ) that, when invoked, accepts any arguments and returns undefined

Function 的 prototype对象是Function的一个函数对象。

* Function.prototype 是一个函数。
* Function.prototype.\__proto__ === Object.prototype

**所有的javascript内置构造器的 __proto__ 都指向Function.prototype。说明所有构造器都来自Function.prototype。包括Object和Funtion本身 而且Function.prototype 是唯一一个通过typeof运算符结果是function的prototype。**



**记住一点 所有对象的 \__proto__ 都指向其构造器的prototype**

```javascript
function Foo() {}
let f = new Foo();

console.log(f.__proto__ === Foo.prototype); // true
console.log(Foo.__proto__ === Function.prototype); // true
console.log(Foo.prototype.__proto__ === Object.prototype); // true

// 其他内置的构造器
Number.__proto__ === Function.prototype;
Boolean.__proto__ === Function.prototype;
String.__proto__ === Function.prototype;
Object.__proto__ === Function.prototype;
Function.__proto__ === Function.prototype;
Array.__proto__ === Function.prototype;
RegExp.__proto__ === Function.prototype;
Error.__proto__ === Function.prototype;
Date.__proto__ === Function.prototype;

// 这两个值内置对 跟上面的不一样 他们都是静态方法
JSON.__proto__ === Object.prototype;
Math.__proto__ === Object.prototype;
```

第一个 f.\__proto__。f是通过Foo构造函数new出来，所以f的隐式原型指向其构造器 Foo。

第二个 Foo.\__proto__ Foo是函数。函数本身也是对象 只不过是函数对象。所有的函数都是由Function构造函数创建出来的，所以他的  \__proto__ 是指向Function这个构造器

第三 Foo.prototype  它是函数的属性 是一个对象( 除了Function.prototype 它是一个函数 ) 所以对象的原型是Object



### 补充

**constructor属性**

```javascript
function Foo() {}

let f = new Foo();
f.constructor = Foo;
```

当获取f.constructor时，其实Foo并没有constructor属性，当不能读取到constructor属性，会从原型也就是Foo.prototype中读取，正好有改属性。**同时还有一个点 当定义一个函数之后 其实就已经在函数原型属性上有constructor，但是如果我们手动修改prototype属性后，会修改constructor属性，所以防止出错要手动指定**

```javascript
function Foo() {}
let f = new Foo();

Foo.prototype = {
  constructor: Foo,
  getName() {
		return this.name;
  }
};

// 或者
Foo.prototype.getName = function() {};

f.constructor.name; // Foo 得到构造函数的名字
```





















## 模拟new操作符

new操作符使我们经常会使用到的操作。

>  用来创建一个用户自定义的对象类型的实例或者具有构造函数的内置对象类型之一

在开始之前，先来看看new操作符做了哪些事情。

::: tip 这里是javascript高程三对new操作符的解释

1、创建一个新对象

2、将构造函数的作用域赋给新对象( this就指向了这个对象 )

3、执行构造函数中的代码 ( 为这个对象添加属性 )

4、返回新对象

:::

**因为new是关键字 无法像bind函数一样直接覆盖。所以写一个函数来模拟。另外注意 构造函数尽量不要返回值，如果是基本类型是不会生效如果是返回对象new操作符没有作用**

```javascript
function Foo() {}
// new
let f = new Foo();

// createNew 后面跟其他参数
let p = createNew(Foo, ...args);
```

因为new的结果是一个新对象obj，所以先创建一个对象，且这个对象会继承构造函数的属性，可以通过经典继承的例子，使用 Foo.apply(obj, arguments) 来添加属性。

```javascript

function createNew(F, ...args) {
  let obj = Object.create(F.prototype);
  let result = F.apply(obj, args);
  return typeof result === 'object' ? result : obj;
}
```

