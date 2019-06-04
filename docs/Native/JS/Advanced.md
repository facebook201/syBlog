
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

还一个需要主要的是运算符的优先级。 new Foo（）的优先级大于 new Foo;

```javascript
function Foo() { return this; }
Foo.getName = function() { console.log('1'); }

Foo.prototype.getName = function() { console.log('2'); }

new Foo.getName(); // new (Foo.getName()) 1
new Foo().getName(); // (new Foo()).getName() 2
```

对于第一个函数来说，先执行了 `Foo.getName()` ，所以结果为 1；对于后者来说，先执行 `new Foo()` 产生了一个实例，然后通过原型链找到了 `Foo` 上的 `getName` 函数，所以结果为 2。



## instanceof 运算符

instanceof 运算符返回一个布尔值。表示对象是否为某个构造函数的实例。**运算符的左边是实例对象，右边是构造函数。检查构造函数的prototype属性是否出现在对象的原型链中的任何位置**

```javascript
function Foo() {};
let f = new Foo();
// f.__proto__ === Foo.prototype;
f instanceof Foo; // true
f instanceof Object; // true
```

**instanceof其实是通过隐式原型来对比，可以模拟实现一下**

```javascript
    function instaceLike(obj, ctr) {
      // 获取构造函数的原型
      obj = Object.getPropertypeOf(obj);
      // 等到隐式原型
      while(true) {
        // 如果是null 就直接返回
        if (obj === null)
          return false;
        // 如果相等就返回true
        if (obj === ctr.prototype)
          return true;
        // 否则就继续去原型链上找
        obj = Object.getPropertypeOf(obj);
      }
    }
    
    function Foo() {}
    let f = new Foo();

    console.log(instaceLike(f, Foo)); // true
    console.log(instaceLike(f, Object)); // true
```



## 基本类型和引用类型

#### 基本类型

下面这六种基本类型。 这些基本数据类型都是**按值访问。因为可以操作保存在变量中的实际的值**

Undefined 、Null 、Boolean、String、Number、Symbol。

**引用类型的值是保存在内存的对象中。js不能直接访问内存中的位置，所以操作对象的时候 是在操作对象的引用而不是实际的对象。引用类型的值是按引用访问，也就不存在引用传递的方式 只有传递引用**

#### 传递参数

向参数传递基本类型的值，被传递的值会被复制给一个局部变量。向参数传递引用类型的值，会把这个值的内存中的地址赋值给一个局部变量。这个局部变量的变化会反映在函数的外部。

```javascript
// 例子一
function addTen(num) {
  num += 10;
}
var count = 20;
var ret = addTen(count);
console.log(count, ret); // 20, 30

// 例子二
function setName(obj) {
  obj.name = '张三';    
}
var p = new Object();
setName(p);
console.log(p.name); // 张三

// 例子三
function setName(obj) {
  obj.name = '张三';
  obj = new Object();
  obj.name = '李四';  
}
var p = new Object();
setName(p);
console.log(p.name); // 张三
```

上面的代码展示 如果我们对传递的对象进行操作的是引用的属性，会修改对象引用的副本属性值，但是如果修改对象的引用，就不会修改原值。**其实传递进来的不管是基本类型还是引用类型 其实都是一个函数内部的局部变量 这个局部变量对象会在函数执行完毕后立即被销毁**



## 闭包

> **闭包指的是能够访问自由变量的函数，自由变量是指不是函数参数也不是函数内部局部变量的变量**

**javascript高程三里面介绍闭包：有权访问另一个函数作用域中的变量的函数**



```javascript
var scope = 'global';

function checkScope() {
  var scope = 'local';
  function f() {
    return scope;
  }
  return f;
}

var foo = checkScope();
foo(); // 'local'
```



```javascript
function createFunctions() {
  let ret = [];
  for (let i = 0; i < 10; i++) {
    ret[i] = (function(num){
      	return function() {
          return num;
        }
    }(i))
  }
}
```

