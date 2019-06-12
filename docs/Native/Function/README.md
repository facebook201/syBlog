

# Object

## extend 对象合并
```javascript
import { isFunction } from "util";

/**
 * extends 合并对象
 */


function extend(target) {
  var deep = false;

  var name, options, src, copy, clone, copyIsArray;
  var length = arguments.length;

  var i = 1;

  var target = arguments[0] || {};

  // 如果第一参数是布尔值
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[i] = {};
    i++;
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {};
  }

  for (; i < length; i++) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        copy = options[name];
        scr = target[name];
        // 循环引用
        if (copy === target) {
          continue;
        }

        // 是否深层复制 递归对象是纯对象或者数组
        if (deep && cpoy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
```


