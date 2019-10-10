
# 正则

## 验证
```javascript
const SAVE_NUM = /^[0-9]+(.[0-9]{0,2})?$/; // 保留两位小数

const isAbsoluteURL = url => {
  // 判断是不是url http/https:// 或者 //
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

const isFormData = val => {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/** 
 * 格式化时间戳
 * 
 */
function dateFormat(time, fmt) {
  let T = new Date(time);

  let O = {
    'M+': T.getMonth() + 1, // 月
    'd+': T.getDate(),
    'h+': T.getHours(),
    'm+': T.getMinutes(),
    's+': T.getSeconds(),
    'q+': Math.floor((T.getMonth() + 3) / 3),
    S: T.getMilliseconds()
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (T.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in O) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? O[k] : ('00' + O[k]).substr(("" + O[k]).length)
      );
    }
  }
  return fmt;
}

let ret = dateFormat(new Date(1570402800000), 'yyyy-MM-dd hh:mm:ss'); // 2019-10-07 07:00:00

```