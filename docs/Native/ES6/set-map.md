## 深入理解Set Map

* Set 和 Map 有什么不同？
* Set 和 Array 有什么不同？



### 数组和set

数组是一个索引集合，数组中的数据值是按索引排序。

```javascript
const arr = ['A', 'B', 'C', 'D'];
arr.indexOf('A'); // 0
```

Set 是键的集合。Set不使用索引，而是使用键对数据排序，Set中的元素按插入顺序是可迭代的。所以不能包含重复的数据。


### Set的好处

* 查看元素：indexOf 检查数组中的项是否存在是比较慢
* 删除元素：Set 可以根据每项的value来删除 数据根据索引来删除 依赖索引就很慢
* 保存NaN：Set可以保存此值 但是indexOf是找不到这个值得
* 删除重复项：Set对象只存储唯一的值 



### 时间复杂度

数组用来搜索元素的方法时间复杂度为O(N), 是根据数据大小的增长速度相同。Set用于搜索、删除和插入元素的方法的时间复杂度都只有O(1)。



### Set有多快？

```javascript
let arr = [], set = new Set(), n = 1000000;

for (let i = 0; i < n; i++) {
  arr.push(i);
  set.add(i);
}

let result;
console.time('Array');
result = arr.indexOf(821213) !== -1;
console.timeEnd('Array'); // Array: 1.013916015625ms

console.time('Set');
result = set.has(821213);
console.timeEnd('Set'); // Set: 0.0029296875ms
```



### 谷歌面试题

给定一个整数无序数组和变量 `sum`，如果存在数组中任意两项和使等于 `sum` 的值，则返回`true`。否则,返回`false`。例如，数组`[3,5,1,4]`和 `sum = 9`，函数应该返回`true`，因为`4 + 5 = 9`。 **这个问题跟LeetCode的第一题是一样的**

```javascript
var arr = [1, 6, 2, 7, 4];
var target = 10;

function towNumber(arr, target) {
  var obj = {};
  var len = arr.length;

  for (let i = 0; i < len; i++) {
    let num = target - arr[i];
    if (obj[num] === void 0) {
      obj[arr[i]] = i;
    } else {
      return true;
    }
  }
  return false
}

// Set实现的版本
const findSum = (arr, val) => {
  let set = new Set();
  set.add(val - arr[0]);

  for (let i = 0; i < arr.length; i++) {
    let searchVal = target - arr[i];
    if (set.has(arr[i])) {
      return true;
    } else {
      set.add(searchVal);
    }
  }
  return false;
};
```



