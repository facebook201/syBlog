# Array

## 数组去重

> 数组去重是数组里面经常会碰到的问题，一般分为普通数组和对象数组。

### 对象数组 根据对象的属性去重

利用额外的内存空间来存已经存在的对象，如果额外的对象以及存在属性值，则表示已经存在这个对象。不用重复添加
```javascript
let city = [
  {cityName: "济南市", cityId: "370100"},
  {cityName: "济南市", cityId: "370100"},
  {cityName: "济宁市", cityId: "370800"},
  {cityName: "滨州市", cityId: "371600"},
  {cityName: "青岛市", cityId: "370200"},
  {cityName: "济宁市", cityId: "370800"}
];

function handleRepeatArr({ data, key }) {
  const arr = [];
  const obj = {};

  data.forEach((item, index) => {
    // 如果存在这个key 就得到对应的值 最好是唯一的id
    const attr = key ? item[key] : item;
    // 如果obj里面不存在这个id 就给这个id赋个值
    if (obj[attr] === void 0) {
      // 这里obj { 'fasdsada': 1, } 后面就根据是否有这个值判断
      obj[attr] = index;
      arr.push(item);
    }
  })
  return arr;
}

handleRepeatArr({ data: city, key: 'cityId' });
```

普通元素就是使用Set就可以了
```javascript
return [...new Set(arr)];
```

## 数组平铺
将数组元素也是数组元素的数组装成一维数组。
```javascript
function flatten(arr) {
   return arr.reduce((init, el) => {
     return init.concat(Array.isArray(el) ? flatter(el) : el);
   }, []);
}

// ES6 扩展运算符

function flatten(arr) {
  if (arr.length == 0) return [];
  // 如果有元素是数组 说明要平铺 直到所有的元素都不是数组为止
  while (arr.some(el => Array.isArray(el))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```