上面定义了一个匿名函数，并将立即执行该匿名函数的结果赋给数组。这里的匿名函数有一个参数num，也就是最终函数要返回的值。在调用每个匿名函数时 传入i。由于函数参数是按值传递的，所以就会将变量i的当前值复制给参数num。**而在这个匿名函数的内部 又创建并返回一个访问num的闭包。所以ret数组中的每个函数都有num变量的一个副本，因此就可以返回各自不同的数值。**



## call 和 apply、bind的模拟

这两个方法使用一个指定的this值和一个单独的参数来调用一个函数。其中call 传递的是一个参数列表，apply的是一个数组的形式。在javascript权威指南里面指出。

```javascript
fn.call(o);
fn.apply(o);

// 上面这两行代码等价于下面的
o.m = fn; // 将fn存储为o的临时方法
o.m(); // 然后通过o去调用m方法
delete o.m; // 最后删除这个临时方法
```

上面的代码可以看到 call 的原理。再来看看call的用法

```javascript
let obj = { name: '张三' };
function getName() {
  return this.name;
}
getName(); // 这样调用this指向window 返回undefined

getName.call(obj); // 这样就会将this指向传入的obj 返回张三
```

**模拟实现**

* 将函数设为对象的属性
* 执行该函数
* 删除该函数

```javascript
Function.prototype.call = function(context) {
  context = context || window; // 如果不传就默认window
  context.fn = this;
  // 剩下的参数取出来
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  
  return result;
}

// apply跟call这个类似
Function.prototype.apply = function(context) {
  context = context || window; // 如果不传就默认window
  context.fn = this;
  
  let result;
  if (arguments[1]) {
  	result = context.fn(arguments[1])
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}

```

bind方法和其他两个方法作用一样，只不过bind 会返回一个函数，不会立即执行 要主动调用。



**注意以下几点**

* bind会返回一个绑定函数 不会立即执行 
* 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。



看个例子

```javascript
var value = 2;

let obj = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name, age);
}

bar.prototype.home = 'shanghai';

let bin = bar.bind(obj, 12);
let b = new bin('李四');
console.log(b);
```

这里看打印的结果发现bar相当于一个构造器。new出来的b可以访问bar原型上的属性。

![border]()

```javascript
Function.prototype.bind = Function.prototype.bind || function(context) {
  // 保留外部参数
  let args = Array.prototype.slice.call(arguments, 1);
  let self = this;
  context = context || window;
  
  // 使用空函数来中转过渡 继承原函数原型
  function fNOP() {};

  let fBound = function() {
  // 保留内部参数
    let arg = Array.prototype.slice.call(arguments);
  // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fNOP ? this : context, args.concat(args));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```



## call apply 的效率问题

在backbone里面 有一个triggerEvents，在三个参数以内会优先调用call方法，超过了就使用apply。

**Function.prototype.apply (thisArg, argArray)**

1、如果 IsCallable（Function）为false，即 Function 不可以被调用，则抛出一个 TypeError 异常。

2、如果 argArray 为 null 或未定义，则返回调用 Function 的 [[Call]] 内部方法的结果，提供thisArg 和一个空数组作为参数。

3、如果 Type（argArray）不是 Object，则抛出 TypeError 异常。

4、获取 argArray 的长度。调用 argArray 的 [[Get]] 内部方法，找到属性 length。 赋值给 len。

5、定义 n 为 ToUint32（len）。

6、初始化 argList 为一个空列表。

7、初始化 index 为 0。

8、循环迭代取出 argArray。重复循环 while（index < n）

a、将下标转换成String类型。初始化 indexName 为 ToString(index).
b、定义 nextArg 为 使用 indexName 作为参数调用argArray的[[Get]]内部方法的结果。
c、将 nextArg 添加到 argList 中，作为最后一个元素。
d、设置 index ＝ index＋1

9、返回调用 Function 的 [[Call]] 内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表。





**Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )**

1、如果 IsCallable（Function）为 false，即 Function 不可以被调用，则抛出一个 TypeError 异常。

2、定义 argList 为一个空列表。

3、如果使用超过一个参数调用此方法，则以从arg1开始的从左到右的顺序将每个参数附加为 argList 的最后一个元素

4、返回调用func的[[Call]]内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表




## 创建对象

虽然对象字面量或者构造函数创建单个对象是可以的，但是这些方式有个缺点，就是一个接口创建很多对象 会产生很多重复的代码。

### 工厂模

```javascript
function createPerson(name, age) {
  var o = {};
  o.name = name;
  o.age = age;
  o.sayName = function() {
    console.log(this.name);
  }
  return o;
}
```

所有的对象都指向一个原型 对象无法识别



### 构造函数

```javascript
function createPerson(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function() {
    console.log(this.name);
  }
}
let p1 = new createPerson('zhangsan'， 23);
```

实例可以识别为一个特定的类型，但是方法也要创建一遍。



### 原型模式

```javascript
function Person(name) {}
Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};
var person1 = new Person();
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数



### 组合模式(构造函数和原型模式)

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```



### 动态原型模式

```javascript
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();
person1.getName();
```

注意：使用动态原型模式时，不能用对象字面量重写原型

```javascript
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();
```

当执行 var person1 = new Person('kevin') 的时候，person1.的原型并不是指向 Person.prototype，而是指向 Person.prototype 指向的原型对象，我们假设这个原型对象名字为 O, 然后再修改 Person.prototype 的值为一个字面量，只是将一个新的值赋值给 Person.prototype, 并没有修改 O 对象，也不会切断已经建立的 person1 和 O 的原型关系，访问 person.getName 方法，依然会从 O 上查找

```javascript
function Person() {}

var p = new Person();

// 在new之后 就会建立原型关系 实例的隐式原型就会指向构造函数的显示原型
// Person.prototype 他本身指向的是一个原型对象 (protoObj)
p.__proto__ = Person.prototype = protoObj;

// 如果后面修改Person.prototype这个对象 但是p__proto__ 依然还是指向以前的 protoObj
Person.prototype = {
  constructor: Person,
  getName() {
    console.log(this.name);
  }
};
```

## 继承的多种方式和优缺点

ECMAScript 中描述原型链将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

**每个构造函数都有一个原型对象（prototype）它包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针（\__proto__）**



### 原型链继承

```javascript

function SuperType() {
  this.name = '张三';
}
SuperType.prototype.getName = function() {
  console.log(this.name);
};
function SubType() {}

SubType.prototype = new SuperType();
let sub = new SubType();

console.log(sub.getName());
```

引用类型的属性被所有实例共享。当被其中一个所改变 另一个实例也会改变。



### 构造函数

```javascript
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

缺点：

方法被重复创建

```javascript
function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```



### 组合继承

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);
    
    this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。



### 原型式继承

跟Object.create 一样。

```javascript
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
```



### 寄生式继承

```javascript
function SuperType(name){
	this.name = name;
	this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function SubType(name, age){
	SuperType.call(this, name); //第二次调用SuperType()
	this.age = age;
}
SubType.prototype = new SuperType(); //第一次调用SuperType()

SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function(){
	alert(this.age);
};
```



### 寄生式组合继承

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

var child1 = new Child('kevin', '18');
```



## 回调函数 callback

在javascript里， 函数是一等公民，当一个函数传入另一个函数作为参数，那么这个函数叫做回调函数，另一个函数就是常见的 高阶函数。并不是所有的回调函数都是异步的，例如map函数里面的回调函数。其实在本质上来说在promise之前是没有异步机制的， setTimeout 和 fs.readFile 都是JS提供的方法，JS中异步的实现严重依赖于宿主环境。**回调函数存在的两个问题**

* 控制反转 ( 回调函数在一定程度上不受我们控制 )
* 难以理解

























