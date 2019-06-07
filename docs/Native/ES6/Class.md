# Class

::: tip 类 原型 继承

首先在开始ES6的类之前，先来整理一下原型 对象 以及继承等等的基础知识。毕竟最早ECMA是没有类继承，只有原型继承。首先从对象开始说起。

:::

## 对象

### 数据属性 (Data properties)

对象属性一般是以键值对展现在我们面前，但是除了value之外还有三个特殊的属性

* **writable 如果是true，可以被改变，否则就是只读属性**
* **enumerable 如果是true，表示可枚举 可以在循环 for in 列出 否则不可以遍历**
* **configurable 如果是ture 属性可以被删除 相应的特性也会被修改 否则不可以**

通过Object.getOwnPropertyDescriptor 方法来查询有关属性的完整信息。

> Object.getOwnPropertyDescriptor(obj, 'name')



### 访问器属性 ( accessor properties )

当我们读取对象属性 会自动调用getter函数，当设置属性值 会调用setter函数。







## Class

class语法其实是现有原型机制的一种语法糖，并不是新的类的机制。相关问题

* class 语法无法定义成员属性(只能定义方法)
* 构造函数的参数跟方法不能重名
* super并不是动态绑定，它会在声明时"静态"绑定。



class User 完成了什么事情。

* 声明了一个User的变量，并将它的值指向了 "constructor" 函数
* 把所有类中定义的方法挂载到User.prototype上 

```javascript
class User {
  constructor(name) {
    this.name = 'name';
  }
  sayName() {
    console.log(this.name);
  }
}

console.log(User === User.prototype.constructor); // true
console.log(Object.getOwnPropertyNames(User.prototype)); // ['constructor', 'sayName']
```

### Class 跟之前函数的一点区别

* 构造器必须与new关键字一同使用 ( 单独调用会报错 )
* 不同的字符串输出结果
* **类里面定义的方法是不可枚举的**
* class 拥有一个默认的 constructor() {}  就是说你即使没有显示定义 constructor ，它自己也会自动加一个
* class 永远都是 use strict
* class 中只能定义方法
* 可以定义静态方法 也不可以枚举

```javascript
class User {
  // 实例属性的新写法
  _name = '张三';
	// 静态属性
	static myStaticProp = '12';

  constructor(name) {
    // 实例属性
    this.name = 'name';
  }
  // 静态方法
  static staticMethod() {
    console.log(this === User);
  }
  sayName() {
    console.log(this.name);
  }
}

let user = new User('lisi');

for (let k in user) {
  console.log(user[k]) // 'name' 
}
User.staticMethod();
```



## 类继承和super

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

class Zhang extends User {
  hide() {
    console.log(this.name + 'zhangsan');
  }
}
let z = new Zhang('张三');
z.hide(); // 张三zhangsan
```

**extends 关键字实际上是给Zhang.prototype添加了一个[[Prototype]]，并且会指向User.prototype**

我们发现上面我们没有在Zhang里面定义constructor。那么根据规范 **如果没有构造函数就会生成下面这样的构造函数**

```javascript
class Zhang extends User{
  constructor(..args) {
    super(...args);
  }
}
```

如果在子类构造函数没有定义super就使用this的话会报错的。**而且必须在this之前调用。**

::: tip 派生类构造函数

当一个普通函数执行时，它会创建一个空对象作为this并继续执行，但是当派生的构造函数执行时，它期望父类的构造函数来完成这项工作。所有要必须调用super()，否则this指向的对象不会被创建。super 作为构造函数调用，代表父类的构造函数。ES6要求 子类的构造函数必须执行一次super函数。 **super 在某种意义上可以看成父类的原型**

:::





