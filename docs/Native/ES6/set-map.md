## 深入理解Set Map

* Set 和 Map 有什么不同？
* Set 和 Array 有什么不同？



**Set 是有序列表，含有相互独立的非重复值。Set是没有key的**

创建一个Set集合，

```javascript
let set = new Set();
// set
Set(0){}
  size: (...)
  __proto__: Set
  [[Entries]]: Array(0)       
  length: 0       

// 看起来像个对象 那么现在看看对象
let obj = new Object();

Object {}
  __proto__:
```



测试一下Set。

```javascript
let set = new Set();

set.add('haha');
set.add(Symbol('haha'));

// set 不是对象 这样没有用
for (let i in set) {
  console.log(i);
}

for (let key of set) {
  console.log(key);
}

//如果你需要key，则使用下面这种方法
for(let [key, value] of sets.entries()) {
  console.log(value, key);
} 
//"haha" "haha"
//Symbol(haha) Symbol(haha)

sets.forEach((value, key) => {
      console.log(value, key);
    });
    //"haha" "haha"
    //Symbol(haha) Symbol(haha)
    
    sets.forEach((value, key) => {
      console.log(Object.is(value, key));
    }); 
    //true true
```

Set有entries和forEach方法 所以是可以迭代的。但是不能使用for in 来迭代。要使用for of 遍历。



### Set 和 Array的转换

Set和数组太像了，Set集合的特点是没有key，没有下标。只有size和原型以及一个可以迭代的不重复元素的类数组。Set集合和数组是可以相互装换的

```javascript
    //数组转换成Set
    const arr = [1, 2, 2, '3', '3']
    let set = new Set(arr);
    console.log(set) // Set(3) {1, 2, "3"}

    //Set转换成数组
    let set = new Set();
    set.add(1);
    set.add('2');
    console.log(Array.from(set)) // (2) [1, "2"]
```



## Weak Set 集合

* weakset 只能存放对象值。不能放原始值，set对象都可以。
* weakset 对象中存储的对象都是被弱引用的，如果没有其他的对象或属性引用这个对象值，这个对象会被当成垃圾回收掉



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



### Map

Map对象保存键值对的有序列表，任何值都可以作为一个键或一个值。**对象的key只支持字符串，Map支持所有数据类型**

```javascript
let map = new Map();
console.log(map);
```

Map比Set 多了 set和 get方法。map没有add方法 是使用set添加key value。在Set集合中使用add添加value 没有key。

Map 传的参数也是一个可迭代对象，其元素位键值对。

Obejct和Map的比较。

* 键值obejct只能是字符串或symbols Map可以是任意值 包含函数、对象、基本类型
* Map中的键值对有序的 而添加到对象的键不是 遍历的时候 map对象按照插入的顺序返回键值
* size可以直接得到键值对的个数 对象要手动操作
* Map可以直接迭代 Object对象迭代要先得到键的数组 再迭代
* Map在涉及频繁增删键值对的场景下会有性能优势



## 总结

Set集合可以用来过滤数组中重复的元素，只能通过has方法检测指定的值是否存在，或者是通过forEach处理每个值。

Weak Set集合存放对象的弱引用，当该对象的其他强引用被清除时，集合中的弱引用也会自动被垃圾回收机制回收，追踪成组的对象是该集合最好的使用方式。

Map集合通过set()添加键值对，通过get()获取键值，各种方法的使用查看文章教程，你可以把它看成是比Object更加强大的对象。

Weak Map集合只支持对象类型的key，所有key都是弱引用，当该对象的其他强引用被清除时，集合中的弱引用也会自动被垃圾回收机制回收，为那些实际使用与生命周期管理分离的对象添加额外信息是非常适合的使用方式。

记得刚开始学习JavaScript的时候，不知道各种数据类型有什么用，如果你现在刚学习Map和Set也是这种不知道能用来干什么的想法，那么，恭喜，他们已经开始走入你的编程生涯，慢慢的你就会熟悉他们。

