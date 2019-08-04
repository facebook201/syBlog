
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



