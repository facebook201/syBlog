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

// B代码 如果
Object.definePrototype(Foo.prototype, 'age', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: 12
});

```



