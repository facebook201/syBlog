# 其他

## window.open

有的浏览器会默认拦截window.open。

```javascript
 /**
   * a模拟window.open，不会被浏览器拦截
   * @param {String} url        a标签打开的地址
   * @param {String} id         a标签的ID
   * @param {String} targetType a标签点击打开的方式（当前页面打开还是新窗口打开）
   */
  openWindow: (url, targetType = '_blank', id = 'open', download = false) => {
    // 如果存在则删除
    if (document.getElementById(id)) {
      document.body.removeChild(document.getElementById(id))
    }
    const a = document.createElement('a')
    a.setAttribute('href', url)
    if (download) {
      a.setAttribute('download', url)
    }
    a.setAttribute('target', targetType)
    a.setAttribute('id', id)
    document.body.appendChild(a)
    a.click()
  }
```

## Math丢失精度
```javascript
/**
 * 1 小数点保留n位
 * @param x 做近似处理的数
 * @param n 小数点后第n位
 * @return 处理的结果
 * 本质上也是通过除法解决丢失进度的问题
 */

// Math.pow(base, exponent) 返回base的指数次幂 比如 Math.pow(10, 2) // 返回的就是100 此函数也就是先放大你想要的倍数 再除 除法不会

function roundFractional(x, n) {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}
```

