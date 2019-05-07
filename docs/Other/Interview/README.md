---
pageClass: getting-started
---

# 面试
**这里有自己总结的面试题 也有自己想的面试 主要是夯实基础的**

## for in 、Object.create 、hasOwnProperty之间的联系

for in 语句是遍历一个对象自有的、继承的、可枚举的、非symbol的属性。
```javascript
// A代码 这里先看看for in
function Foo(name) {
  this.name = name;
}

Foo.prototype.age = 24;
let f = new Foo('zhangsan');

for (let k in f) {
  console.log(f[k]); // zhangsan 24 会打印出自身和原型的 但是要可枚举的
}

// B代码 如果主动设置为 enumerable 为false
Object.definePrototype(Foo.prototype, 'age', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: 12
});

for (let k in f) {
  console.log(f[k]); // zhangsan 不可枚举的就没有
}
```
顺便提一下 in 运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。

**Object.create** 有一种传null为参数创建出来的对象 不具备一些定义在Object.prototype对象上面的熟悉。比如valueOf，
所以这里的hasOwnProperty也是没有的。 所以他们要主动调用（call）hasOwnProperty

```javascript
let obj = Object.create(null);
obj.name = 'lisi';
for (let k in obj) {
  if (obj.hasOwnProperty(k)) {
    console.log(obj[k]);
  }
}

let hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
```

