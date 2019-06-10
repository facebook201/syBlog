

# Object

## 类数组对象

```javascript
function isArrayLike(obj) {
  // obj 必须有 length属性
  var length = !!obj && "length" in obj && obj.length;
  var typeRes = type(obj);
  // 排除掉函数和 Window 对象
  if (typeRes === "function" || isWindow(obj)) {
      return false;
  }
  return typeRes === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}
```



## jQuery的each方法

jQuery 的 each 方法，作为一个通用遍历方法，可用于遍历对象和数组。回调函数拥有两个参数：第一个为对象的成员或数组的索引，第二个为对应变量或内容。尽管 ES5 提供了 forEach 方法，但是 forEach 没有办法中止或者跳出 forEach 循环，除了抛出一个异常。但是对于 jQuery 的 each 函数，如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略。

```javascript
/**
 * @param { Array | Object } target 目标对象 要遍历的
 * @param { Function } callback 遍历函数 有两个参数 一个是索引（属性名） 或者 属性
 * [
 *  { name: 'zhangsan' }, { name: 'lisi' }
 * ]
 * { lisi: 13, s: { ss: 'asd' } }
 * 所有的this指向都保证指向元素的对象
 */
function each(target, callback) {
  if (target === void 0) {
    throw new Error('target is can\'t be empty!');
  }

  let i = 0;
  // 数组和类数组对象都使用for循环 对就使用for in
  if (isArrayLike(target)) {
    for (; i < target.length; i++) {
      if (callback.call(target[i], i, target[i]) === false) {
        break;
      }
    }
  } else {
    for (let k in target) {
      if (callback.call(target[k], k, target[k]) === false) {
        break;
      }
    }
  }
  return target;
};
```





