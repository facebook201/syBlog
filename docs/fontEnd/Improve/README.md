---
pageClass: getting-started
---

# Object

## for...in... Object.keys 和 Object.getOwnPropertyNames 还有 for of

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

****






<br />
